import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: ReactNode;
  sidebar?: ReactNode;
  header?: ReactNode;
  className?: string;
}

export function DashboardLayout({ 
  children, 
  sidebar, 
  header, 
  className 
}: DashboardLayoutProps) {
  return (
    <div className={cn("min-h-screen bg-background", className)}>
      {/* Header */}
      {header && (
        <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          {header}
        </header>
      )}
      
      <div className="flex">
        {/* Sidebar */}
        {sidebar && (
          <aside className="w-64 border-r bg-card">
            {sidebar}
          </aside>
        )}
        
        {/* Main Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}