"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Check } from "lucide-react"

const mockServices = [
  { id: "1", name: "Corte de Cabelo", price: "R$ 50,00", duration: "30 min" },
  { id: "2", name: "Barba", price: "R$ 30,00", duration: "20 min" },
  { id: "3", name: "Corte + Barba", price: "R$ 70,00", duration: "45 min" },
  { id: "4", name: "Coloração", price: "R$ 120,00", duration: "90 min" },
]

const mockTimeSlots = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
]

export function SchedulingForm() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedService, setSelectedService] = useState<string>("")
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [step, setStep] = useState<"service" | "datetime" | "confirm">("service")

  const handleConfirm = () => {
    alert("Agendamento confirmado!")
    // Reset form
    setSelectedService("")
    setSelectedTime("")
    setDate(new Date())
    setStep("service")
  }

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        {/* Service Selection */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground flex items-center gap-2">
              <span
                className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-semibold ${
                  step !== "service" ? "bg-primary text-primary-foreground" : "bg-primary/20 text-primary"
                }`}
              >
                {step !== "service" ? <Check className="w-4 h-4" /> : "1"}
              </span>
              Selecione o Serviço
            </CardTitle>
            <CardDescription>Escolha o serviço que deseja agendar</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-3">
              {mockServices.map((service) => (
                <button
                  key={service.id}
                  onClick={() => {
                    setSelectedService(service.id)
                    setStep("datetime")
                  }}
                  className={`text-left p-4 rounded-lg border-2 transition-all hover:border-primary ${
                    selectedService === service.id ? "border-primary bg-primary/5" : "border-border bg-card"
                  }`}
                >
                  <h4 className="font-semibold text-card-foreground mb-1">{service.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {service.price} • {service.duration}
                  </p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Date and Time Selection */}
        {step !== "service" && (
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground flex items-center gap-2">
                <span
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-semibold ${
                    step === "confirm" ? "bg-primary text-primary-foreground" : "bg-primary/20 text-primary"
                  }`}
                >
                  {step === "confirm" ? <Check className="w-4 h-4" /> : "2"}
                </span>
                Escolha Data e Horário
              </CardTitle>
              <CardDescription>Selecione quando deseja ser atendido</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-card-foreground mb-3 block">Data</Label>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-lg border border-border w-fit mx-auto"
                  disabled={(date) => date < new Date()}
                />
              </div>

              {date && (
                <div>
                  <Label className="text-card-foreground mb-3 block">Horário Disponível</Label>
                  <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                    {mockTimeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => {
                          setSelectedTime(time)
                          setStep("confirm")
                        }}
                        className={`p-3 rounded-lg border-2 text-sm font-medium transition-all hover:border-primary ${
                          selectedTime === time
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-card text-card-foreground"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Summary Card */}
      <div className="lg:col-span-1">
        <Card className="border-border sticky top-6">
          <CardHeader>
            <CardTitle className="text-card-foreground">Resumo do Agendamento</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Serviço</p>
                <p className="font-medium text-card-foreground">
                  {selectedService ? mockServices.find((s) => s.id === selectedService)?.name : "Não selecionado"}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-1">Data</p>
                <p className="font-medium text-card-foreground">
                  {date ? date.toLocaleDateString("pt-BR") : "Não selecionada"}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-1">Horário</p>
                <p className="font-medium text-card-foreground">{selectedTime || "Não selecionado"}</p>
              </div>

              {selectedService && (
                <div className="pt-3 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-1">Valor</p>
                  <p className="text-2xl font-bold text-primary">
                    {mockServices.find((s) => s.id === selectedService)?.price}
                  </p>
                </div>
              )}
            </div>

            <Button
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={!selectedService || !date || !selectedTime}
              onClick={handleConfirm}
            >
              Confirmar Agendamento
            </Button>

            {step !== "service" && (
              <Button
                variant="outline"
                className="w-full bg-transparent"
                onClick={() => {
                  if (step === "confirm") setStep("datetime")
                  else if (step === "datetime") setStep("service")
                }}
              >
                Voltar
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
