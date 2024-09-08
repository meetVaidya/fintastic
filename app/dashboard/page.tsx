"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import StockCarousel from "@/components/StockCarousel";
import MarketPerformance from "@/components/MarketPerformance";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

// Mock authentication function (replace with your actual auth logic)
const isAuthenticated = () => {
    // This should check if the user is actually authenticated
    return true;
};

export default function Dashboard() {
    const { user, getUser } = useKindeBrowserClient();
    const alsoUser = getUser();
    // const [userName, setUserName] = useState("Vanshik")
    const [date, setDate] = useState("");
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated()) {
            router.push("/"); // Redirect to home if not authenticated
        }

        const currentDate = new Date();
        setDate(
            currentDate.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            })
        );
    }, [router]);

    return (
        <div className="min-h-screen bg-black text-white p-6 z-0">
            <div className="max-w-7xl mx-auto">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">
                            Hello, {alsoUser?.given_name}
                        </h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Button variant="ghost">For you</Button>
                        <Button variant="ghost">Screener</Button>
                        <Input
                            type="search"
                            placeholder="Search..."
                            className="bg-gray-800 border-gray-700"
                        />
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="bg-gray-900 border-gray-800">
                        <StockCarousel />
                    </Card>

                    <Card className="bg-gray-900 border-gray-800">
                        <CardHeader>
                            <CardTitle className="flex justify-between items-center">
                                <span>Sector Performance</span>
                                <span className="text-sm text-gray-400">
                                    % price change
                                </span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {/* Add the sector performance*/}
                        </CardContent>
                    </Card>
                </div>
                <h2 className="text-2xl font-bold mb-4">Markets</h2>
                <Card className="justify-center">
                    <MarketPerformance />
                </Card>
            </div>
        </div>
    );
}
