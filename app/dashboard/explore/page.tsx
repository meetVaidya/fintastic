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
} from "@/components/ui/table"; // Shadcn UI components

interface Stock {
    symbol: string;
    price: number;
}

export default function ExplorePage() {
    const [topStocks, setTopStocks] = useState<Stock[]>([]); // To store top 10 stocks with their prices
    const [loading, setLoading] = useState<boolean>(false);

    // Mock list of top 10 stocks by market cap
    const stockSymbols = [
        "AAPL",
        "MSFT",
        "GOOG",
        "AMZN",
        "TSLA",
        "FB",
        "BRK.B",
        "NVDA",
        "V",
        "JNJ",
    ];

    const fetchStockPrices = async () => {
        setLoading(true);
        const symbols = stockSymbols.join(",");
        const options = {
            method: "GET",
            url: `https://data.alpaca.markets/v2/stocks/bars/latest?symbols=${symbols}&feed=iex`,
            headers: {
                accept: "application/json",
                "APCA-API-KEY-ID": process.env.ALPACA_API_KEY_ID,
                "APCA-API-SECRET-KEY": process.env.ALPACA_API_SECRET_KEY,
            },
        };

        try {
            const response = await axios.request(options);
            const updatedStocks: Stock[] = stockSymbols.map((symbol) => ({
                symbol: symbol,
                price: response.data.bars[symbol].c, // Getting the closing price for each stock
            }));
            setTopStocks(updatedStocks);
        } catch (error) {
            console.error("Error fetching stock prices:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStockPrices(); // Fetch stock prices on component mount

        const interval = setInterval(() => {
            fetchStockPrices(); // Fetch stock prices every 1 minute
        }, 60000);

        // Cleanup interval on component unmount
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
                                <TableCell>${stock.price.toFixed(2)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </div>
    );
}
