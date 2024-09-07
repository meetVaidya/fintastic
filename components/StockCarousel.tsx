"use client";

import { cn } from '@/lib/utils';
import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Card, CardContent } from '@/components/ui/card';

const stocks = [
    { ticker: "AAPL", boughtAt: 150.25, currentPrice: 175.50 },
    { ticker: "GOOGL", boughtAt: 2800.75, currentPrice: 2950.00 },
    { ticker: "TSLA", boughtAt: 250.00, currentPrice: 200.00 }, // Example of a stock with negative gain
];

function StockCarousel() {
    const [currentSlide, setCurrentSlide] = useState(0); // Initial slide

    return (
        <Carousel
            infiniteLoop
            showStatus={false}
            showIndicators={false}
            autoPlay
            showArrows={false}
            swipeable={true}
            selectedItem={currentSlide}
            onChange={(newSlideIndex) => setCurrentSlide(newSlideIndex)}
        >
            {stocks.map((stock, index) => (
                <Card
                    key={index}
                    className={cn(
                        'border text-white',
                        stock.currentPrice >= stock.boughtAt
                            ? 'bg-gradient-to-r from-green-500 to-green-700 border-green-600'
                            : 'bg-gradient-to-r from-red-500 to-red-700 border-red-600'
                    )}
                >
                    <CardContent className="p-6">
                        <div className="text-center mb-4">
                            <h2 className="text-xl font-bold border-white inline-block px-4 py-2">
                                {stock.ticker}
                            </h2>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-center">
                            <div>
                                <p className="text-sm mb-1">PRICE BOUGHT AT</p>
                                <p className="text-2xl font-bold">${stock.boughtAt.toFixed(2)}</p>
                            </div>
                            <div>
                                <p className="text-sm mb-1">CURRENT PRICE</p>
                                <p className="text-2xl font-bold">${stock.currentPrice.toFixed(2)}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </Carousel>
    );
}

export default StockCarousel;
