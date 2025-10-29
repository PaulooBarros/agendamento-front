"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"
import { ServiceManagement } from "@/components/dashboard/services-management"

export default function ServicesPage() {
  const router = useRouter()
  const [empresaId, setEmpresaId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadEmpresa() {
      // Verifica se o usuário está logado
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        router.push("/login")
        return
      }

      // Busca a empresa vinculada ao usuário logado
      const { data, error } = await supabase
        .from("empresas")
        .select("id")
        .eq("admin_id", user.id)
        .single()

      if (error || !data) {
        console.error("Erro ao buscar empresa:", error?.message)
        router.push("/empresas/cadastro")
        return
      }

      setEmpresaId(data.id)
      setLoading(false)
    }

    loadEmpresa()
  }, [router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <p className="text-muted-foreground">Carregando informações...</p>
      </div>
    )
  }

  if (!empresaId) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] space-y-4">
        <p className="text-muted-foreground text-center">
          Nenhuma empresa vinculada a esta conta.
        </p>
        <button
          onClick={() => router.push("/empresas/cadastro")}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition"
        >
          Cadastrar Empresa
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-6">Gerenciamento de Serviços</h1>
        <ServiceManagement empresaId={empresaId} />
      </div>
    </div>
  )
}
