"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Loader2, Clock, Calendar, Trash2, PlusCircle } from "lucide-react"
import { toast } from "sonner"

interface Horario {
  id?: string
  dia_semana: string
  hora_inicio: string
  hora_fim: string
  ativo: boolean
}

interface Bloqueio {
  id?: string
  data: string
  motivo: string
}

const dias = [
  "segunda",
  "terça",
  "quarta",
  "quinta",
  "sexta",
  "sábado",
  "domingo",
]

export default function HorariosPage() {
  const { id: empresaId } = useParams()
  const [horarios, setHorarios] = useState<Horario[]>([])
  const [bloqueios, setBloqueios] = useState<Bloqueio[]>([])
  const [novoBloqueio, setNovoBloqueio] = useState<Bloqueio>({
    data: "",
    motivo: "",
  })

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [addingBloqueio, setAddingBloqueio] = useState(false)

  // Carrega dados iniciais
  useEffect(() => {
    if (empresaId) {
      fetchHorarios()
      fetchBloqueios()
    }
  }, [empresaId])

  // 🔹 Busca horários fixos
  async function fetchHorarios() {
    setLoading(true)
    const { data, error } = await supabase
      .from("horarios_empresa")
      .select("id, dia_semana, hora_inicio, hora_fim, ativo")
      .eq("empresa_id", empresaId)
      .order("id")

    if (error) {
      console.error(error.message)
      toast.error("Erro ao carregar horários")
      setLoading(false)
      return
    }

    const existentes = data || []
    const base = dias.map((dia) => {
      const existente = existentes.find((h) => h.dia_semana === dia)
      return (
        existente || {
          dia_semana: dia,
          hora_inicio: "08:00",
          hora_fim: "18:00",
          ativo: dia !== "domingo",
        }
      )
    })

    setHorarios(base)
    setLoading(false)
  }

  // 🔹 Busca bloqueios
  async function fetchBloqueios() {
    const { data, error } = await supabase
      .from("bloqueios_empresa")
      .select("id, data, motivo")
      .eq("empresa_id", empresaId)
      .order("data")

    if (error) console.error("Erro ao buscar bloqueios:", error.message)
    else setBloqueios(data || [])
  }

  // 🔹 Salvar horários fixos
  async function salvarHorarios() {
    if (!empresaId) return
    setSaving(true)

    try {
      for (const h of horarios) {
        if (h.id) {
          await supabase
            .from("horarios_empresa")
            .update({
              hora_inicio: h.hora_inicio,
              hora_fim: h.hora_fim,
              ativo: h.ativo,
            })
            .eq("id", h.id)
        } else {
          await supabase.from("horarios_empresa").insert([
            {
              empresa_id: empresaId,
              dia_semana: h.dia_semana,
              hora_inicio: h.hora_inicio,
              hora_fim: h.hora_fim,
              ativo: h.ativo,
            },
          ])
        }
      }

      toast.success("Horários salvos com sucesso!")
    } catch (err) {
      console.error(err)
      toast.error("Erro ao salvar horários.")
    }

    setSaving(false)
  }

  // 🔹 Adicionar bloqueio
  async function adicionarBloqueio() {
    if (!novoBloqueio.data || !novoBloqueio.motivo) {
      toast.warning("Preencha todos os campos.")
      return
    }

    setAddingBloqueio(true)
    const { error } = await supabase.from("bloqueios_empresa").insert([
      {
        empresa_id: empresaId,
        data: novoBloqueio.data,
        motivo: novoBloqueio.motivo,
      },
    ])

    if (error) {
      console.error(error.message)
      toast.error("Erro ao adicionar bloqueio.")
    } else {
      toast.success("Bloqueio adicionado!")
      setNovoBloqueio({ data: "", motivo: "" })
      fetchBloqueios()
    }
    setAddingBloqueio(false)
  }

  // 🔹 Remover bloqueio
  async function removerBloqueio(id: string) {
    const { error } = await supabase
      .from("bloqueios_empresa")
      .delete()
      .eq("id", id)

    if (error) toast.error("Erro ao excluir bloqueio.")
    else {
      toast.success("Bloqueio removido.")
      setBloqueios((prev) => prev.filter((b) => b.id !== id))
    }
  }

  // Manipular alteração nos horários fixos
  const handleChange = (
    dia: string,
    field: "hora_inicio" | "hora_fim" | "ativo",
    value: any
  ) => {
    setHorarios((prev) =>
      prev.map((h) =>
        h.dia_semana === dia ? { ...h, [field]: value } : h
      )
    )
  }

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    )

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-muted/30">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Seção Horários Fixos */}
        <Card className="p-6 space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-primary" />
            <h1 className="text-2xl font-semibold text-foreground">
              Horários de Funcionamento
            </h1>
          </div>

          <div className="space-y-4">
            {horarios.map((h) => (
              <div
                key={h.dia_semana}
                className="flex items-center justify-between border-b border-border pb-3"
              >
                <div className="flex items-center gap-3 w-32">
                  <Switch
                    checked={h.ativo}
                    onCheckedChange={(val) =>
                      handleChange(h.dia_semana, "ativo", val)
                    }
                  />
                  <Label className="capitalize font-medium">
                    {h.dia_semana}
                  </Label>
                </div>

                {h.ativo ? (
                  <div className="flex items-center gap-3">
                    <Input
                      type="time"
                      value={h.hora_inicio}
                      onChange={(e) =>
                        handleChange(h.dia_semana, "hora_inicio", e.target.value)
                      }
                      className="w-28"
                    />
                    <span>–</span>
                    <Input
                      type="time"
                      value={h.hora_fim}
                      onChange={(e) =>
                        handleChange(h.dia_semana, "hora_fim", e.target.value)
                      }
                      className="w-28"
                    />
                  </div>
                ) : (
                  <span className="text-sm text-muted-foreground italic">
                    Fechado
                  </span>
                )}
              </div>
            ))}
          </div>

          <Button
            onClick={salvarHorarios}
            disabled={saving}
            className="w-full mt-4"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Salvando...
              </>
            ) : (
              "Salvar Alterações"
            )}
          </Button>
        </Card>

        {/* Seção Bloqueios e Feriados */}
        <Card className="p-6 space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-primary" />
            <h1 className="text-2xl font-semibold text-foreground">
              Bloqueios e Feriados
            </h1>
          </div>

          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="date"
                value={novoBloqueio.data}
                onChange={(e) =>
                  setNovoBloqueio({ ...novoBloqueio, data: e.target.value })
                }
                className="sm:w-1/3"
              />
              <Input
                placeholder="Motivo (ex: Feriado, Manutenção...)"
                value={novoBloqueio.motivo}
                onChange={(e) =>
                  setNovoBloqueio({ ...novoBloqueio, motivo: e.target.value })
                }
                className="flex-1"
              />
              <Button
                onClick={adicionarBloqueio}
                disabled={addingBloqueio}
                className="sm:w-auto"
              >
                {addingBloqueio ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-1" />
                ) : (
                  <PlusCircle className="w-4 h-4 mr-1" />
                )}
                Adicionar
              </Button>
            </div>

            {bloqueios.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                Nenhum bloqueio cadastrado.
              </p>
            ) : (
              <div className="divide-y divide-border">
                {bloqueios.map((b) => (
                  <div
                    key={b.id}
                    className="flex items-center justify-between py-2"
                  >
                    <div>
                      <p className="font-medium">
                        {new Date(b.data).toLocaleDateString("pt-BR")}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {b.motivo}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removerBloqueio(b.id!)}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
