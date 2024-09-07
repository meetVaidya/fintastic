"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Wallet } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'

export default function FinancialDashboard() {
    const [debtProgress, setDebtProgress] = useState(65)
    const [budgetSavings, setBudgetSavings] = useState(500)
    const [portfolioBalance, setPortfolioBalance] = useState(10000)

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28']

    const [portfolioData, setPortfolioData] = useState([
        { name: 'Stocks', value: 6000 },
        { name: 'Bonds', value: 3000 },
        { name: 'Real Estate', value: 1000 },
    ])

    const rebalancePortfolio = () => {
        setPortfolioBalance(prevBalance => prevBalance * 1.05)
        setPortfolioData(prevData => prevData.map(item => ({
            ...item,
            value: item.value * 1.05
        })))
    }

    return (
        <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 m-6">
                {/* Debt Management Card */}
                <Card className="bg-card text-card-foreground">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <PieChart className="h-4 w-4" />
                            Debt Management
                        </CardTitle>
                        <CardDescription>Track your debt repayment progress</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Progress value={debtProgress} className="w-full" />
                        <p className="mt-2 text-sm text-muted-foreground">{debtProgress}% of debt repaid</p>
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline" onClick={() => setDebtProgress(Math.min(100, debtProgress + 5))}>
                            Make Payment
                        </Button>
                    </CardFooter>
                </Card>

                {/* Budgeting Card */}
                <Card className="bg-card text-card-foreground">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Wallet className="h-4 w-4" />
                            Budgeting
                        </CardTitle>
                        <CardDescription>Monitor your monthly savings</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${budgetSavings}</div>
                        <p className="text-sm text-muted-foreground">Current monthly savings</p>
                        <div className="mt-4 flex gap-2">
                            <Badge variant="secondary">Groceries</Badge>
                            <Badge variant="secondary">Utilities</Badge>
                            <Badge variant="secondary">Entertainment</Badge>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline" onClick={() => setBudgetSavings(budgetSavings + 50)}>
                            Add to Savings
                        </Button>
                    </CardFooter>
                </Card>
            </div>
            <div className="grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-1 m-6">
                {/* Portfolio Optimization Card */}
                <Card className="bg-card text-card-foreground">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="h-4 w-4" />
                            Portfolio Optimization
                        </CardTitle>
                        <CardDescription>Analyze and balance your investments</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${portfolioBalance.toLocaleString()}</div>
                        <p className="text-sm text-muted-foreground">Total portfolio value</p>
                        <div className="mt-4 h-[200px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={portfolioData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {portfolioData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="mt-4 flex justify-center gap-2">
                            {portfolioData.map((item, index) => (
                                <Badge key={item.name} variant="secondary" style={{ backgroundColor: COLORS[index] }}>
                                    {item.name}
                                </Badge>
                            ))}
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline" onClick={rebalancePortfolio}>
                            Rebalance Portfolio
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </>
    )
}