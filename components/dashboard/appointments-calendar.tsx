"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, CalendarIcon } from "lucide-react"

export function AppointmentsCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())

  const appointments = [
    {
      id: 1,
      time: "09:00",
      client: "Maria Silva",
      service: "Corte Feminino",
      professional: "Ana Costa",
      status: "confirmed",
    },
    {
      id: 2,
      time: "10:30",
      client: "João Santos",
      service: "Barba",
      professional: "Carlos Lima",
      status: "confirmed",
    },
    {
      id: 3,
      time: "14:00",
      client: "Paula Oliveira",
      service: "Manicure",
      professional: "Beatriz Souza",
      status: "pending",
    },
    {
      id: 4,
      time: "15:30",
      client: "Roberto Alves",
      service: "Corte Masculino",
      professional: "Carlos Lima",
      status: "confirmed",
    },
    {
      id: 5,
      time: "16:00",
      client: "Ana Paula",
      service: "Escova",
      professional: "Ana Costa",
      status: "confirmed",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-500/10 text-green-700 hover:bg-green-500/20">Confirmado</Badge>
      case "pending":
        return <Badge className="bg-yellow-500/10 text-yellow-700 hover:bg-yellow-500/20">Pendente</Badge>
      case "cancelled":
        return <Badge className="bg-red-500/10 text-red-700 hover:bg-red-500/20">Cancelado</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })
  }

  const previousDay = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() - 1)
    setCurrentDate(newDate)
  }

  const nextDay = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() + 1)
    setCurrentDate(newDate)
  }

  const today = () => {
    setCurrentDate(new Date())
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={previousDay} className="bg-transparent">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-muted-foreground" />
              <h2 className="text-xl font-semibold text-card-foreground">{formatDate(currentDate)}</h2>
            </div>
            <Button variant="outline" size="icon" onClick={nextDay} className="bg-transparent">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          <Button variant="outline" onClick={today} className="bg-transparent">
            Hoje
          </Button>
        </div>

        <div className="space-y-3">
          {appointments.length > 0 ? (
            appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="text-center min-w-[60px]">
                    <p className="text-lg font-semibold text-card-foreground">{appointment.time}</p>
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-card-foreground">{appointment.client}</p>
                      {getStatusBadge(appointment.status)}
                    </div>
                    <p className="text-sm text-muted-foreground">{appointment.service}</p>
                    <p className="text-xs text-muted-foreground">com {appointment.professional}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="bg-transparent">
                    Detalhes
                  </Button>
                  <Button variant="ghost" size="sm">
                    Editar
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Nenhum agendamento para este dia</p>
            </div>
          )}
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-card-foreground mb-4">Resumo do Dia</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-primary/5 rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Total de Agendamentos</p>
            <p className="text-2xl font-bold text-primary">{appointments.length}</p>
          </div>
          <div className="p-4 bg-green-500/5 rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Confirmados</p>
            <p className="text-2xl font-bold text-green-700">
              {appointments.filter((a) => a.status === "confirmed").length}
            </p>
          </div>
          <div className="p-4 bg-yellow-500/5 rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Pendentes</p>
            <p className="text-2xl font-bold text-yellow-700">
              {appointments.filter((a) => a.status === "pending").length}
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
