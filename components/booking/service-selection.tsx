"use client"

import { Card } from "@/components/ui/card"
import { Clock, DollarSign } from "lucide-react"

interface ServiceSelectionProps {
  onSelect: (service: any) => void
}

export function ServiceSelection({ onSelect }: ServiceSelectionProps) {
  const services = [
    {
      id: 1,
      name: "Corte Feminino",
      description: "Corte de cabelo feminino com lavagem e finalização",
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
      name: "Escova Progressiva",
      description: "Escova progressiva com produtos de alta qualidade",
      duration: "120 min",
      price: "R$ 200,00",
    },
    {
      id: 4,
      name: "Coloração",
      description: "Coloração completa com produtos profissionais",
      duration: "90 min",
      price: "R$ 150,00",
    },
    {
      id: 5,
      name: "Manicure",
      description: "Manicure completa com esmaltação",
      duration: "45 min",
      price: "R$ 35,00",
    },
    {
      id: 6,
      name: "Pedicure",
      description: "Pedicure completa com esmaltação",
      duration: "45 min",
      price: "R$ 40,00",
    },
  ]

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-foreground">Selecione o Serviço</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {services.map((service) => (
          <Card
            key={service.id}
            className="p-6 cursor-pointer hover:shadow-lg hover:border-primary transition-all"
            onClick={() => onSelect(service)}
          >
            <div className="space-y-3">
              <h3 className="font-semibold text-lg text-card-foreground">{service.name}</h3>
              <p className="text-sm text-muted-foreground">{service.description}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{service.duration}</span>
                </div>
                <div className="flex items-center gap-1">
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
