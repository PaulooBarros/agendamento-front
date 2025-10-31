"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"
import { ServiceManagement } from "@/components/dashboard/services-management"
import { Loader2 } from "lucide-react"

export default function ServicesPage() {
  const router = useRouter()
  const params = useParams()
  const empresaId = params?.id as string | null

  const [authorized, setAuthorized] = useState<boolean>(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function verifyAccess() {
      try {
        // 🔹 Verifica se há sessão ativa
        const { data: sessionData } = await supabase.auth.getSession()
        const session = sessionData?.session

        if (!session?.user) {
          router.push("/login")
          return
        }

        // 🔹 Busca empresa vinculada ao admin logado
        const { data: empresa, error } = await supabase
          .from("empresas")
          .select("id, admin_id")
          .eq("admin_id", session.user.id)
          .single()

        if (error || !empresa) {
          console.error("Empresa não encontrada ou acesso negado:", error?.message)
          router.push("/empresas/cadastro")
          return
        }

        // 🔹 Confirma que o ID da URL pertence à empresa do usuário
        if (empresa.id !== empresaId) {
          router.push(`/empresas/${empresa.id}/dashboard/servicos`)
          return
        }

        setAuthorized(true)
      } catch (err) {
        console.error("Erro ao verificar acesso:", err)
      } finally {
        setLoading(false)
      }
    }

    verifyAccess()
  }, [router, empresaId])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-muted-foreground">
        <Loader2 className="w-6 h-6 animate-spin mb-2" />
        <p>Carregando painel de serviços...</p>
      </div>
    )
  }

  if (!authorized) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-4">
        <p className="text-muted-foreground">Acesso negado ou empresa não encontrada.</p>
        <button
          onClick={() => router.push("/")}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition"
        >
          Voltar para início
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-6">Gerenciamento de Serviços</h1>
        <ServiceManagement empresaId={empresaId!} />
      </div>
    </div>
  )
}
