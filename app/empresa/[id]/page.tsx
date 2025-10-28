import { CompanyDetails } from "@/components/user/company-details"
import { CompanyServices } from "@/components/user/company-services"
import { CompanyReviews } from "@/components/user/company-reviews"

export default function CompanyPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-muted/30">
      <CompanyDetails />

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <CompanyServices />
            <CompanyReviews />
          </div>
          <aside className="lg:col-span-1">
            <div className="sticky top-20">{/* Booking widget will be added in next task */}</div>
          </aside>
        </div>
      </div>
    </div>
  )
}
