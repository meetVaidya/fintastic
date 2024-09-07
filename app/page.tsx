'use client'

import { useState, useEffect, useRef } from 'react';
import { MacbookScroll } from "@/components/ui/macbook-scroll";
import Image from "next/image";
import HorizontalNavbar from '@/components/HorizontalNavbar';
import Dashboard from './dashboard/page';
// import DashBoard from '/app/dashboard/page';

export default function Home() {
    const [showExtraContent, setShowExtraContent] = useState(false);
    const macbookScrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (macbookScrollRef.current) {
                const { bottom } = macbookScrollRef.current.getBoundingClientRect();
                if (bottom <= window.innerHeight && !showExtraContent) {
                    setShowExtraContent(true);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [showExtraContent]);

    return (
        <>
            <HorizontalNavbar />
            <div ref={macbookScrollRef} className="mb-[0px]">
                <MacbookScroll showGradient title={'Slay your finance game. No Cap'} src='/public/image.png' />

            </div>
            <Dashboard />
        </>
    );
}
