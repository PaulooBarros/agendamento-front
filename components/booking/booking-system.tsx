"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { ServiceSelection } from "./service-selection"
import { ProfessionalSelection } from "./professional-selection"
import { DateSelection } from "./date-selection"
import { TimeSelection } from "./time-selection"
import { BookingConfirmation } from "./booking-confirmation"
import { Check } from "lucide-react"

type BookingStep = "service" | "professional" | "date" | "time" | "confirmation"

export function BookingSystem() {
  const [currentStep, setCurrentStep] = useState<BookingStep>("service")
  const [selectedService, setSelectedService] = useState<any>(null)
  const [selectedProfessional, setSelectedProfessional] = useState<any>(null)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  const steps = [
    { id: "service", label: "Serviço", completed: !!selectedService },
    { id: "professional", label: "Profissional", completed: !!selectedProfessional },
    { id: "date", label: "Data", completed: !!selectedDate },
    { id: "time", label: "Horário", completed: !!selectedTime },
    { id: "confirmation", label: "Confirmação", completed: false },
  ]

  const handleServiceSelect = (service: any) => {
    setSelectedService(service)
    setCurrentStep("professional")
  }

  const handleProfessionalSelect = (professional: any) => {
    setSelectedProfessional(professional)
    setCurrentStep("date")
  }

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    setCurrentStep("time")
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
    setCurrentStep("confirmation")
  }

  const handleConfirm = () => {
    console.log("[v0] Booking confirmed:", {
      service: selectedService,
      professional: selectedProfessional,
      date: selectedDate,
      time: selectedTime,
    })
    // TODO: Implement actual booking logic
  }

  return (
    <div className="space-y-8">
      {/* Progress Steps */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                    step.completed
                      ? "bg-primary border-primary text-primary-foreground"
                      : currentStep === step.id
                        ? "border-primary text-primary"
                        : "border-border text-muted-foreground"
                  }`}
                >
                  {step.completed ? <Check className="w-5 h-5" /> : index + 1}
                </div>
                <p
                  className={`text-xs mt-2 font-medium ${
                    currentStep === step.id ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {step.label}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`h-0.5 flex-1 mx-2 ${step.completed ? "bg-primary" : "bg-border"}`}
                  style={{ marginTop: "-24px" }}
                />
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Step Content */}
      {currentStep === "service" && <ServiceSelection onSelect={handleServiceSelect} />}
      {currentStep === "professional" && (
        <ProfessionalSelection onSelect={handleProfessionalSelect} onBack={() => setCurrentStep("service")} />
      )}
      {currentStep === "date" && (
        <DateSelection onSelect={handleDateSelect} onBack={() => setCurrentStep("professional")} />
      )}
      {currentStep === "time" && (
        <TimeSelection selectedDate={selectedDate} onSelect={handleTimeSelect} onBack={() => setCurrentStep("date")} />
      )}
      {currentStep === "confirmation" && (
        <BookingConfirmation
          service={selectedService}
          professional={selectedProfessional}
          date={selectedDate}
          time={selectedTime}
          onConfirm={handleConfirm}
          onBack={() => setCurrentStep("time")}
        />
      )}
    </div>
  )
}
