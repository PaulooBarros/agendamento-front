"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { PlusCircle } from "lucide-react"

interface Empresa {
  id: string
  nome: string
  descricao: string
  telefone: string
  email: string
  cidade: string
  estado: string
}

export default function PainelEmpresaPage() {
  const router = useRouter()
  const { id } = useParams()
  const [empresa, setEmpresa] = useState<Empresa | null>(null)
  const [servicos, setServicos] = useState<any[]>([])
  const [funcionarios, setFuncionarios] = useState<any[]>([])
  const [horarios, setHorarios] = useState<any[]>([])

  useEffect(() => {
    if (!id) return

    async function loadData() {
      // Empresa
      const { data: emp } = await supabase.from("empresas").select("*").eq("id", id).single()
      setEmpresa(emp)

      // Serviços
      const { data: serv } = await supabase.from("servicos").select("*").eq("empresa_id", id)
      setServicos(serv || [])

      // Funcionários
      const { data: func } = await supabase.from("funcionarios").select("*").eq("empresa_id", id)
      setFuncionarios(func || [])

      // Horários
      const { data: hrs } = await supabase.from("horarios_funcionamento").select("*").eq("empresa_id", id)
      setHorarios(hrs || [])
    }

    loadData()
  }, [id])

  if (!empresa) return <p className="text-center mt-10">Carregando...</p>

  return (
    <div className="container mx-auto px-4 py-10 space-y-10">
      {/* Header da empresa */}
      <section>
        <h1 className="text-3xl font-bold text-foreground mb-2">{empresa.nome}</h1>
        <p className="text-muted-foreground">{empresa.descricao}</p>
        <div className="text-sm text-muted-foreground mt-3">
          📞 {empresa.telefone} — ✉️ {empresa.email}
        </div>
        <div className="text-sm text-muted-foreground">
          {empresa.cidade}/{empresa.estado}
        </div>
      </section>

      {/* Serviços */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Serviços</h2>
          <Button onClick={() => router.push(`/empresa/${id}/painel/servicos/novo`)}>
            <PlusCircle className="w-4 h-4 mr-2" /> Novo Serviço
          </Button>
        </div>
        {servicos.length === 0 ? (
          <p className="text-muted-foreground">Nenhum serviço cadastrado.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {servicos.map((s) => (
              <Card key={s.id} className="p-4">
                <h3 className="font-semibold">{s.nome}</h3>
                <p className="text-sm text-muted-foreground">{s.descricao}</p>
                <p className="text-sm mt-1">
                  💰 R$ {s.preco.toFixed(2)} — ⏱️ {s.duracao_minutos} min
                </p>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Funcionários */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Funcionários</h2>
          <Button onClick={() => router.push(`/empresa/${id}/painel/funcionarios/novo`)}>
            <PlusCircle className="w-4 h-4 mr-2" /> Novo Funcionário
          </Button>
        </div>
        {funcionarios.length === 0 ? (
          <p className="text-muted-foreground">Nenhum funcionário cadastrado.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {funcionarios.map((f) => (
              <Card key={f.id} className="p-4">
                <h3 className="font-semibold">{f.nome}</h3>
                <p className="text-sm text-muted-foreground">{f.cargo}</p>
                <p className="text-sm text-muted-foreground">{f.email}</p>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Horários */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Horários de Funcionamento</h2>
          <Button onClick={() => router.push(`/empresa/${id}/painel/horarios`)}>
            <PlusCircle className="w-4 h-4 mr-2" /> Editar Horários
          </Button>
        </div>
        {horarios.length === 0 ? (
          <p className="text-muted-foreground">Nenhum horário configurado.</p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {horarios.map((h) => (
              <Card key={h.id} className="p-4">
                <h3 className="font-semibold capitalize">{h.dia_semana}</h3>
                {h.aberto ? (
                  <p className="text-sm text-muted-foreground">
                    {h.abre?.slice(0, 5)} às {h.fecha?.slice(0, 5)}
                  </p>
                ) : (
                  <p className="text-sm text-muted-foreground">Fechado</p>
                )}
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
