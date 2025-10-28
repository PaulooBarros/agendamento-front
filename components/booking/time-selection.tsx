"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface TimeSelectionProps {
  selectedDate: Date | null
  onSelect: (time: string) => void
  onBack: () => void
}

export function TimeSelection({ selectedDate, onSelect, onBack }: TimeSelectionProps) {
  const morningSlots = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30"]
  const afternoonSlots = ["14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"]
  const unavailableSlots = ["10:00", "14:30", "16:00"]

  const isAvailable = (time: string) => !unavailableSlots.includes(time)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Selecione o Horário</h2>
        <Button variant="outline" onClick={onBack} className="bg-transparent">
          Voltar
        </Button>
      </div>

      {selectedDate && (
        <Card className="p-4 bg-primary/5">
          <p className="text-sm text-center">
            <span className="text-muted-foreground">Data selecionada: </span>
            <span className="font-semibold text-foreground">
              {selectedDate.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}
            </span>
          </p>
        </Card>
      )}

      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-3">Manhã</h3>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
              {morningSlots.map((time) => {
                const available = isAvailable(time)
                return (
                  <Button
                    key={time}
                    variant={available ? "outline" : "secondary"}
                    className={available ? "bg-transparent hover:bg-primary hover:text-primary-foreground" : ""}
                    disabled={!available}
                    onClick={() => available && onSelect(time)}
                  >
                    {time}
                  </Button>
                )
              })}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-3">Tarde</h3>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
              {afternoonSlots.map((time) => {
                const available = isAvailable(time)
                return (
                  <Button
                    key={time}
                    variant={available ? "outline" : "secondary"}
                    className={available ? "bg-transparent hover:bg-primary hover:text-primary-foreground" : ""}
                    disabled={!available}
                    onClick={() => available && onSelect(time)}
                  >
                    {time}
                  </Button>
                )
              })}
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-border rounded" />
            <span className="text-muted-foreground">Disponível</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-secondary rounded" />
            <span className="text-muted-foreground">Indisponível</span>
          </div>
        </div>
      </Card>
    </div>
  )
}
