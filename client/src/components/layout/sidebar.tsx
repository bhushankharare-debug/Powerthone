import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  LineChart, 
  FileText, 
  Leaf,
  Factory
} from "lucide-react";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const [location] = useLocation();

  const navItems = [
    { icon: LayoutDashboard, label: "Overview", href: "/" },
    { icon: LineChart, label: "Forecast Models", href: "/forecast" },
    { icon: FileText, label: "Reports", href: "/reports" },
  ];

  return (
    <div className="w-64 border-r border-sidebar-border bg-sidebar h-screen flex flex-col fixed left-0 top-0">
      <div className="p-6 flex items-center gap-3 border-b border-sidebar-border/50">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
          <Leaf className="w-5 h-5" />
        </div>
        <div>
          <h1 className="font-bold text-sm tracking-tight text-sidebar-foreground">ZeroCarbon AI</h1>
          <p className="text-xs text-sidebar-foreground/60">Forecasting Engine</p>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <a className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
              location === item.href 
                ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
            )}>
              <item.icon className="w-4 h-4" />
              {item.label}
            </a>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-sidebar-border/50">
        <div className="bg-sidebar-accent/50 rounded-lg p-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <Factory className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-xs font-semibold text-sidebar-foreground">Manufacturing Unit A</p>
            <p className="text-[10px] text-sidebar-foreground/60">Connected • Live</p>
          </div>
        </div>
      </div>
    </div>
  );
}
