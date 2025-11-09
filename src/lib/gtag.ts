export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || "";

type GtagConfig = {
    page_path?: string;
};

// Safe window typing
declare global {
    interface Window {
        dataLayer: unknown[];
        gtag: (...args: unknown[]) => void;
    }
}

export function pageview(url: string) {
    if (!GA_MEASUREMENT_ID) return;
    if (typeof window === "undefined") return;
    window.gtag?.("config", GA_MEASUREMENT_ID, { page_path: url } as GtagConfig);
}



