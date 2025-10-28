"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { SchedulingForm } from "@/components/scheduling-form"

export default function AgendamentoPage() {
  const router = useRouter()

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("loggedIn") === "true"
    if (!isLoggedIn) {
      router.replace("/login") // redireciona para login se não estiver logado
    }
  }, [router])

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Fazer Agendamento</h1>
            <p className="text-muted-foreground">Selecione o serviço, data e horário desejado</p>
          </div>
          <SchedulingForm />
        </div>
      </div>
    </div>
  )
}
