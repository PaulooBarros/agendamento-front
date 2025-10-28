"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, Mail, Phone, Calendar } from "lucide-react"

export function ClientsManagement() {
  const [searchTerm, setSearchTerm] = useState("")

  const clients = [
    {
      id: 1,
      name: "Maria Silva",
      email: "maria@email.com",
      phone: "(11) 99999-1111",
      initials: "MS",
      totalAppointments: 12,
      lastVisit: "2024-01-10",
    },
    {
      id: 2,
      name: "João Santos",
      email: "joao@email.com",
      phone: "(11) 99999-2222",
      initials: "JS",
      totalAppointments: 8,
      lastVisit: "2024-01-08",
    },
    {
      id: 3,
      name: "Paula Oliveira",
      email: "paula@email.com",
      phone: "(11) 99999-3333",
      initials: "PO",
      totalAppointments: 15,
      lastVisit: "2024-01-12",
    },
    {
      id: 4,
      name: "Roberto Alves",
      email: "roberto@email.com",
      phone: "(11) 99999-4444",
      initials: "RA",
      totalAppointments: 6,
      lastVisit: "2024-01-05",
    },
  ]

  return (
    <div className="space-y-6">
      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar cliente por nome, email ou telefone..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {clients.map((client) => (
          <Card key={client.id} className="p-6">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-primary text-primary-foreground">{client.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-card-foreground">{client.name}</h3>
                    <Badge variant="secondary" className="mt-1">
                      {client.totalAppointments} agendamentos
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span>{client.email}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span>{client.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>Última visita: {new Date(client.lastVisit).toLocaleDateString("pt-BR")}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  Ver Histórico
                </Button>
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  Novo Agendamento
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
