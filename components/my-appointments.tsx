"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Phone } from "lucide-react"

const mockAppointments = [
  {
    id: "1",
    service: "Corte de Cabelo",
    company: "Barbearia Moderna",
    date: "2025-10-28",
    time: "14:00",
    status: "confirmed",
    address: "Rua das Flores, 123",
    phone: "(11) 99999-9999",
    price: "R$ 50,00",
  },
  {
    id: "2",
    service: "Corte + Barba",
    company: "Salão Premium",
    date: "2025-10-30",
    time: "10:00",
    status: "pending",
    address: "Av. Principal, 456",
    phone: "(11) 98888-8888",
    price: "R$ 70,00",
  },
  {
    id: "3",
    service: "Coloração",
    company: "Studio Hair",
    date: "2025-10-25",
    time: "15:30",
    status: "completed",
    address: "Rua do Comércio, 789",
    phone: "(11) 97777-7777",
    price: "R$ 120,00",
  },
]

const statusConfig = {
  pending: { label: "Pendente", color: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400" },
  confirmed: { label: "Confirmado", color: "bg-green-500/10 text-green-700 dark:text-green-400" },
  completed: { label: "Concluído", color: "bg-blue-500/10 text-blue-700 dark:text-blue-400" },
  cancelled: { label: "Cancelado", color: "bg-red-500/10 text-red-700 dark:text-red-400" },
}

export function MyAppointments() {
  return (
    <div className="space-y-4">
      {mockAppointments.map((appointment) => (
        <Card key={appointment.id} className="border-border">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-xl text-card-foreground">{appointment.service}</CardTitle>
                <p className="text-muted-foreground mt-1">{appointment.company}</p>
              </div>
              <Badge className={statusConfig[appointment.status as keyof typeof statusConfig].color}>
                {statusConfig[appointment.status as keyof typeof statusConfig].label}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-card-foreground">
                    {new Date(appointment.date).toLocaleDateString("pt-BR", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-card-foreground">{appointment.time}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-card-foreground">{appointment.address}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span className="text-card-foreground">{appointment.phone}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div>
                <p className="text-sm text-muted-foreground">Valor</p>
                <p className="text-xl font-bold text-primary">{appointment.price}</p>
              </div>
              <div className="flex gap-2">
                {appointment.status === "pending" && (
                  <>
                    <Button variant="outline" size="sm">
                      Cancelar
                    </Button>
                    <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                      Confirmar
                    </Button>
                  </>
                )}
                {appointment.status === "confirmed" && (
                  <Button variant="outline" size="sm">
                    Cancelar
                  </Button>
                )}
                {appointment.status === "completed" && (
                  <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Agendar Novamente
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
