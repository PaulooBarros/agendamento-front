import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, User } from "lucide-react"

export function RecentAppointments() {
  const appointments = [
    {
      id: 1,
      client: "Maria Silva",
      service: "Corte e Escova",
      professional: "Ana Costa",
      date: "Hoje",
      time: "14:00",
      status: "confirmed",
    },
    {
      id: 2,
      client: "João Santos",
      service: "Barba",
      professional: "Carlos Lima",
      date: "Hoje",
      time: "15:30",
      status: "confirmed",
    },
    {
      id: 3,
      client: "Paula Oliveira",
      service: "Manicure",
      professional: "Beatriz Souza",
      date: "Amanhã",
      time: "10:00",
      status: "pending",
    },
    {
      id: 4,
      client: "Roberto Alves",
      service: "Corte Masculino",
      professional: "Carlos Lima",
      date: "Amanhã",
      time: "11:30",
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

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-foreground">Próximos Agendamentos</h2>
        <Button variant="outline" size="sm">
          Ver todos
        </Button>
      </div>

      <Card className="divide-y divide-border">
        {appointments.map((appointment) => (
          <div key={appointment.id} className="p-6 hover:bg-muted/50 transition-colors">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-card-foreground">{appointment.client}</h3>
                  {getStatusBadge(appointment.status)}
                </div>
                <p className="text-sm text-muted-foreground">{appointment.service}</p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>{appointment.professional}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{appointment.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{appointment.time}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Detalhes
                </Button>
                <Button variant="ghost" size="sm">
                  Cancelar
                </Button>
              </div>
            </div>
          </div>
        ))}
      </Card>
    </div>
  )
}
