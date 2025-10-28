"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, User, Scissors, MapPin } from "lucide-react"

interface BookingConfirmationProps {
  service: any
  professional: any
  date: Date | null
  time: string | null
  onConfirm: () => void
  onBack: () => void
}

export function BookingConfirmation({
  service,
  professional,
  date,
  time,
  onConfirm,
  onBack,
}: BookingConfirmationProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Confirmar Agendamento</h2>
        <Button variant="outline" onClick={onBack} className="bg-transparent">
          Voltar
        </Button>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          <div className="text-center pb-6 border-b border-border">
            <h3 className="text-2xl font-bold text-card-foreground mb-2">Salão Beleza Total</h3>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>Rua das Flores, 123 - Centro</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Scissors className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Serviço</p>
                <p className="font-semibold text-card-foreground">{service?.name}</p>
                <p className="text-sm text-muted-foreground mt-1">{service?.duration}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-card-foreground">{service?.price}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-accent" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Profissional</p>
                <p className="font-semibold text-card-foreground">{professional?.name}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg">
              <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5 text-secondary" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Data</p>
                <p className="font-semibold text-card-foreground">
                  {date?.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg">
              <div className="w-10 h-10 bg-chart-1/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-chart-1" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Horário</p>
                <p className="font-semibold text-card-foreground">{time}</p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-border">
            <div className="flex items-center justify-between mb-6">
              <span className="text-lg font-semibold text-card-foreground">Total</span>
              <span className="text-2xl font-bold text-primary">{service?.price}</span>
            </div>

            <Button onClick={onConfirm} className="w-full" size="lg">
              Confirmar Agendamento
            </Button>

            <p className="text-xs text-center text-muted-foreground mt-4">
              Você receberá uma confirmação por email e SMS
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
