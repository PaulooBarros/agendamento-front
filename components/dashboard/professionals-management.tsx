"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Plus, Edit, Trash2, Mail, Phone } from "lucide-react"

export function ProfessionalsManagement() {
  const [showAddForm, setShowAddForm] = useState(false)

  const professionals = [
    {
      id: 1,
      name: "Ana Costa",
      email: "ana@empresa.com",
      phone: "(11) 99999-1111",
      specialties: ["Corte Feminino", "Escova"],
      initials: "AC",
    },
    {
      id: 2,
      name: "Carlos Lima",
      email: "carlos@empresa.com",
      phone: "(11) 99999-2222",
      specialties: ["Corte Masculino", "Barba"],
      initials: "CL",
    },
    {
      id: 3,
      name: "Beatriz Souza",
      email: "beatriz@empresa.com",
      phone: "(11) 99999-3333",
      specialties: ["Manicure", "Pedicure"],
      initials: "BS",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button onClick={() => setShowAddForm(!showAddForm)}>
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Profissional
        </Button>
      </div>

      {showAddForm && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-card-foreground mb-4">Novo Profissional</h3>
          <form className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="professionalName">Nome Completo</Label>
                <Input id="professionalName" placeholder="Ex: Ana Costa" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="professionalEmail">Email</Label>
                <Input id="professionalEmail" type="email" placeholder="ana@empresa.com" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="professionalPhone">Telefone</Label>
              <Input id="professionalPhone" type="tel" placeholder="(11) 99999-9999" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="professionalSpecialties">Especialidades</Label>
              <Input id="professionalSpecialties" placeholder="Ex: Corte Feminino, Escova" />
              <p className="text-xs text-muted-foreground">Separe as especialidades por vírgula</p>
            </div>

            <div className="flex gap-2">
              <Button type="submit">Salvar Profissional</Button>
              <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                Cancelar
              </Button>
            </div>
          </form>
        </Card>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {professionals.map((professional) => (
          <Card key={professional.id} className="p-6">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {professional.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-card-foreground">{professional.name}</h3>
                    <p className="text-xs text-muted-foreground">{professional.specialties.join(", ")}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span>{professional.email}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span>{professional.phone}</span>
                </div>
              </div>

              <Button variant="outline" className="w-full bg-transparent" size="sm">
                Ver Agenda
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
