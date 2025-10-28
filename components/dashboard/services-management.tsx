"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Edit, Trash2, Clock, DollarSign } from "lucide-react"

export function ServicesManagement() {
  const [showAddForm, setShowAddForm] = useState(false)

  const services = [
    {
      id: 1,
      name: "Corte Feminino",
      description: "Corte de cabelo feminino com lavagem",
      duration: "60 min",
      price: "R$ 80,00",
    },
    {
      id: 2,
      name: "Corte Masculino",
      description: "Corte de cabelo masculino",
      duration: "30 min",
      price: "R$ 40,00",
    },
    {
      id: 3,
      name: "Escova",
      description: "Escova progressiva ou modeladora",
      duration: "45 min",
      price: "R$ 60,00",
    },
    {
      id: 4,
      name: "Manicure",
      description: "Manicure completa com esmaltação",
      duration: "45 min",
      price: "R$ 35,00",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button onClick={() => setShowAddForm(!showAddForm)}>
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Serviço
        </Button>
      </div>

      {showAddForm && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-card-foreground mb-4">Novo Serviço</h3>
          <form className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="serviceName">Nome do Serviço</Label>
                <Input id="serviceName" placeholder="Ex: Corte Feminino" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="servicePrice">Preço</Label>
                <Input id="servicePrice" type="text" placeholder="R$ 0,00" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="serviceDuration">Duração (minutos)</Label>
              <Input id="serviceDuration" type="number" placeholder="60" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="serviceDescription">Descrição</Label>
              <Textarea id="serviceDescription" placeholder="Descreva o serviço..." rows={3} />
            </div>

            <div className="flex gap-2">
              <Button type="submit">Salvar Serviço</Button>
              <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                Cancelar
              </Button>
            </div>
          </form>
        </Card>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {services.map((service) => (
          <Card key={service.id} className="p-6">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="font-semibold text-lg text-card-foreground">{service.name}</h3>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{service.duration}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <DollarSign className="w-4 h-4" />
                  <span>{service.price}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
