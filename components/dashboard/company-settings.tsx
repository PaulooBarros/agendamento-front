"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload } from "lucide-react"

export function CompanySettings() {
  const [activeTab, setActiveTab] = useState("general")

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="general">Geral</TabsTrigger>
        <TabsTrigger value="hours">Horários</TabsTrigger>
        <TabsTrigger value="notifications">Notificações</TabsTrigger>
      </TabsList>

      <TabsContent value="general">
        <Card className="p-6">
          <form className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-card-foreground">Informações da Empresa</h3>

              <div className="space-y-2">
                <Label htmlFor="companyName">Nome da Empresa</Label>
                <Input id="companyName" defaultValue="Salão Beleza Total" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  rows={4}
                  defaultValue="Salão de beleza completo com profissionais especializados em cortes, coloração, tratamentos capilares e muito mais."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="logo">Logo da Empresa</Label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-muted rounded-lg flex items-center justify-center">
                    <span className="text-2xl font-bold text-muted-foreground">BT</span>
                  </div>
                  <Button type="button" variant="outline" className="bg-transparent">
                    <Upload className="w-4 h-4 mr-2" />
                    Alterar Logo
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-card-foreground">Endereço</h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cep">CEP</Label>
                  <Input id="cep" defaultValue="01234-567" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="street">Rua</Label>
                  <Input id="street" defaultValue="Rua das Flores" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="number">Número</Label>
                  <Input id="number" defaultValue="123" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="complement">Complemento</Label>
                  <Input id="complement" placeholder="Sala, andar..." />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="neighborhood">Bairro</Label>
                  <Input id="neighborhood" defaultValue="Centro" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">Cidade</Label>
                  <Input id="city" defaultValue="São Paulo" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-card-foreground">Contato</h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input id="phone" defaultValue="(11) 99999-9999" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="contato@belezatotal.com" />
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button type="submit">Salvar Alterações</Button>
              <Button type="button" variant="outline" className="bg-transparent">
                Cancelar
              </Button>
            </div>
          </form>
        </Card>
      </TabsContent>

      <TabsContent value="hours">
        <Card className="p-6">
          <form className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-card-foreground">Horário de Funcionamento</h3>
              <p className="text-sm text-muted-foreground">
                Configure os horários de funcionamento da sua empresa para cada dia da semana
              </p>

              {[
                { day: "Segunda-feira", id: "monday" },
                { day: "Terça-feira", id: "tuesday" },
                { day: "Quarta-feira", id: "wednesday" },
                { day: "Quinta-feira", id: "thursday" },
                { day: "Sexta-feira", id: "friday" },
                { day: "Sábado", id: "saturday" },
                { day: "Domingo", id: "sunday" },
              ].map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="w-32">
                    <Label>{item.day}</Label>
                  </div>
                  <div className="flex items-center gap-2 flex-1">
                    <Input type="time" defaultValue="09:00" className="w-32" />
                    <span className="text-muted-foreground">até</span>
                    <Input type="time" defaultValue="18:00" className="w-32" />
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-border" />
                    <span className="text-sm text-muted-foreground">Fechado</span>
                  </label>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <Button type="submit">Salvar Horários</Button>
              <Button type="button" variant="outline" className="bg-transparent">
                Cancelar
              </Button>
            </div>
          </form>
        </Card>
      </TabsContent>

      <TabsContent value="notifications">
        <Card className="p-6">
          <form className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-card-foreground">Preferências de Notificação</h3>
              <p className="text-sm text-muted-foreground">
                Configure como você deseja receber notificações sobre agendamentos
              </p>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium text-card-foreground">Novos Agendamentos</p>
                    <p className="text-sm text-muted-foreground">
                      Receba notificações quando houver novos agendamentos
                    </p>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded border-border" />
                </div>

                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium text-card-foreground">Cancelamentos</p>
                    <p className="text-sm text-muted-foreground">
                      Receba notificações quando um agendamento for cancelado
                    </p>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded border-border" />
                </div>

                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium text-card-foreground">Lembretes</p>
                    <p className="text-sm text-muted-foreground">Receba lembretes sobre agendamentos próximos</p>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded border-border" />
                </div>

                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium text-card-foreground">Avaliações</p>
                    <p className="text-sm text-muted-foreground">Receba notificações quando receber novas avaliações</p>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded border-border" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-card-foreground">Canais de Notificação</h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium text-card-foreground">Email</p>
                    <p className="text-sm text-muted-foreground">Receber notificações por email</p>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded border-border" />
                </div>

                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium text-card-foreground">SMS</p>
                    <p className="text-sm text-muted-foreground">Receber notificações por SMS</p>
                  </div>
                  <input type="checkbox" className="rounded border-border" />
                </div>

                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium text-card-foreground">WhatsApp</p>
                    <p className="text-sm text-muted-foreground">Receber notificações por WhatsApp</p>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded border-border" />
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button type="submit">Salvar Preferências</Button>
              <Button type="button" variant="outline" className="bg-transparent">
                Cancelar
              </Button>
            </div>
          </form>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
