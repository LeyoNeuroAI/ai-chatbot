
import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar"
import {AppSidebar} from "@/app/dashboard/components/app-sidebar";


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                </div>
            </header>
            <section className="py-4">
                <div className="container px-0 md:px-8">
          {children}
                </div>
                </section>
        </SidebarInset>

      </SidebarProvider>


  )
}