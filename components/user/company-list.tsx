"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star, Clock, Loader2, Search, SlidersHorizontal } from "lucide-react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"

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

export function CompanyList() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [servicos, setServicos] = useState<Servico[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [city, setCity] = useState("")
  const [maxPrice, setMaxPrice] = useState(500)
  const [openFilter, setOpenFilter] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLoggedIn(!!localStorage.getItem("user"))
    }
  }, [])

  useEffect(() => {
    fetchServicos()
  }, [search, city, maxPrice])

  // 🔹 Buscar serviços com filtros dinâmicos
  async function fetchServicos() {
    setLoading(true)

    let query = supabase
      .from("servicos")
      .select(
        `
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
      `
      )
      .eq("ativo", true)
      .lte("preco", maxPrice)
      .order("nome", { ascending: true })

    if (search.trim() !== "") {
      query = query.ilike("nome", `%${search}%`)
    }

    if (city.trim() !== "") {
      query = query.ilike("empresa.cidade", `%${city}%`)
    }

    const { data, error } = await query

    if (error) {
      console.error("Erro ao buscar serviços:", error.message)
    } else {
      setServicos(data || [])
    }

    setLoading(false)
  }

  const handleAgendar = (empresaId: string) => {
    if (isLoggedIn) {
      router.push(`/empresas/${empresaId}/agendar`)
    } else {
      router.push("/login")
    }
  }

  return (
    <div className="space-y-6">
      {/* 🔍 Barra de Busca + Filtros */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-1/2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Buscar por nome do serviço..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="flex items-center gap-2">
          <Popover open={openFilter} onOpenChange={setOpenFilter}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4" />
                Filtros
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-72 p-4 space-y-4">
              <div>
                <label className="text-sm font-medium">Cidade</label>
                <Input
                  placeholder="Digite a cidade"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-sm font-medium flex justify-between">
                  <span>Preço Máximo</span>
                  <span className="text-primary font-semibold">R$ {maxPrice}</span>
                </label>
                <Slider
                  value={[maxPrice]}
                  onValueChange={(val) => setMaxPrice(val[0])}
                  max={1000}
                  step={10}
                  className="mt-2"
                />
              </div>

              <Button className="w-full mt-2" onClick={() => setOpenFilter(false)}>
                Aplicar Filtros
              </Button>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* 🔄 Status de carregamento */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="animate-spin w-8 h-8 text-muted-foreground" />
        </div>
      ) : servicos.length === 0 ? (
        <div className="text-center text-muted-foreground py-12">
          Nenhum serviço encontrado.
        </div>
      ) : (
        <>
          <p className="text-sm text-muted-foreground">
            {servicos.length} serviços encontrados
          </p>

          <div className="grid gap-6">
            {servicos.map((servico) => (
              <Card
                key={servico.id}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="md:col-span-1">
                    <img
                      src="/placeholder.svg"
                      alt={servico.nome}
                      className="w-full h-full object-cover min-h-[200px]"
                    />
                  </div>

                  <div className="md:col-span-2 p-6 space-y-4">
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

                    <div className="flex gap-2">
                      <Button asChild className="flex-1">
                        <Link href={`/empresas/${servico.empresa?.id}`}>
                          Ver Detalhes
                        </Link>
                      </Button>

                      <Button
                        variant="outline"
                        className="flex-1 bg-transparent"
                        onClick={() => handleAgendar(servico.empresa?.id)}
                      >
                        {isLoggedIn ? "Agendar Agora" : "Login para Agendar"}
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
