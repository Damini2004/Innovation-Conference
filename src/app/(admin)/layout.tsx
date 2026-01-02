import { SidebarProvider } from "@/components/ui/sidebar";
import SessionProvider from "@/components/auth/session-provider";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <SessionProvider>
        <div className="flex min-h-screen w-full bg-muted/40">{children}</div>
      </SessionProvider>
    </SidebarProvider>
  );
}
