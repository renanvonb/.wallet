'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { PanelLeftClose, PanelLeftOpen, Bell, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useSidebar } from '@/hooks/use-sidebar-state'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
} from "@/components/ui/breadcrumb"

interface NavLink {
    label: string
    href: string
}

interface PageHeaderProps {
    links: NavLink[]
}

export function PageHeader({ links }: PageHeaderProps) {
    const pathname = usePathname()
    const { isOpen, toggle } = useSidebar()

    // Determine current module name based on path or static "Financeiro"
    // Since this is used in FinanceLayout, we can default to "Financeiro" 
    // or derive it from the first segment if we want to be generic.
    // Requirement: "Breadcrumb deve exibir apenas o nome do módulo atual (ex: Financeiro)" and "estático"
    const moduleName = "Financeiro"

    return (
        <header className="sticky top-0 z-30 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md h-16 flex-none font-sans">
            <div className="max-w-[1440px] mx-auto px-8 h-full grid grid-cols-3 items-center w-full">

                {/* 1. Left: Sidebar Toggle + Static Breadcrumb */}
                <div className="flex items-center gap-4 justify-start">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggle}
                        className="text-zinc-400 hover:text-zinc-950 transition-all flex-none"
                        title={isOpen ? "Recolher Sidebar" : "Expandir Sidebar"}
                    >
                        {isOpen ? (
                            <PanelLeftClose className="h-5 w-5" />
                        ) : (
                            <PanelLeftOpen className="h-5 w-5" />
                        )}
                    </Button>

                    <Breadcrumb className="hidden md:block select-none">
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbPage className="font-medium text-zinc-950 text-sm">
                                    {moduleName}
                                </BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>

                {/* 2. Center: Navigation Links (Tab Style) */}
                <div className="flex items-center justify-center">
                    <nav className="flex items-center gap-6 h-full">
                        {links.map((link) => {
                            const isActive = pathname.startsWith(link.href)
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        'relative h-16 flex items-center px-1 text-sm font-medium transition-colors border-b-2',
                                        isActive
                                            ? 'text-foreground border-primary'
                                            : 'text-muted-foreground border-transparent hover:text-foreground'
                                    )}
                                >
                                    {link.label}
                                </Link>
                            )
                        })}
                    </nav>
                </div>

                {/* 3. Right: Actions (Theme, Notifications) */}
                <div className="flex items-center gap-3 justify-end">
                    <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Alternar Tema"
                        className="text-zinc-400 hover:text-zinc-950 rounded-full"
                    >
                        <Sun className="h-5 w-5" />
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Notificações"
                        className="text-zinc-400 hover:text-zinc-950 rounded-full"
                    >
                        <Bell className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </header>
    )
}
