import type { Metadata } from "next";
import "./globals.css";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "Yash Aryan - Developer, Thinker, Explorer",
    template: "%s | Yash Aryan"
  },
  description: "Software engineer from India specializing in web development, AWS Services, Web3 development, and user experience design. Building simplified, effortless interactions.",
  keywords: [
    "Yash Aryan",
    "Software Engineer",
    "Web Developer",
    "AWS Services",
    "Web3 Development",
    "Product Management",
    "System Design",
    "API Development",
    "Cloud Computing",
    "User Experience",
    "Portfolio",
    "India"
  ],
  authors: [{ name: "Yash Aryan" }],
  creator: "Yash Aryan",
  publisher: "Yash Aryan",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://yasharyan.dev"), 
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yasharyan.dev", 
    title: "Yash Aryan - Developer, Thinker, Explorer",
    description: "Software engineer from India specializing in web development, AWS Services, Web3 development, and user experience design.",
    siteName: "Yash Aryan Portfolio",
    images: [
      {
        url: "/og-image.jpg", // You'll need to create this image
        width: 1200,
        height: 630,
        alt: "Yash Aryan - Software Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yash Aryan - Developer, Thinker, Explorer",
    description: "Software engineer from India specializing in web development, AWS Services, Web3 development, and user experience design.",
    images: ["/og-image.jpg"], // You'll need to create this image
    creator: "@canaryGrapher", // Replace with your actual Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // Replace with your actual verification code
    // yandex: "your-yandex-verification-code",
    // yahoo: "your-yahoo-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="color-scheme" content="dark" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="application-name" content="Yash Aryan Portfolio" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Yash Aryan" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-tap-highlight" content="no" />
      </head>
      <body
        className="font-sans antialiased scrollbar-hide"
        suppressHydrationWarning={true}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
