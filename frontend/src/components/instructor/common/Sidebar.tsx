
import type React from "react"
import {
  LayoutDashboard,
  PlusCircle,
  BookOpen,
  DollarSign,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Link } from "react-router-dom"

interface SidebarProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export function Sidebar({ open, setOpen }: SidebarProps) {
  return (
    <>
      {/* Mobile sidebar backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile menu button */}
      <Button
        variant="outline"
        size="icon"
        className="fixed left-4 top-4 z-50 lg:hidden"
        onClick={() => setOpen(!open)}
      >
        {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-gray-950 text-white transition-transform duration-300 ease-in-out lg:static lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center border-b border-gray-800 px-6">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            tutoriam
          </Link>
        </div>
        <ScrollArea className="flex-1 py-4">
          <nav className="grid gap-1 px-2">
            <NavItem href="/instructor/dashboard" icon={<LayoutDashboard className="h-4 w-4" />} active>
              Dashboard
            </NavItem>
            <NavItem href="/instructor/create-course" icon={<PlusCircle className="h-4 w-4" />}>
              Create New Course
            </NavItem>
            <NavItem href="/instructor/my-courses" icon={<BookOpen className="h-4 w-4" />}>
              My Courses
            </NavItem>
            <NavItem href="/instructor/earning" icon={<DollarSign className="h-4 w-4" />}>
              Earning
            </NavItem>
            <NavItem href="/instructor/message" icon={<MessageSquare className="h-4 w-4" />} badge={1}>
              Message
            </NavItem>
            <NavItem href="/instructor/settings" icon={<Settings className="h-4 w-4" />}>
              Settings
            </NavItem>
          </nav>
        </ScrollArea>
        <div className="mt-auto border-t border-gray-800 p-4">
          <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-white hover:bg-gray-800">
            <LogOut className="mr-2 h-4 w-4" />
            Sign-out
          </Button>
        </div>
      </div>
    </>
  )
}

interface NavItemProps {
  href: string
  icon: React.ReactNode
  children: React.ReactNode
  active?: boolean
  badge?: number
}

function NavItem({ href, icon, children, active, badge }: NavItemProps) {
  return (
    <Link
        to={href}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
        active ? "bg-gray-800 text-white font-medium" : "text-gray-400 hover:text-white hover:bg-gray-800",
      )}
    >
      {icon}
      <span>{children}</span>
      {badge && (
        <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
          {badge}
        </span>
      )}
    </Link>
  )
}

