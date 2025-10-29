"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { Card } from "@/components/ui/card"

export function RecentAppointments({ empresaId }: { empresaId: string }) {
  const [appointments, setAppointments] = useState<any[]>([])

  useEffect(() => {
    async function fetchRecentAppointments() {
      const { data, error } = await supabase
        .from("agendamentos")
        .select("id, data, hora, clientes(nome), servicos(nome)")
        .eq("empresa_id", empresaId)
        .order("data", { ascending: false })
        .limit(5)

      if (error) {
        console.error("Erro ao buscar agendamentos:", error.message)
      } else {
        setAppointments(data || [])
      }
    }

    fetchRecentAppointments()
  }, [empresaId])

  if (appointments.length === 0) {
    return <p className="text-muted-foreground">Nenhum agendamento recente.</p>
  }

  return (
    <Card className="p-6 space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Agendamentos Recentes</h3>
      <ul className="space-y-3">
        {appointments.map((a) => (
          <li key={a.id} className="flex justify-between border-b border-border pb-2">
            <div>
              <p className="font-medium">{a.servicos?.nome}</p>
              <p className="text-sm text-muted-foreground">{a.clientes?.nome}</p>
            </div>
            <span className="text-sm text-muted-foreground">
              {a.data} — {a.hora}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  )
}
