import { Sidebar } from "./sidebar";

interface ShellProps {
  children: React.ReactNode;
}

export function Shell({ children }: ShellProps) {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans pl-64">
      <Sidebar />
      <main className="min-h-screen">
        {children}
      </main>
    </div>
  );
}
