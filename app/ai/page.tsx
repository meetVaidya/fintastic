// import ChatWindow from '@/components/ChatWindow'
// import ChatInput from '@/components/ChatInput'

// export default function Home() {
//     return (
//         <div className="container mx-auto p-4 max-w-2xl">
//             <h1 className="text-2xl font-bold mb-4">Financial Chatbot</h1>
//             <div className="bg-card rounded-lg shadow-lg p-4">
//                 <ChatWindow />
//                 <ChatInput />
//             </div>
//         </div>
//     )
// }

// components/stock-dashboard/index.tsx
// src/components/StockTracker.tsx
'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = 'your_alpaca_api_key'; // Replace with your Alpaca API key
const API_SECRET = 'your_alpaca_api_secret'; // Replace with your Alpaca API secret
const BASE_URL = 'https://paper-api.alpaca.markets'; // Change to live URL if using a live account

// Define TypeScript interfaces for the stock data
interface StockQuote {
    symbol: string;
    last: {
        price: number;
        size: number;
        timestamp: number;
    };
}

const StockTracker: React.FC = () => {
    const [stockData, setStockData] = useState<StockQuote | null>(null);
    const [symbol, setSymbol] = useState<string>('AAPL'); // Default symbol

    useEffect(() => {
        const fetchStockData = async () => {
            try {
                const response = await axios.get<StockQuote>(`${BASE_URL}/v2/stocks/${symbol}/quotes/latest`, {
                    headers: {
                        'APCA_API_KEY_ID': API_KEY,
                        'APCA_API_SECRET_KEY': API_SECRET
                    }
                });
                setStockData(response.data);
            } catch (error) {
                console.error('Error fetching stock data:', error);
            }
        };

        fetchStockData();
        // Poll the API every 30 seconds
        const interval = setInterval(fetchStockData, 30000);

        return () => clearInterval(interval);
    }, [symbol]);

    return (
        <div>
            <h1>Stock Tracker</h1>
            <input
                type="text"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                placeholder="Enter stock symbol"
            />
            {stockData ? (
                <div>
                    <h2>{stockData.symbol}</h2>
                    <p>Price: ${stockData.last.price}</p>
                    <p>Size: {stockData.last.size}</p>
                    <p>Time: {new Date(stockData.last.timestamp).toLocaleTimeString()}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};
