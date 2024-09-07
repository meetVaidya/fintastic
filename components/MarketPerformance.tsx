"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"


// Mock data for stocks
const stocksBySector = {
    Technology: [
        { symbol: "AAPL", name: "Apple Inc.", price: 150.25 },
        { symbol: "MSFT", name: "Microsoft Corporation", price: 305.50 },
        { symbol: "GOOGL", name: "Alphabet Inc.", price: 2750.00 },
    ],
    Finance: [
        { symbol: "JPM", name: "JPMorgan Chase & Co.", price: 150.75 },
        { symbol: "BAC", name: "Bank of America Corp", price: 38.50 },
        { symbol: "WFC", name: "Wells Fargo & Company", price: 46.25 },
    ],
    Healthcare: [
        { symbol: "JNJ", name: "Johnson & Johnson", price: 170.50 },
        { symbol: "UNH", name: "UnitedHealth Group Inc", price: 450.75 },
        { symbol: "PFE", name: "Pfizer Inc.", price: 42.25 },
    ],
}

// Mock data for chart
const chartData = [
    { name: 'Jan', AAPL: 4000, MSFT: 2400, GOOGL: 2400 },
    { name: 'Feb', AAPL: 3000, MSFT: 1398, GOOGL: 2210 },
    { name: 'Mar', AAPL: 2000, MSFT: 9800, GOOGL: 2290 },
    { name: 'Apr', AAPL: 2780, MSFT: 3908, GOOGL: 2000 },
    { name: 'May', AAPL: 1890, MSFT: 4800, GOOGL: 2181 },
    { name: 'Jun', AAPL: 2390, MSFT: 3800, GOOGL: 2500 },
    { name: 'Jul', AAPL: 3490, MSFT: 4300, GOOGL: 2100 },
]

export default function Component() {
    const [selectedStock, setSelectedStock] = useState("AAPL")

    return (
        <Card className="w-full bg-white dark:bg-gray-800 shadow-md rounded-md p-4 text-gray-900 dark:text-white border dark:border-gray-700">
            <CardHeader>
                <CardTitle>Stock Dashboard</CardTitle>
            </CardHeader>
            <CardContent className="flex">
                <div className="w-[40%] pr-4 border-r">
                    <Tabs defaultValue="Technology" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="Technology">Tech</TabsTrigger>
                            <TabsTrigger value="Finance">Finance</TabsTrigger>
                            <TabsTrigger value="Healthcare">Healthcare</TabsTrigger>
                        </TabsList>
                        {Object.entries(stocksBySector).map(([sector, stocks]) => (
                            <TabsContent key={sector} value={sector}>
                                <Table className="w-full text-sm">
                                    <TableHead>
                                        <TableRow>
                                            <TableHead className="text-left">Symbol</TableHead>
                                            <TableHead className="text-left">Price</TableHead>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {stocks.map((stock) => (
                                            <TableRow
                                                key={stock.symbol}
                                                className={`cursor-pointer ${selectedStock === stock.symbol ? 'bg-primary/10' : ''}`}
                                                onClick={() => setSelectedStock(stock.symbol)}
                                            >
                                                <TableCell className="py-2">{stock.symbol}</TableCell>
                                                <TableCell className="py-2">${stock.price.toFixed(2)}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TabsContent>
                        ))}
                    </Tabs>
                </div>
                <div className="w-[60%] pl-4">
                    <h3 className="text-lg font-semibold mb-4">Stock Performance</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey={selectedStock} stroke="#8884d8" activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}