"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { supabase } from "@/lib/supabaseClient"
import {
  MapPin,
  Star,
  Clock,
  Loader2,
  LayoutGrid,
  List,
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface Servico {
  id: string
  nome: string
  descricao: string
  preco: number
  duracao_minutos: number
  ativo: boolean
  empresa: {
    id: string
    nome: string
    cidade: string
    estado: string
  }
}

export function CompanyList({ filters }: { filters: any }) {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [servicos, setServicos] = useState<Servico[]>([])
  const [loading, setLoading] = useState(true)
  const [layout, setLayout] = useState<"grid" | "list">("grid")

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLoggedIn(!!localStorage.getItem("user"))
    }
  }, [])

  useEffect(() => {
    fetchServicos()
  }, [filters])

  async function fetchServicos() {
    setLoading(true)
    let query = supabase
      .from("servicos")
      .select(`
                id,
                nome,
                descricao,
                preco,
                duracao_minutos,
                ativo,
                empresa:empresa_id (
                  id,
                  nome,
                  cidade,
                  estado
                )
              `)


      .eq("ativo", true)
      .lte("preco", filters.maxPrice)
      .order(filters.orderBy, {
        ascending: filters.orderDirection === "asc",
      })

    if (filters.search.trim() !== "")
      query = query.ilike("nome", `%${filters.search}%`)

    if (filters.city.trim() !== "")
      query = query.ilike("empresa.cidade", `%${filters.city}%`)

    const { data, error } = await query

    if (error) {
      console.error("Erro ao buscar serviços:", error.message)
      setServicos([])
    } else {
      setServicos(data || [])
    }

    setLoading(false)
  }

  const handleAgendar = (empresaId: string, servicoId: string) => {
    if (isLoggedIn) {
      // Novo fluxo: vai para página de agendamento com o serviço pré-selecionado
      router.push(`/empresas/${empresaId}/agendar?servico=${servicoId}`)
    } else {
      router.push("/login")
    }
  }

  return (
    <div className="space-y-6">
      {/* Barra superior */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          {loading
            ? ""
            : `${servicos.length} serviço${servicos.length !== 1 ? "s" : ""} encontrado${servicos.length !== 1 ? "s" : ""}`}
        </p>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setLayout(layout === "grid" ? "list" : "grid")}
          className="flex items-center gap-2"
        >
          {layout === "grid" ? (
            <>
              <List className="w-4 h-4" />
              Lista
            </>
          ) : (
            <>
              <LayoutGrid className="w-4 h-4" />
              Grade
            </>
          )}
        </Button>
      </div>

      {/* Estado de carregamento */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="animate-spin w-8 h-8 text-muted-foreground" />
        </div>
      ) : servicos.length === 0 ? (
        <div className="text-center text-muted-foreground py-12">
          Nenhum serviço encontrado.
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={layout}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className={cn(
              "gap-6",
              layout === "grid"
                ? "grid sm:grid-cols-2 lg:grid-cols-3"
                : "flex flex-col"
            )}
          >
            {servicos.map((servico, index) => (
              <motion.div
                key={servico.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: index * 0.05,
                  duration: 0.4,
                  ease: "easeOut",
                }}
              >
                <Card
                  className={cn(
                    "overflow-hidden hover:shadow-lg transition-shadow",
                    layout === "list" && "flex items-center"
                  )}
                >
                  {/* Imagem */}
                  <div
                    className={cn(
                      layout === "list" ? "w-40 h-40" : "w-full h-52",
                      "shrink-0"
                    )}
                  >
                    <img
                      src="/placeholder.svg"
                      alt={servico.nome}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Conteúdo */}
                  <div
                    className={cn(
                      "p-6 space-y-4 flex-1",
                      layout === "list" && "p-4"
                    )}
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-xl font-semibold text-card-foreground">
                            {servico.nome}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {servico.empresa?.nome}
                          </p>
                        </div>
                        <Badge className="bg-green-500/10 text-green-700">
                          {servico.duracao_minutos} min
                        </Badge>
                      </div>

                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">
                            {Math.floor(Math.random() * 2) + 4}.
                            {Math.floor(Math.random() * 9)}
                          </span>
                          <span className="text-muted-foreground">
                            ({Math.floor(Math.random() * 200)} avaliações)
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>
                            {servico.empresa?.cidade}, {servico.empresa?.estado}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>
                            R$ {servico.preco.toFixed(2).replace(".", ",")}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button asChild className="flex-1">
                        <Link href={`/empresas/${servico.empresa?.id}`}>
                          Ver Detalhes
                        </Link>
                      </Button>

                      <Button
                        variant="outline"
                        className="flex-1 bg-transparent"
                        onClick={() =>
                          handleAgendar(servico.empresa?.id, servico.id)
                        }
                      >
                        {isLoggedIn ? "Agendar Agora" : "Login para Agendar"}
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  )
}
