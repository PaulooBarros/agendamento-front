"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PlusCircle, Clock, Users, Wrench } from "lucide-react"

export function QuickActions({ empresaId }: { empresaId: string }) {
  return (
    <div className="flex flex-wrap gap-4">
      <Button asChild>
        <Link href={`/empresas/${empresaId}/dashboard/servicos`}>
          <Wrench className="w-4 h-4 mr-2" />
          Gerenciar Serviços
        </Link>
      </Button>

      <Button asChild variant="outline">
        <Link href={`/empresas/${empresaId}/dashboard/funcionarios`}>
          <Users className="w-4 h-4 mr-2" />
          Funcionários
        </Link>
      </Button>

      <Button asChild variant="outline">
        <Link href={`/empresas/${empresaId}/dashboard/horarios`}>
          <Clock className="w-4 h-4 mr-2" />
          Horários
        </Link>
      </Button>

      <Button asChild variant="secondary">
        <Link href={`/empresas/${empresaId}/dashboard/agendamentos`}>
          <PlusCircle className="w-4 h-4 mr-2" />
          Agendamentos
        </Link>
      </Button>
    </div>
  )
}
