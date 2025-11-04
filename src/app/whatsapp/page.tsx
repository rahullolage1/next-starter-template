"use client";

import { useCallback, useState } from "react";

export default function WhatsappPage() {
  const [phoneInput, setPhoneInput] = useState("");

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const digitsOnly = phoneInput.replace(/[^\d+]/g, "");
      const normalized = digitsOnly.startsWith("+")
        ? digitsOnly.slice(1)
        : digitsOnly;

      if (!/^\d{6,15}$/.test(normalized)) {
        alert(
          "Please enter a valid international phone number (include country code)."
        );
        return;
      }

      const waUrl = `https://wa.me/${normalized}`;
      window.open(waUrl, "_blank", "noopener,noreferrer");
    },
    [phoneInput]
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6">Open WhatsApp</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="phone" className="text-sm">
              Phone number (with country code)
            </label>
            <input
              id="phone"
              type="tel"
              inputMode="tel"
              placeholder="e.g. +14155552671"
              className="w-full rounded-md border border-black/10 dark:border-white/15 bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20"
              value={phoneInput}
              onChange={(e) => setPhoneInput(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full h-10 rounded-md bg-black text-white dark:bg-white dark:text-black hover:opacity-90 transition"
          >
            Open in WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
}


