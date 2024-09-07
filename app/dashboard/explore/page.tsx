'use client'

import { useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

// Mock data for top stocks
const topStocks = [
    { id: 1, rank: 1, name: "Apple Inc.", symbol: "AAPL", price: 180.95 },
    { id: 2, rank: 2, name: "Microsoft Corporation", symbol: "MSFT", price: 330.11 },
    { id: 3, rank: 3, name: "Saudi Aramco", symbol: "2222.SR", price: 9.35 },
    { id: 4, rank: 4, name: "Alphabet Inc.", symbol: "GOOGL", price: 134.99 },
    { id: 5, rank: 5, name: "Amazon.com Inc.", symbol: "AMZN", price: 136.45 },
    { id: 6, rank: 6, name: "NVIDIA Corporation", symbol: "NVDA", price: 447.82 },
    { id: 7, rank: 7, name: "Meta Platforms Inc.", symbol: "META", price: 311.71 },
    { id: 8, rank: 8, name: "Berkshire Hathaway Inc.", symbol: "BRK.A", price: 534500.00 },
    { id: 9, rank: 9, name: "Tesla, Inc.", symbol: "TSLA", price: 242.54 },
    { id: 10, rank: 10, name: "Eli Lilly and Company", symbol: "LLY", price: 548.44 },
]

// Mock data for stock price history and forecast
const getStockData = (symbol: string) => {
    // This would typically come from an API
    return [
        { month: 'Jan', price: 100, forecast: null },
        { month: 'Feb', price: 120, forecast: null },
        { month: 'Mar', price: 110, forecast: null },
        { month: 'Apr', price: 130, forecast: null },
        { month: 'May', price: 140, forecast: null },
        { month: 'Jun', price: 135, forecast: null },
        { month: 'Jul', price: 150, forecast: 150 },
        { month: 'Aug', price: null, forecast: 160 },
        { month: 'Sep', price: null, forecast: 170 },
    ]
}

export default function ExplorePage() {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedStock, setSelectedStock] = useState<(typeof topStocks)[0] | null>(null)

    const filteredStocks = topStocks.filter(stock =>
        stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="container mx-auto py-10 flex">
            <div className="w-[35%] pr-4">
                <h1 className="text-3xl font-bold mb-6">Explore Top Stocks</h1>
                <Input
                    type="search"
                    placeholder="Search stocks..."
                    className="mb-4"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Rank</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead className="text-right">Price</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredStocks.map((stock) => (
                            <TableRow
                                key={stock.id}
                                className="cursor-pointer hover:bg-muted"
                                onClick={() => setSelectedStock(stock)}
                            >
                                <TableCell className="font-medium">{stock.rank}</TableCell>
                                <TableCell>{stock.name}</TableCell>
                                <TableCell className="text-right">${stock.price.toFixed(2)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div className="w-[65%] pl-4">
                {selectedStock ? (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">{selectedStock.name} ({selectedStock.symbol})</h2>
                        <ResponsiveContainer width="100%" height={400}>
                            <LineChart data={getStockData(selectedStock.symbol)}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="price" stroke="#8884d8" name="Historical Price" />
                                <Line type="monotone" dataKey="forecast" stroke="#82ca9d" name="Forecast" strokeDasharray="5 5" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-xl text-muted-foreground">Select a stock to view its price history and forecast</p>
                    </div>
                )}
            </div>
        </div>
    )
}