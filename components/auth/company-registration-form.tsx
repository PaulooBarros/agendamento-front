"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Eye, EyeOff, Upload } from "lucide-react"

export function CompanyRegistrationForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // TODO: Implement actual company registration logic
    console.log("[v0] Company registration form submitted")
    setIsLoading(false)
  }

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Dados da Empresa */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Dados da Empresa</h2>

          <div className="space-y-2">
            <Label htmlFor="companyName">Nome da Empresa</Label>
            <Input id="companyName" type="text" placeholder="Salão Beleza Total" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cnpj">CNPJ</Label>
            <Input id="cnpj" type="text" placeholder="00.000.000/0000-00" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              placeholder="Descreva sua empresa e os serviços oferecidos..."
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="logo">Logo da Empresa</Label>
            <div className="flex items-center gap-4">
              <Button type="button" variant="outline" className="w-full bg-transparent">
                <Upload className="w-4 h-4 mr-2" />
                Fazer upload da logo
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">PNG, JPG ou JPEG. Máximo 2MB.</p>
          </div>
        </div>

        {/* Endereço */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Endereço</h2>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 col-span-2 sm:col-span-1">
              <Label htmlFor="cep">CEP</Label>
              <Input id="cep" type="text" placeholder="00000-000" required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="street">Rua</Label>
            <Input id="street" type="text" placeholder="Rua das Flores" required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="number">Número</Label>
              <Input id="number" type="text" placeholder="123" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="complement">Complemento</Label>
              <Input id="complement" type="text" placeholder="Sala 1" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="neighborhood">Bairro</Label>
              <Input id="neighborhood" type="text" placeholder="Centro" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">Cidade</Label>
              <Input id="city" type="text" placeholder="São Paulo" required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="state">Estado</Label>
            <Input id="state" type="text" placeholder="SP" required maxLength={2} />
          </div>
        </div>

        {/* Contato */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Contato</h2>

          <div className="space-y-2">
            <Label htmlFor="phone">Telefone</Label>
            <Input id="phone" type="tel" placeholder="(11) 99999-9999" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="contato@empresa.com" required />
          </div>
        </div>

        {/* Dados de Acesso */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Dados de Acesso</h2>

          <div className="space-y-2">
            <Label htmlFor="adminName">Nome do Responsável</Label>
            <Input id="adminName" type="text" placeholder="João Silva" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-xs text-muted-foreground">Mínimo de 6 caracteres</p>
          </div>
        </div>

        <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
          {isLoading ? "Cadastrando empresa..." : "Cadastrar Empresa"}
        </Button>

        <p className="text-xs text-center text-muted-foreground">
          Ao cadastrar sua empresa, você concorda com nossos{" "}
          <a href="/termos" className="text-primary hover:underline">
            Termos de Uso
          </a>{" "}
          e{" "}
          <a href="/privacidade" className="text-primary hover:underline">
            Política de Privacidade
          </a>
        </p>
      </form>
    </Card>
  )
}
