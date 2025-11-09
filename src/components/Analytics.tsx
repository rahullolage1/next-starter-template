"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { GA_MEASUREMENT_ID, pageview } from "@/lib/gtag";

export default function Analytics() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (!GA_MEASUREMENT_ID) return;
        const url = `${pathname}${searchParams?.toString() ? `?${searchParams.toString()}` : ""}`;
        pageview(url);
    }, [pathname, searchParams]);

    return null;
}



