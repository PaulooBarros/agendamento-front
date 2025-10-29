"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Eye, EyeOff, Upload } from "lucide-react"
import { supabase } from "@/lib/supabaseClient"

export function CompanyRegistrationForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [form, setForm] = useState({
    companyName: "",
    cnpj: "",
    description: "",
    cep: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    phone: "",
    email: "",
    adminName: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // 1️⃣ Criar conta no Auth para o responsável pela empresa
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
      })

      if (authError) throw authError
      const userId = authData.user?.id

      // 2️⃣ Inserir empresa no banco
      const { error: insertError } = await supabase.from("empresas").insert([
        {
          nome: form.companyName,
          cnpj: form.cnpj,
          descricao: form.description,
          cep: form.cep,
          rua: form.street,
          numero: form.number,
          complemento: form.complement,
          bairro: form.neighborhood,
          cidade: form.city,
          estado: form.state,
          telefone: form.phone,
          email: form.email,
          admin_id: userId,
        },
      ])

      if (insertError) throw insertError

      alert("Empresa cadastrada com sucesso!")
      router.push("/login")
    } catch (err: any) {
      setError(err.message || "Erro ao cadastrar empresa.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="p-6 max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Cadastro da Empresa</h2>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="companyName">Nome da Empresa</Label>
            <Input id="companyName" value={form.companyName} onChange={handleChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cnpj">CNPJ</Label>
            <Input id="cnpj" value={form.cnpj} onChange={handleChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea id="description" rows={4} value={form.description} onChange={handleChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cep">CEP</Label>
            <Input id="cep" value={form.cep} onChange={handleChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="street">Rua</Label>
            <Input id="street" value={form.street} onChange={handleChange} required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="number">Número</Label>
              <Input id="number" value={form.number} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="complement">Complemento</Label>
              <Input id="complement" value={form.complement} onChange={handleChange} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="neighborhood">Bairro</Label>
              <Input id="neighborhood" value={form.neighborhood} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">Cidade</Label>
              <Input id="city" value={form.city} onChange={handleChange} required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="state">Estado</Label>
            <Input id="state" value={form.state} onChange={handleChange} maxLength={2} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Telefone</Label>
            <Input id="phone" value={form.phone} onChange={handleChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={form.email} onChange={handleChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="adminName">Nome do Responsável</Label>
            <Input id="adminName" value={form.adminName} onChange={handleChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
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
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Cadastrando empresa..." : "Cadastrar Empresa"}
          </Button>
        </div>
      </form>
    </Card>
  )
}
