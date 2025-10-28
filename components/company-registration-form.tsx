"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, Plus, X } from "lucide-react"

interface Service {
  id: string
  name: string
  price: string
  duration: string
}

export function CompanyRegistrationForm() {
  const [services, setServices] = useState<Service[]>([])
  const [newService, setNewService] = useState({ name: "", price: "", duration: "" })

  const addService = () => {
    if (newService.name && newService.price && newService.duration) {
      setServices([...services, { ...newService, id: Date.now().toString() }])
      setNewService({ name: "", price: "", duration: "" })
    }
  }

  const removeService = (id: string) => {
    setServices(services.filter((s) => s.id !== id))
  }

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="text-card-foreground">Informações da Empresa</CardTitle>
        <CardDescription>Preencha todos os campos obrigatórios</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="company-name" className="text-card-foreground">
              Nome da Empresa *
            </Label>
            <Input id="company-name" placeholder="Ex: Salão Beleza Total" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company-photo" className="text-card-foreground">
              Foto da Empresa
            </Label>
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
              <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Clique para fazer upload ou arraste a imagem</p>
              <p className="text-xs text-muted-foreground mt-1">PNG, JPG até 5MB</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="address" className="text-card-foreground">
                Endereço *
              </Label>
              <Input id="address" placeholder="Rua, número" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city" className="text-card-foreground">
                Cidade *
              </Label>
              <Input id="city" placeholder="Ex: São Paulo" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-card-foreground">
                Telefone *
              </Label>
              <Input id="phone" placeholder="(11) 99999-9999" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-card-foreground">
                E-mail *
              </Label>
              <Input id="email" type="email" placeholder="contato@empresa.com" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-card-foreground">
              Descrição
            </Label>
            <Textarea id="description" placeholder="Descreva sua empresa e os serviços oferecidos" rows={4} />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="opening-time" className="text-card-foreground">
                Horário de Abertura *
              </Label>
              <Input id="opening-time" type="time" defaultValue="08:00" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="closing-time" className="text-card-foreground">
                Horário de Fechamento *
              </Label>
              <Input id="closing-time" type="time" defaultValue="18:00" />
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6">
          <h3 className="text-lg font-semibold mb-4 text-card-foreground">Serviços Oferecidos</h3>

          <div className="space-y-4 mb-4">
            <div className="grid md:grid-cols-3 gap-3">
              <div className="space-y-2">
                <Label htmlFor="service-name" className="text-card-foreground">
                  Nome do Serviço
                </Label>
                <Input
                  id="service-name"
                  placeholder="Ex: Corte de Cabelo"
                  value={newService.name}
                  onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="service-price" className="text-card-foreground">
                  Preço (R$)
                </Label>
                <Input
                  id="service-price"
                  placeholder="50,00"
                  value={newService.price}
                  onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="service-duration" className="text-card-foreground">
                  Duração (min)
                </Label>
                <Input
                  id="service-duration"
                  placeholder="30"
                  value={newService.duration}
                  onChange={(e) => setNewService({ ...newService, duration: e.target.value })}
                />
              </div>
            </div>
            <Button
              type="button"
              onClick={addService}
              className="w-full md:w-auto bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Serviço
            </Button>
          </div>

          {services.length > 0 && (
            <div className="space-y-2">
              {services.map((service) => (
                <div key={service.id} className="flex items-center justify-between bg-muted p-3 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-card-foreground">{service.name}</p>
                    <p className="text-sm text-muted-foreground">
                      R$ {service.price} • {service.duration} minutos
                    </p>
                  </div>
                  <Button type="button" variant="ghost" size="sm" onClick={() => removeService(service.id)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="button" variant="outline" className="flex-1 bg-transparent">
            Cancelar
          </Button>
          <Button type="submit" className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
            Cadastrar Empresa
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
