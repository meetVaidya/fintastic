"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data for investments
const mockInvestments = [
    { id: 1, name: "Tech Stock A", initialValue: 1000, currentValue: 1500 },
    { id: 2, name: "Crypto Coin B", initialValue: 500, currentValue: 300 },
    { id: 3, name: "Real Estate Fund C", initialValue: 2000, currentValue: 2200 },
    { id: 4, name: "Green Energy ETF", initialValue: 1500, currentValue: 1800 },
    { id: 5, name: "AI Startup D", initialValue: 1000, currentValue: 3000 },
]

// RPG titles and their score thresholds
const rpgTitles = [
    { title: "Novice Trader", threshold: 0 },
    { title: "Apprentice Investor", threshold: 100 },
    { title: "Market Adventurer", threshold: 250 },
    { title: "Portfolio Warrior", threshold: 500 },
    { title: "Investment Mage", threshold: 1000 },
    { title: "Legendary Tycoon", threshold: 2000 },
]

export default function InvestmentGamification() {
    const [score, setScore] = useState(0)
    const [currentTitle, setCurrentTitle] = useState("")
    const [nextTitle, setNextTitle] = useState("")
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        // Calculate score based on 10% of profit/loss
        const newScore = mockInvestments.reduce((acc, investment) => {
            const change = investment.currentValue - investment.initialValue
            return acc + change * 0.1
        }, 0)
        setScore(Math.round(newScore))

        // Determine current and next title
        const currentTitleObj = rpgTitles.reduce((prev, current) => {
            return newScore >= current.threshold ? current : prev
        })
        setCurrentTitle(currentTitleObj.title)

        const nextTitleObj = rpgTitles.find(title => title.threshold > newScore)
        if (nextTitleObj) {
            setNextTitle(nextTitleObj.title)
            const progressToNext = (newScore - currentTitleObj.threshold) / (nextTitleObj.threshold - currentTitleObj.threshold) * 100
            setProgress(Math.min(progressToNext, 100))
        } else {
            setNextTitle("Max Level Reached!")
            setProgress(100)
        }
    }, [])

    return (
        <div className="container mx-auto p-4 bg-black text-gray-100 min-h-screen">
            <Card className="mb-8 bg-black border border-gray-800">
                <CardHeader>
                    <CardTitle className="text-gray-100">Investment Gamification</CardTitle>
                    <CardDescription className="text-gray-400">Your journey as an investor</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-100">Score: {score}</h2>
                            <p className="text-gray-400">Current Title: {currentTitle}</p>
                        </div>
                        <Badge variant="secondary" className="text-lg p-2 bg-gray-900 text-purple-400 border border-purple-500">
                            Next: {nextTitle}
                        </Badge>
                    </div>
                    <Progress
                        value={progress}
                        className="w-full h-4 bg-gray-900"
                    />
                </CardContent>
            </Card>

            <Card className="bg-black border border-gray-800">
                <CardHeader>
                    <CardTitle className="text-gray-100">Your Investments</CardTitle>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-[300px]">
                        <Table>
                            <TableHeader>
                                <TableRow className="border-gray-800">
                                    <TableHead className="text-gray-300">Name</TableHead>
                                    <TableHead className="text-gray-300">Initial Value</TableHead>
                                    <TableHead className="text-gray-300">Current Value</TableHead>
                                    <TableHead className="text-gray-300">Profit/Loss</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {mockInvestments.map((investment) => {
                                    const profitLoss = investment.currentValue - investment.initialValue
                                    return (
                                        <TableRow key={investment.id} className="border-gray-800">
                                            <TableCell className="text-gray-300">{investment.name}</TableCell>
                                            <TableCell className="text-gray-300">${investment.initialValue}</TableCell>
                                            <TableCell className="text-gray-300">${investment.currentValue}</TableCell>
                                            <TableCell className={profitLoss >= 0 ? "text-green-400" : "text-red-400"}>
                                                ${profitLoss}
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
    )
}