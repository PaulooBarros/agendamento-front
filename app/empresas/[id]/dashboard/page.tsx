"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { RecentAppointments } from "@/components/dashboard/recent-appointments"

export default function EmpresaDashboardPage() {
  const { id } = useParams()
  const router = useRouter()
  const [empresa, setEmpresa] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadEmpresa() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push("/login")
        return
      }

      // Busca a empresa que pertence ao admin logado
      const { data, error } = await supabase
        .from("empresas")
        .select("*")
        .eq("id", id)
        .eq("admin_id", user.id)
        .single()

      if (error || !data) {
        console.error("Acesso negado ou empresa não encontrada:", error?.message)
        router.push("/empresas")
        return
      }

      setEmpresa(data)
      setLoading(false)
    }

    loadEmpresa()
  }, [id, router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <p className="text-muted-foreground">Carregando painel...</p>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-muted/30">
      <div className="container mx-auto px-4 py-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{empresa.nome}</h1>
          <p className="text-muted-foreground">
            Painel da empresa — {empresa.cidade}/{empresa.estado}
          </p>
        </div>

        <DashboardStats empresaId={empresa.id} />
        <QuickActions empresaId={empresa.id} />
        <RecentAppointments empresaId={empresa.id} />
      </div>
    </div>
  )
}
