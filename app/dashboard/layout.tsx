import { ReactNode } from 'react'
import Link from 'next/link'
import { Home, Search, BookOpen, BookMarked, CircleDollarSign } from 'lucide-react'
import VerticalNavbar from '@/components/VerticalNavbar'


interface DashboardLayoutProps {
    children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <div className="flex h-screen bg-background text-foreground">
            {/* Vertical Navbar */}
            <VerticalNavbar />

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">

                {/* Dashboard Content */}
                <main className="flex-1 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    )
}