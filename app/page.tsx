"use client";

import { MacbookScroll } from "@/components/ui/macbook-scroll";
import HorizontalNavbar from "@/components/HorizontalNavbar";

export default function Home() {
    return (
        <>
            <HorizontalNavbar />
            <MacbookScroll
                showGradient
                title={"Slay your finance game. No Cap"}
                src="/public/image.png"
            />
        </>
    );
}
