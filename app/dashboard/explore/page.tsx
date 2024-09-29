"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface Stock {
    symbol: string;
    price: number | null; // Allow for null price in case of errors
}

export default function ExplorePage() {
    const [topStocks, setTopStocks] = useState<Stock[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const stockSymbols = [
        "AAPL",
        "MSFT",
        "GOOG",
        "AMZN",
        "TSLA",
        "META", // FB is now META
        "BRK.B",
        "NVDA",
        "V",
        "JNJ",
    ];

    const fetchStockPrice = async (symbol: string) => {
        try {
            const response = await axios.get(
                "https://data.alpaca.markets/v2/stocks/bars/latest",
                {
                    headers: {
                        // accept: "application/json",
                        "APCA-API-KEY-ID": process.env.ALPACA_API_KEY_ID,
                        "APCA-API-SECRET-KEY":
                            process.env.ALPACA_API_SECRET_KEY,
                    },
                    params: {
                        symbols: symbol,
                        feed: "iex",
                    },
                }
            );
            const stockData = response.data.bars[symbol];
            return { symbol, price: stockData ? stockData.c : null };
        } catch (error) {
            console.error(`Error fetching price for ${symbol}:`, error);
            return { symbol, price: null }; // Return null price on error
        }
    };

    const fetchStockPrices = async () => {
        setLoading(true);

        try {
            const updatedStocks = await Promise.all(
                stockSymbols.map(fetchStockPrice)
            ); // Fetch prices concurrently
            setTopStocks(updatedStocks);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStockPrices();

        const interval = setInterval(() => {
            fetchStockPrices();
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">
                Top 10 Stocks by Market Cap
            </h1>

            {loading ? (
                <p>Loading stock prices...</p>
            ) : (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Stock Symbol</TableHead>
                            <TableHead>Price (USD)</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {topStocks.map((stock) => (
                            <TableRow key={stock.symbol}>
                                <TableCell>{stock.symbol}</TableCell>
                                <TableCell>
                                    {stock.price === null
                                        ? "N/A"
                                        : `$${stock.price.toFixed(2)}`}{" "}
                                    {/* Handle null price */}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </div>
    );
}
