"use client"

import { useSearchParams, useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CalendarDays, Loader2, Clock } from "lucide-react"
import { motion } from "framer-motion"

interface Servico {
    id: string
    nome: string
    preco: number
    duracao_minutos: number
    empresa_id: string
}

interface HorarioEmpresaRow {
    id: string
    hora_inicio: string // ex: "08:00:00" ou "08:00"
    hora_fim: string
    ativo: boolean
}

export default function AgendarPage() {
    const { id: empresaId } = useParams()
    const searchParams = useSearchParams()
    const servicoId = searchParams.get("servico")

    const router = useRouter()
    const [servico, setServico] = useState<Servico | null>(null)
    const [data, setData] = useState("")
    const [horariosDisponiveis, setHorariosDisponiveis] = useState<string[]>([])
    const [horaSelecionada, setHoraSelecionada] = useState("")
    const [observacao, setObservacao] = useState("")
    const [loading, setLoading] = useState(true)
    const [agendando, setAgendando] = useState(false)
    const [success, setSuccess] = useState(false)
    const [bloqueado, setBloqueado] = useState(false)

    useEffect(() => {
        if (servicoId) fetchServico()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [servicoId])

    async function fetchServico() {
        setLoading(true)
        const { data, error } = await supabase
            .from("servicos")
            .select("id, nome, preco, duracao_minutos, empresa_id")
            .eq("id", servicoId)
            .single()

        if (error) {
            console.error("Erro ao carregar serviço:", error.message)
            setServico(null)
        } else {
            setServico(data)
        }
        setLoading(false)
    }

    // quando data/servico/empresa mudam, recarrega disponibilidade
    useEffect(() => {
        if (!empresaId || !data || !servico) {
            setHorariosDisponiveis([])
            setBloqueado(false)
            return
        }
        carregarDisponibilidade()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [empresaId, data, servico])

    // utilitário: map de getDay() -> nome usado na tabela
    const weekdayMap = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"]

    function normalizeTimeToHHMM(t: string) {
        // entradas aceitas: "08:00", "08:00:00"
        if (!t) return ""
        return t.slice(0, 5)
    }

    async function carregarDisponibilidade() {
        setHorariosDisponiveis([])
        setBloqueado(false)
        setHoraSelecionada("")

        // 1) verifica bloqueios para a data exata
        const { data: bloqueios, error: errBloq } = await supabase
            .from("bloqueios_empresa")
            .select("id")
            .eq("empresa_id", empresaId)
            .eq("data", data)

        if (errBloq) {
            console.error("Erro checando bloqueios:", errBloq.message)
            // não bloqueia por segurança, mas avisa no console
        }
        if (bloqueios && bloqueios.length > 0) {
            setBloqueado(true)
            console.debug("Data bloqueada:", data)
            return
        }

        // 2) calcula o nome do dia esperado pela tabela
        const d = new Date(data)
        if (isNaN(d.getTime())) {
            console.warn("Data inválida passada:", data)
            return
        }
        const dayName = weekdayMap[d.getDay()] // garante "segunda", "terça", ...
        console.debug("Day name para query:", dayName)

        // 3) busca todos os registros de horários para esse dia (pode haver mais de 1)
        const { data: horariosRows, error: errHor } = await supabase
            .from("horarios_empresa")
            .select("id, hora_inicio, hora_fim, ativo")
            .eq("empresa_id", empresaId)
            .eq("dia_semana", dayName)
            .eq("ativo", true)

        if (errHor) {
            console.error("Erro ao buscar horarios_empresa:", errHor.message)
            return
        }

        if (!horariosRows || horariosRows.length === 0) {
            console.debug("Nenhum horário de expediente encontrado para:", dayName)
            setHorariosDisponiveis([])
            return
        }

        // 4) gera blocos possíveis a partir de cada registro (suporta turnos múltiplos)
        const duracao = Number(servico!.duracao_minutos)
        const blocosSet = new Set<string>()

        for (const row of horariosRows) {
            // normaliza strings de hora (mantém HH:MM)
            const hStart = normalizeTimeToHHMM(row.hora_inicio)
            const hEnd = normalizeTimeToHHMM(row.hora_fim)

            // cria Date objects de início/fim no dia escolhido
            // usa `${data}T${HH:MM}:00` para garantir formato ISO local
            const start = new Date(`${data}T${hStart}:00`)
            const end = new Date(`${data}T${hEnd}:00`)

            if (isNaN(start.getTime()) || isNaN(end.getTime())) {
                console.warn("Horário inválido na tabela:", row)
                continue
            }

            let cursor = new Date(start.getTime())
            while (cursor.getTime() + duracao * 60000 <= end.getTime()) {
                const hhmm = cursor.toTimeString().slice(0, 5)
                blocosSet.add(hhmm)
                // avança para próximo bloco seguindo a duração do serviço
                cursor = new Date(cursor.getTime() + duracao * 60000)
            }
        }

        // 5) remove blocos ocupados por agendamentos existentes naquele dia
        const { data: agendamentosRows, error: errAg } = await supabase
            .from("agendamentos")
            .select("hora_inicio")
            .eq("empresa_id", empresaId)
            .eq("data_agendamento", data)

        if (errAg) {
            console.error("Erro buscando agendamentos existentes:", errAg.message)
            // prossegue sem remover (mas registra)
        }
        const ocupados = (agendamentosRows || []).map((a: any) => normalizeTimeToHHMM(a.hora_inicio))

        // 6) filtra livre vs ocupado e ordena
        const livres = Array.from(blocosSet)
            .filter((b) => !ocupados.includes(b))
            .sort((a, b) => (a > b ? 1 : -1))

        console.debug("Blocos gerados:", Array.from(blocosSet).sort())
        console.debug("Blocos ocupados:", ocupados)
        console.debug("Blocos livres:", livres)

        setHorariosDisponiveis(livres)
    }

    async function handleAgendar() {
        if (!data || !horaSelecionada || !servico) {
            alert("Selecione uma data e um horário disponível.")
            return
        }

        setAgendando(true)

        const { error } = await supabase.from("agendamentos").insert([
            {
                empresa_id: servico.empresa_id,
                servico_id: servico.id,
                data_agendamento: data,
                hora_inicio: horaSelecionada,
                status: "pendente",
                observacao,
            },
        ])

        if (error) {
            console.error("Erro ao criar agendamento:", error.message)
            alert("Erro ao agendar. Tente novamente.")
        } else {
            setSuccess(true)
            setTimeout(() => router.push(`/empresas/${empresaId}`), 1400)
        }

        setAgendando(false)
    }

    if (loading)
        return (
            <div className="flex justify-center items-center min-h-[70vh]">
                <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
        )

    if (!servico)
        return (
            <div className="text-center py-20 text-muted-foreground">
                Serviço não encontrado.
            </div>
        )

    return (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="container mx-auto px-4 py-10 max-w-2xl">
            <Card className="p-6 space-y-6">
                {success ? (
                    <div className="text-center py-20">
                        <h2 className="text-2xl font-semibold text-green-600 mb-2">✅ Agendamento confirmado!</h2>
                        <p className="text-muted-foreground">Você será redirecionado para a página da empresa.</p>
                    </div>
                ) : (
                    <>
                        <div className="text-center space-y-1">
                            <h1 className="text-3xl font-bold text-foreground">Agendar {servico.nome}</h1>
                            <p className="text-muted-foreground">Duração: {servico.duracao_minutos} min · Valor: <span className="font-semibold text-primary">R$ {servico.preco.toFixed(2).replace(".", ",")}</span></p>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="data">Data do Agendamento</Label>
                                <Input id="data" type="date" value={data} onChange={(e) => setData(e.target.value)} />
                            </div>

                            {bloqueado && <p className="text-red-500 font-medium text-sm">⚠️ Esta data está bloqueada. A empresa não atenderá neste dia.</p>}

                            {!bloqueado && data && (
                                <div className="space-y-2">
                                    <Label>Horários disponíveis</Label>
                                    {horariosDisponiveis.length === 0 ? (
                                        <p className="text-sm text-muted-foreground">Nenhum horário disponível neste dia.</p>
                                    ) : (
                                        <div className="flex flex-wrap gap-2">
                                            {horariosDisponiveis.map((h) => (
                                                <Button key={h} variant={horaSelecionada === h ? "default" : "outline"} className="flex items-center gap-1" onClick={() => setHoraSelecionada(h)}>
                                                    <Clock className="w-4 h-4" />
                                                    {h}
                                                </Button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="observacao">Observações</Label>
                                <Input id="observacao" type="text" placeholder="Ex: preferências, observações..." value={observacao} onChange={(e) => setObservacao(e.target.value)} />
                            </div>
                        </div>

                        <Button onClick={handleAgendar} disabled={agendando || bloqueado} className="w-full mt-4 flex items-center justify-center gap-2">
                            {agendando ? (<><Loader2 className="w-4 h-4 animate-spin" />Agendando...</>) : (<><CalendarDays className="w-4 h-4" />Confirmar Agendamento</>)}
                        </Button>
                    </>
                )}
            </Card>
        </motion.div>
    )
}
