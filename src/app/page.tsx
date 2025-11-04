"use client";

import { useCallback, useState } from "react";

export default function Home() {
    const [countryCode, setCountryCode] = useState("+91");
    const [phoneNumber, setPhoneNumber] = useState("");

    const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const ccDigits = countryCode.replace(/[^\d]/g, "");
        const numDigits = phoneNumber.replace(/[^\d]/g, "");
        const combined = `${ccDigits}${numDigits}`;

        if (!/^\d{6,15}$/.test(combined)) {
            alert("Please enter a valid number. Include country code and 6–15 digits total.");
            return;
        }

        const waUrl = `https://wa.me/${combined}`;
        window.open(waUrl, "_blank", "noopener,noreferrer");
    }, [countryCode, phoneNumber]);

    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <div className="w-full max-w-md rounded-xl border border-black/10 dark:border-white/15 bg-white/60 dark:bg-black/30 backdrop-blur px-6 py-7 shadow-sm">
                <div className="mb-5">
                    <h1 className="text-2xl font-semibold">Open WhatsApp</h1>
                    <p className="text-sm text-black/60 dark:text-white/60 mt-1">Enter country code and mobile number</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm">Phone number</label>
                        <div className="flex items-center gap-2">
                            <input
                                aria-label="Country code"
                                type="tel"
                                inputMode="tel"
                                className="w-24 rounded-md border border-black/10 dark:border-white/15 bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20"
                                value={countryCode}
                                onChange={(e) => setCountryCode(e.target.value)}
                                placeholder="+91"
                                required
                            />
                            <input
                                aria-label="Phone number"
                                type="tel"
                                inputMode="tel"
                                className="w-full rounded-md border border-black/10 dark:border-white/15 bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                placeholder="9876543210"
                                required
                            />
                        </div>
                        <p className="text-xs text-black/50 dark:text-white/50">Country code can include &quot;+&quot;. We&apos;ll format it for WhatsApp.</p>
                    </div>

                    <button
                        type="submit"
                        className="w-full h-10 rounded-md bg-[#25D366] text-black font-medium hover:opacity-90 transition"
                        aria-label="Open in WhatsApp"
                    >
                        Open in WhatsApp
                    </button>
                </form>

                <p className="text-xs text-black/50 dark:text-white/50 mt-4">We do not store your number. It opens WhatsApp via wa.me.</p>
            </div>
        </div>
    );
}
