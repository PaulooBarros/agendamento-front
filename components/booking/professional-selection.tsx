"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Star } from "lucide-react"

interface ProfessionalSelectionProps {
  onSelect: (professional: any) => void
  onBack: () => void
}

export function ProfessionalSelection({ onSelect, onBack }: ProfessionalSelectionProps) {
  const professionals = [
    {
      id: 1,
      name: "Ana Costa",
      specialties: ["Corte Feminino", "Escova", "Coloração"],
      rating: 4.9,
      reviews: 87,
      initials: "AC",
    },
    {
      id: 2,
      name: "Carlos Lima",
      specialties: ["Corte Masculino", "Barba"],
      rating: 4.8,
      reviews: 65,
      initials: "CL",
    },
    {
      id: 3,
      name: "Beatriz Souza",
      specialties: ["Manicure", "Pedicure"],
      rating: 5.0,
      reviews: 92,
      initials: "BS",
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Selecione o Profissional</h2>
        <Button variant="outline" onClick={onBack} className="bg-transparent">
          Voltar
        </Button>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {professionals.map((professional) => (
          <Card
            key={professional.id}
            className="p-6 cursor-pointer hover:shadow-lg hover:border-primary transition-all"
            onClick={() => onSelect(professional)}
          >
            <div className="space-y-4 text-center">
              <Avatar className="w-20 h-20 mx-auto">
                <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                  {professional.initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-lg text-card-foreground">{professional.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{professional.specialties.join(", ")}</p>
              </div>
              <div className="flex items-center justify-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium text-sm">{professional.rating}</span>
                <span className="text-xs text-muted-foreground">({professional.reviews})</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
