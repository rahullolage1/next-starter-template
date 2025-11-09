"use client";

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

export default function ReCaptchaProvider({ children }: { children: React.ReactNode }) {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string | undefined;
    // If no site key configured, just render children (form will handle disabling submit)
    if (!siteKey) return <>{children}</>;

    return (
        <GoogleReCaptchaProvider
            reCaptchaKey={siteKey}
            scriptProps={{ async: true, defer: true }}
        >
            {children}
        </GoogleReCaptchaProvider>
    );
}




