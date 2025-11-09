import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReCaptchaProvider from "@/components/ReCaptchaProvider";
import Script from "next/script";
import { GA_MEASUREMENT_ID } from "@/lib/gtag";
import Analytics from "@/components/Analytics";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	metadataBase: new URL("https://whatsapp-launcher.example.com"),
	title: {
		default: "WhatsApp Launcher",
		template: "%s | WhatsApp Launcher",
	},
	description: "Open WhatsApp chats by entering a country code and mobile number.",
	keywords: [
		"WhatsApp",
		"WhatsApp link",
		"open chat",
		"country code",
		"mobile number",
		"wa.me",
	],
	authors: [{ name: "Site Owner" }],
	creator: "Site Owner",
	alternates: {
		canonical: "/",
	},
	openGraph: {
		type: "website",
		url: "https://whatsapp-launcher.example.com/",
		title: "WhatsApp Launcher",
		description:
			"Open WhatsApp chats by entering a country code and mobile number.",
		siteName: "WhatsApp Launcher",
		images: [
			{
				url: "/og-image.png",
				width: 1200,
				height: 630,
				alt: "WhatsApp Launcher",
			},
		],
		locale: "en_US",
	},
	twitter: {
		card: "summary_large_image",
		title: "WhatsApp Launcher",
		description:
			"Open WhatsApp chats by entering a country code and mobile number.",
		images: ["/og-image.png"],
		creator: "@site_owner",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			noimageindex: false,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	icons: {
		icon: "/favicon.ico",
		shortcut: "/favicon.ico",
		apple: "/apple-touch-icon.png",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				{GA_MEASUREMENT_ID && (
					<>
						<Script
							src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
							strategy="afterInteractive"
						/>
						<Script id="gtag-init" strategy="afterInteractive">
							{`
								window.dataLayer = window.dataLayer || [];
								function gtag(){dataLayer.push(arguments);}
								gtag('js', new Date());
								gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });
							`}
						</Script>
						<Analytics />
					</>
				)}
				<ReCaptchaProvider>
					{children}
				</ReCaptchaProvider>
			</body>
		</html>
	);
}
