import { SearchFilters } from "@/components/user/search-filters"
import { CompanyList } from "@/components/user/company-list"

export default function BuscarPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-muted/30">
      <div className="bg-gradient-to-b from-primary/10 to-transparent py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Encontre o serviço perfeito</h1>
            <p className="text-muted-foreground text-lg">
              Busque por categoria, localização ou nome do estabelecimento
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <SearchFilters />
          </aside>
          <main className="lg:col-span-3">
            <CompanyList />
          </main>
        </div>
      </div>
    </div>
  )
}
