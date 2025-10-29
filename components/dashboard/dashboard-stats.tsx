"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { Card } from "@/components/ui/card"

export function DashboardStats({ empresaId }: { empresaId: string }) {
  const [stats, setStats] = useState({
    totalAgendamentos: 0,
    totalServicos: 0,
    totalClientes: 0,
  })

  useEffect(() => {
    async function fetchStats() {
      const { count: totalAgendamentos } = await supabase
        .from("agendamentos")
        .select("*", { count: "exact", head: true })
        .eq("empresa_id", empresaId)

      const { count: totalServicos } = await supabase
        .from("servicos")
        .select("*", { count: "exact", head: true })
        .eq("empresa_id", empresaId)

      const { count: totalClientes } = await supabase
        .from("clientes")
        .select("*", { count: "exact", head: true })
        .eq("empresa_id", empresaId)

      setStats({
        totalAgendamentos: totalAgendamentos || 0,
        totalServicos: totalServicos || 0,
        totalClientes: totalClientes || 0,
      })
    }

    fetchStats()
  }, [empresaId])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <Card className="p-6">
        <h3 className="text-sm text-muted-foreground">Agendamentos</h3>
        <p className="text-3xl font-bold">{stats.totalAgendamentos}</p>
      </Card>
      <Card className="p-6">
        <h3 className="text-sm text-muted-foreground">Serviços</h3>
        <p className="text-3xl font-bold">{stats.totalServicos}</p>
      </Card>
      <Card className="p-6">
        <h3 className="text-sm text-muted-foreground">Clientes</h3>
        <p className="text-3xl font-bold">{stats.totalClientes}</p>
      </Card>
    </div>
  )
}
