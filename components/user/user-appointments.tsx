"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, MapPin, User } from "lucide-react"

export function UserAppointments() {
  const [activeTab, setActiveTab] = useState("upcoming")

  const upcomingAppointments = [
    {
      id: 1,
      company: "Salão Beleza Total",
      service: "Corte e Escova",
      professional: "Ana Costa",
      date: "2024-01-15",
      time: "14:00",
      price: "R$ 80,00",
      address: "Rua das Flores, 123 - Centro",
      status: "confirmed",
    },
    {
      id: 2,
      company: "Barbearia Moderna",
      service: "Corte + Barba",
      professional: "Carlos Lima",
      date: "2024-01-18",
      time: "10:30",
      price: "R$ 60,00",
      address: "Av. Principal, 456 - Jardins",
      status: "pending",
    },
  ]

  const pastAppointments = [
    {
      id: 3,
      company: "Estética Avançada",
      service: "Limpeza de Pele",
      professional: "Beatriz Souza",
      date: "2024-01-05",
      time: "15:00",
      price: "R$ 120,00",
      address: "Rua do Comércio, 789 - Vila Nova",
      status: "completed",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-500/10 text-green-700 hover:bg-green-500/20">Confirmado</Badge>
      case "pending":
        return <Badge className="bg-yellow-500/10 text-yellow-700 hover:bg-yellow-500/20">Pendente</Badge>
      case "completed":
        return <Badge className="bg-blue-500/10 text-blue-700 hover:bg-blue-500/20">Concluído</Badge>
      case "cancelled":
        return <Badge className="bg-red-500/10 text-red-700 hover:bg-red-500/20">Cancelado</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
      <TabsList className="grid w-full max-w-md grid-cols-2">
        <TabsTrigger value="upcoming">Próximos</TabsTrigger>
        <TabsTrigger value="past">Histórico</TabsTrigger>
      </TabsList>

      <TabsContent value="upcoming" className="space-y-4">
        {upcomingAppointments.length > 0 ? (
          upcomingAppointments.map((appointment) => (
            <Card key={appointment.id} className="p-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="text-xl font-semibold text-card-foreground">{appointment.company}</h3>
                    <p className="text-muted-foreground">{appointment.service}</p>
                  </div>
                  {getStatusBadge(appointment.status)}
                </div>

                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <User className="w-4 h-4" />
                      <span>{appointment.professional}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(appointment.date)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{appointment.time}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{appointment.address}</span>
                    </div>
                    <div className="text-lg font-semibold text-card-foreground">{appointment.price}</div>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="bg-transparent">
                    Ver Detalhes
                  </Button>
                  <Button variant="outline" size="sm" className="bg-transparent">
                    Reagendar
                  </Button>
                  <Button variant="ghost" size="sm" className="text-destructive">
                    Cancelar
                  </Button>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">Você não tem agendamentos próximos</p>
            <Button className="mt-4">Fazer um Agendamento</Button>
          </Card>
        )}
      </TabsContent>

      <TabsContent value="past" className="space-y-4">
        {pastAppointments.length > 0 ? (
          pastAppointments.map((appointment) => (
            <Card key={appointment.id} className="p-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="text-xl font-semibold text-card-foreground">{appointment.company}</h3>
                    <p className="text-muted-foreground">{appointment.service}</p>
                  </div>
                  {getStatusBadge(appointment.status)}
                </div>

                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <User className="w-4 h-4" />
                      <span>{appointment.professional}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(appointment.date)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{appointment.time}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{appointment.address}</span>
                    </div>
                    <div className="text-lg font-semibold text-card-foreground">{appointment.price}</div>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="bg-transparent">
                    Agendar Novamente
                  </Button>
                  <Button variant="outline" size="sm" className="bg-transparent">
                    Avaliar
                  </Button>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">Você ainda não tem histórico de agendamentos</p>
          </Card>
        )}
      </TabsContent>
    </Tabs>
  )
}
