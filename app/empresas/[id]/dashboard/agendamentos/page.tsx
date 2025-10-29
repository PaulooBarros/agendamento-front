"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarDays, CheckCircle, XCircle, Loader2 } from "lucide-react"

export default function AgendamentosPage() {
  const router = useRouter()
  const { id } = useParams() // ID da empresa
  const [agendamentos, setAgendamentos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // 🔹 Carrega agendamentos da empresa
  useEffect(() => {
    if (!id) return
    loadAgendamentos()
  }, [id])

  const loadAgendamentos = async () => {
    setLoading(true)

    const { data, error } = await supabase
      .from("agendamentos")
      .select(`
        id,
        data_agendamento,
        hora_inicio,
        hora_fim,
        status,
        observacao,
        servicos ( nome, preco ),
        funcionarios ( nome ),
        clientes ( nome, email )
      `)
      .eq("empresa_id", id)
      .order("data_agendamento", { ascending: true })

    if (error) {
      console.error("Erro ao carregar agendamentos:", error.message)
    } else {
      setAgendamentos(data || [])
    }

    setLoading(false)
  }

  // 🔹 Atualiza status do agendamento
  const updateStatus = async (id: string, novoStatus: string) => {
    const { error } = await supabase
      .from("agendamentos")
      .update({ status: novoStatus })
      .eq("id", id)

    if (error) {
      console.error("Erro ao atualizar status:", error.message)
      alert("Erro ao atualizar status")
    } else {
      await loadAgendamentos()
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-muted/30">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <CalendarDays className="w-6 h-6 text-primary" />
            Agendamentos
          </h1>
          <p className="text-muted-foreground">
            Visualize e gerencie todos os agendamentos da sua empresa
          </p>
        </div>

        {/* Conteúdo */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          </div>
        ) : agendamentos.length === 0 ? (
          <Card className="p-6 text-center text-muted-foreground">
            Nenhum agendamento encontrado.
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {agendamentos.map((ag) => (
              <Card
                key={ag.id}
                className="p-4 space-y-2 border hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {ag.servicos?.nome || "Serviço"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {ag.funcionarios?.nome && `Com ${ag.funcionarios.nome}`}
                    </p>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      ag.status === "confirmado"
                        ? "bg-green-100 text-green-700"
                        : ag.status === "cancelado"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {ag.status}
                  </span>
                </div>

                <div className="text-sm text-muted-foreground space-y-1">
                  <p>
                    📅{" "}
                    {new Date(ag.data_agendamento).toLocaleDateString("pt-BR", {
                      weekday: "long",
                      day: "2-digit",
                      month: "short",
                    })}
                  </p>
                  <p>
                    ⏰ {ag.hora_inicio?.slice(0, 5)} - {ag.hora_fim?.slice(0, 5)}
                  </p>
                  <p>💲 R$ {ag.servicos?.preco?.toFixed(2)}</p>
                  <p>👤 {ag.clientes?.nome || "Cliente"}</p>
                </div>

                {ag.observacao && (
                  <p className="text-xs text-muted-foreground italic border-t pt-2">
                    “{ag.observacao}”
                  </p>
                )}

                <div className="flex gap-2 pt-3 border-t">
                  {ag.status !== "confirmado" && (
                    <Button
                      size="sm"
                      className="flex-1"
                      onClick={() => updateStatus(ag.id, "confirmado")}
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Confirmar
                    </Button>
                  )}
                  {ag.status !== "cancelado" && (
                    <Button
                      size="sm"
                      variant="destructive"
                      className="flex-1"
                      onClick={() => updateStatus(ag.id, "cancelado")}
                    >
                      <XCircle className="w-4 h-4 mr-1" />
                      Cancelar
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
