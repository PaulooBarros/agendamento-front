"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"

interface SearchFiltersProps {
  filters: {
    search: string
    city: string
    maxPrice: number
    orderBy: string
    orderDirection: string
  }
  onChange: (filters: any) => void
}

export function SearchFilters({ filters, onChange }: SearchFiltersProps) {
  const handleChange = (field: string, value: any) => {
    onChange({ ...filters, [field]: value })
  }

  return (
    <div className="space-y-6 bg-card p-6 rounded-lg shadow-sm border">
      <div className="space-y-2">
        <Label>Buscar Serviço</Label>
        <Input
          placeholder="Ex: corte, manicure..."
          value={filters.search}
          onChange={(e) => handleChange("search", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Cidade</Label>
        <Input
          placeholder="Digite a cidade"
          value={filters.city}
          onChange={(e) => handleChange("city", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Preço Máximo</Label>
        <Slider
          value={[filters.maxPrice]}
          onValueChange={(val) => handleChange("maxPrice", val[0])}
          max={1000}
          step={10}
        />
        <p className="text-sm text-muted-foreground">
          Até R$ {filters.maxPrice}
        </p>
      </div>

      <div className="space-y-2">
        <Label>Ordenar Por</Label>
        <Button
          variant="outline"
          className="w-full flex items-center justify-between"
          onClick={() =>
            handleChange(
              "orderBy",
              filters.orderBy === "preco" ? "duracao_minutos" : "preco"
            )
          }
        >
          {filters.orderBy === "preco" ? "Preço" : "Duração"}
          <ArrowUpDown className="w-4 h-4 ml-1" />
        </Button>
      </div>

      <div className="space-y-2">
        <Label>Ordem</Label>
        <Button
          variant="outline"
          className="w-full"
          onClick={() =>
            handleChange(
              "orderDirection",
              filters.orderDirection === "asc" ? "desc" : "asc"
            )
          }
        >
          {filters.orderDirection === "asc"
            ? "⬆️ Crescente"
            : "⬇️ Decrescente"}
        </Button>
      </div>

      <Button
        className="w-full mt-2"
        variant="secondary"
        onClick={() =>
          onChange({
            search: "",
            city: "",
            maxPrice: 500,
            orderBy: "preco",
            orderDirection: "asc",
          })
        }
      >
        Limpar Filtros
      </Button>
    </div>
  )
}
