import Link from 'next/link'
import { Flame } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";

export default function HorizontalNavbar() {
    return (
        <nav className="flex items-center justify-between p-4 bg-black text-white">
            <div className="flex items-center space-x-8">
                <Link href="/" className="flex items-center space-x-2">
                    <Flame className="h-6 w-6" />
                    <span>Fintastic</span>
                </Link>
                <div className="hidden md:flex space-x-6">
                    <Link href="https://github.com/meetVaidya/NFC3_HackShacks" className="flex items-center">
                        Github
                        <Badge variant="secondary" className="ml-2 bg-yellow-500 text-black text-xs">Hot</Badge>
                    </Link>
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <Button variant="ghost" className="text-white">
                    <LoginLink>Sign in</LoginLink>
                </Button>

                <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                    <RegisterLink>Sign up</RegisterLink>
                </Button>

            </div>
        </nav>
    )
}