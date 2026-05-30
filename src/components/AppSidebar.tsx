import { Link, useRouterState } from "@tanstack/react-router";
import { Home, GraduationCap, Sparkles, BookOpen } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { APP_NAME, APP_SUFFIX, MODULES } from "@/lib/course-data";

const primary = [
  { title: "Início", url: "/", icon: Home },
  { title: "Curso", url: "/curso", icon: GraduationCap },
  { title: "Assistente", url: "/assistente", icon: Sparkles },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isActive = (path: string) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className={collapsed ? "px-2 py-4 flex justify-center" : "px-3 py-4"}>
        <Link
          to="/"
          className={collapsed
            ? "flex justify-center"
            : "font-extrabold text-base tracking-tight flex items-center gap-2"}
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-hover text-primary-foreground font-extrabold text-sm shadow-lg shadow-primary/30 ring-1 ring-white/20 shrink-0">
            YF
          </span>
          {!collapsed && (
            <span className="leading-tight">
              {APP_NAME} <span className="text-primary">• {APP_SUFFIX}</span>
            </span>
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navegação</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {primary.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)} tooltip={item.title}>
                    <Link to={item.url} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Módulos</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {MODULES.map((m) => (
                <SidebarMenuItem key={m.id}>
                  <SidebarMenuButton asChild tooltip={`Módulo ${m.num}: ${m.title}`}>
                    <Link
                      to="/aula/$id"
                      params={{ id: m.lessons[0].id }}
                      className="flex items-center gap-2"
                    >
                      <BookOpen className="h-4 w-4" />
                      {!collapsed && (
                        <span className="truncate">
                          <span className="text-muted-foreground mr-1.5">{m.num}</span>
                          {m.title}
                        </span>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
