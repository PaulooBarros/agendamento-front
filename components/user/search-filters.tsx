"use client"

import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export function SearchFilters() {
  return (
    <Card className="p-6 space-y-6 sticky top-20">
      <div>
        <h2 className="text-lg font-semibold text-card-foreground mb-4">Filtros</h2>
      </div>

      <div className="space-y-2">
        <Label htmlFor="search">Buscar</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input id="search" placeholder="Nome do estabelecimento" className="pl-9" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Localização</Label>
        <Input id="location" placeholder="Cidade ou bairro" />
      </div>

      <div className="space-y-3">
        <Label>Categoria</Label>
        <div className="space-y-2">
          {["Salão de Beleza", "Barbearia", "Estética", "Spa", "Manicure"].map((category) => (
            <label key={category} className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded border-border" />
              <span className="text-sm text-muted-foreground">{category}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Faixa de Preço</Label>
        <div className="space-y-2">
          {["Até R$ 50", "R$ 50 - R$ 100", "R$ 100 - R$ 200", "Acima de R$ 200"].map((range) => (
            <label key={range} className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="price" className="border-border" />
              <span className="text-sm text-muted-foreground">{range}</span>
            </label>
          ))}
        </div>
      </div>

      <Button className="w-full">Aplicar Filtros</Button>
    </Card>
  )
}
