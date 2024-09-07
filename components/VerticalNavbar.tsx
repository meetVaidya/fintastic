'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Compass, BookOpen, Cpu, Settings } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useState } from 'react';
import { IconPigMoney } from '@tabler/icons-react'

const navItems = [
    { name: 'Home', href: '/dashboard', icon: Home },
    { name: 'Explore', href: '/dashboard/explore', icon: Compass },
    { name: 'Game', href: '/game', icon: BookOpen },
    { name: 'Portfolio', href: '/portfolio', icon: IconPigMoney },
    { name: 'AI', href: '/ai', icon: Cpu },
]

export default function VerticalNavbar() {
    const pathname = usePathname()
    const [isNavbarExpanded, setIsNavbarExpanded] = useState(false);

    return (
        <nav
            className={cn(
                "flex flex-col justify-center space-y-8 w-auto p-4 h-screen bg-background border-r transition-all duration-300 ease-in-out",
                isNavbarExpanded ? "w-64" : "w-28 items-center"
            )}
            onMouseEnter={() => setIsNavbarExpanded(true)}
            onMouseLeave={() => setIsNavbarExpanded(false)}
        >
            {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                    <Link key={item.name} href={item.href} passHref>
                        <Button
                            variant={isActive ? "secondary" : "ghost"}
                            className={cn(
                                "relative rounded-full p-4 justify-start",
                                isActive && "bg-secondary"
                            )}
                        >
                            <item.icon className="h-6 w-6" />
                            {isNavbarExpanded && <span className="absolute left-14 text-sm pl-3">{item.name}</span>}
                        </Button>
                    </Link>
                )
            })}
            <div className={cn("flex flex-col space-y-4", isNavbarExpanded && "ml-12")}>
                <LogoutLink>
                    <Button variant="outline">Log out</Button>
                </LogoutLink>
            </div>
        </nav>
    )
}
