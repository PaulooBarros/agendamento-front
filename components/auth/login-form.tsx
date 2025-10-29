"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Eye, EyeOff, Briefcase, Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import { supabase } from "@/lib/supabaseClient"

export function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccessMessage("")

    // 🔹 Login no Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError("Email ou senha inválidos")
      setIsLoading(false)
      return
    }

    const user = data.user
    if (!user) {
      setError("Erro ao autenticar usuário")
      setIsLoading(false)
      return
    }

    // 🔹 Verifica se o usuário é uma empresa
    const { data: empresa } = await supabase
      .from("empresas")
      .select("id, nome")
      .eq("admin_id", user.id)
      .single()

    if (empresa) {
      // Mostra mensagem e animação de boas-vindas
      setSuccessMessage(`Bem-vindo de volta, ${empresa.nome}! 🚀`)
      setTimeout(() => {
        router.push(`/empresas/${empresa.id}/dashboard`)
      }, 1500)
    } else {
      // Caso contrário, redireciona para busca
      router.push("/buscar")
    }

    setIsLoading(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-6 max-w-md mx-auto mt-10">
        {successMessage ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center py-10 space-y-4"
          >
            <Briefcase className="w-12 h-12 text-primary" />
            <p className="text-lg font-semibold text-foreground text-center">
              {successMessage}
            </p>
            <p className="text-sm text-muted-foreground text-center">
              Redirecionando para o painel da empresa...
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

            <Button
              type="submit"
              className="w-full flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin w-4 h-4 mr-2" />
                  Entrando...
                </>
              ) : (
                "Entrar"
              )}
            </Button>
          </form>
        )}
      </Card>
    </motion.div>
  )
}
