"use client";

import { useCallback, useMemo, useState } from "react";

export default function Home() {
    const [countryCode, setCountryCode] = useState("+91");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [message, setMessage] = useState("");
    const messageWordCount = useMemo(() => {
        const words = message.trim().split(/\s+/).filter(Boolean);
        return message.trim() ? words.length : 0;
    }, [message]);

    const combineDigits = useCallback((cc: string, num: string) => {
        const ccDigits = cc.replace(/[^\d]/g, "");
        let numDigits = num.replace(/[^\d]/g, "");
        // If phone includes the country code already, strip it once
        if (ccDigits && numDigits.startsWith(ccDigits)) {
            numDigits = numDigits.slice(ccDigits.length);
        }
        // Strip leading zeros from local number
        numDigits = numDigits.replace(/^0+/, "");
        return `${ccDigits}${numDigits}`;
    }, []);

    const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const localDigits = phoneNumber.replace(/[^\d]/g, "");
        if (localDigits.length < 10) {
            setErrorMessage("Mobile number must have at least 10 digits (spaces allowed).");
            return;
        }

        const combined = combineDigits(countryCode, phoneNumber);

        if (!/^\d{10,15}$/.test(combined)) {
            setErrorMessage("Please enter a valid number: 10–15 digits total after combining.");
            return;
        }

        if (messageWordCount > 50) {
            setErrorMessage("Message can be at most 50 words.");
            return;
        }

        // no character limit enforcement

        const encoded = message.trim() ? encodeURIComponent(message.trim()) : "";
        const waUrl = `https://api.whatsapp.com/send?phone=${combined}${encoded ? `&text=${encoded}` : ""}`;
        window.open(waUrl, "_blank", "noopener,noreferrer");
    }, [countryCode, phoneNumber, message, combineDigits]);

    const isDisabled = useMemo(() => {
        const localDigits = phoneNumber.replace(/[^\d]/g, "");
        if (localDigits.length < 10) return true;
        const combined = combineDigits(countryCode, phoneNumber);
        return !/^\d{10,15}$/.test(combined);
    }, [countryCode, phoneNumber, combineDigits]);

    return (
        <div className="relative min-h-screen p-6 flex items-center overflow-hidden bg-gradient-to-br from-[#eafff3] via-[#f7fff9] to-[#ecfff6] dark:from-[#07120c] dark:via-[#0b1a14] dark:to-[#08130e]">
            {/* decorative green blobs */}
            <div aria-hidden className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-[#25D366]/20 blur-3xl" />
            <div aria-hidden className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-[#128C7E]/20 blur-3xl" />

            <div className="relative mx-auto w-full max-w-2xl">
                <div className="flex flex-col items-center text-center mb-8">
                    <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#128C7E] to-[#25D366]">WhatsApp</span> Launcher
                    </h1>
                    <p className="text-sm sm:text-base text-black/60 dark:text-white/60 mt-2">Enter country code and mobile number. We&apos;ll open WhatsApp for you.</p>
                </div>

                <div className="w-full mx-auto max-w-xl rounded-2xl border border-[#25D366]/20 dark:border-[#128C7E]/25 bg-white/75 dark:bg-black/30 backdrop-blur px-6 sm:px-8 py-7 sm:py-8 shadow-[0_10px_30px_-10px_rgba(37,211,102,0.25)]">
                    <form onSubmit={(e) => { setErrorMessage(""); handleSubmit(e); }} className="space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-[130px_1fr] gap-3 sm:gap-4">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="cc" className="text-sm">Country code</label>
                                <input
                                    id="cc"
                                    aria-label="Country code"
                                    type="tel"
                                    inputMode="tel"
                                    className="w-full rounded-lg border border-black/10 dark:border-white/15 bg-transparent px-3 py-2 h-11 focus:outline-none focus:ring-2 focus:ring-[#25D366]/40 dark:focus:ring-[#25D366]/35"
                                    value={countryCode}
                                    onChange={(e) => { setCountryCode(e.target.value); setErrorMessage(""); }}
                                    placeholder="+91"
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="phone" className="text-sm">Mobile number</label>
                                <input
                                    id="phone"
                                    aria-label="Phone number"
                                    type="tel"
                                    inputMode="tel"
                                    className="w-full rounded-lg border border-black/10 dark:border-white/15 bg-transparent px-3 py-2 h-11 focus:outline-none focus:ring-2 focus:ring-[#25D366]/40 dark:focus:ring-[#25D366]/35"
                                    pattern="^[0-9]+$"
                                    value={phoneNumber}
                                    onChange={(e) => { setPhoneNumber(e.target.value); setErrorMessage(""); }}
                                    placeholder="9876543210"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="msg" className="text-sm">Message (optional)</label>
                            <textarea
                                id="msg"
                                aria-label="Message"
                                rows={3}
                                className="w-full rounded-lg border border-black/10 dark:border-white/15 bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#25D366]/40 dark:focus:ring-[#25D366]/35 resize-y"
                                value={message}
                                onChange={(e) => {
                                    const next = e.target.value;
                                    const words = next.trim().split(/\s+/).filter(Boolean);
                                    if (words.length <= 50) {
                                        setMessage(next);
                                    } else {
                                        setMessage(words.slice(0, 50).join(" "));
                                    }
                                }}
                                placeholder="Hi! I found you via the site…"

                            />
                            <div className="text-[11px] sm:text-xs text-black/50 dark:text-white/50 mt-1">
                                {messageWordCount}/50 words
                            </div>
                        </div>

                        {errorMessage && (
                            <div className="text-xs sm:text-sm text-red-600 dark:text-red-400">{errorMessage}</div>
                        )}

                        <button
                            type="submit"
                            className="w-full h-11 rounded-lg bg-[#25D366] text-black font-medium hover:brightness-95 transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-[0_6px_16px_-6px_rgba(37,211,102,0.65)]"
                            aria-label="Open in WhatsApp"
                            disabled={isDisabled}
                        >
                            <svg aria-hidden width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="opacity-90"><path d="M20.52 3.48A11.94 11.94 0 0 0 12 0C5.37 0 .02 5.35.02 11.96c0 2.1.55 4.16 1.6 5.97L0 24l6.23-1.62a11.96 11.96 0 0 0 5.77 1.48h.01c6.62 0 11.98-5.35 11.98-11.96 0-3.2-1.25-6.22-3.47-8.42ZM12 21.82h-.01a9.9 9.9 0 0 1-5.05-1.39l-.36-.21-3.7.96.99-3.6-.24-.37a9.9 9.9 0 0 1-1.52-5.28C2.1 6.48 6.5 2.1 12 2.1c2.64 0 5.13 1.03 7 2.9a9.8 9.8 0 0 1 2.89 6.97c0 5.5-4.48 9.85-9.88 9.85Zm5.44-7.37c-.3-.15-1.74-.86-2.01-.96-.27-.1-.47-.14-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.24-.45-2.37-1.44-.88-.77-1.48-1.72-1.66-2.01-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.06 2.88 1.2 3.08.15.2 2.1 3.2 5.08 4.49.71.3 1.27.47 1.7.6.72.23 1.38.2 1.9.12.58-.09 1.74-.71 1.99-1.39.25-.68.25-1.26.17-1.39-.07-.13-.27-.2-.57-.35Z" /></svg>
                            Open in WhatsApp
                        </button>

                        <p className="text-xs text-black/50 dark:text-white/50 text-center">We do not store your number. It opens WhatsApp via wa.me.</p>
                    </form>
                </div>
            </div>
        </div>
    );
}
