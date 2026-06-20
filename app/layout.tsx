import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Curry Hub Bangkok | Authentic Indian Restaurant in Bangkok, Thailand",
  description:
    "Experience authentic Indian cuisine at Curry Hub Bangkok. Enjoy rich curries, tandoori specialties, biryani, and traditional Indian dishes. Reserve your table today at the best Indian restaurant in Bangkok.",
  keywords:
    "Indian restaurant Bangkok, best Indian food Bangkok, curry Bangkok, tandoori Bangkok, biryani Bangkok, butter chicken Bangkok, Indian cuisine Thailand, Indian restaurant Sukhumvit, authentic Indian food Bangkok, curry hub Bangkok",
  authors: [{ name: "Curry Hub Bangkok" }],
  creator: "Curry Hub Bangkok",
  publisher: "Curry Hub Bangkok",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://curryhub.co.th",
    siteName: "Curry Hub Bangkok",
    title: "Curry Hub Bangkok | Authentic Indian Restaurant",
    description:
      "Experience authentic Indian cuisine at Curry Hub Bangkok. Rich curries, tandoori specialties, and traditional recipes in the heart of Bangkok, Thailand.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Curry Hub Bangkok - Authentic Indian Restaurant",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Curry Hub Bangkok | Authentic Indian Restaurant",
    description:
      "Experience authentic Indian cuisine at Curry Hub Bangkok. Rich curries, tandoori specialties, and traditional recipes.",
    images: [
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1200&q=80",
    ],
  },
  alternates: {
    canonical: "https://curryhub.co.th",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Restaurant",
      "@id": "https://curryhub.co.th/#restaurant",
      name: "Curry Hub Bangkok",
      image:
        "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1200&q=80",
      url: "https://curryhub.co.th",
      telephone: "+66643073879",
      email: "info@curryhub.co.th",
      address: {
        "@type": "PostalAddress",
        streetAddress:
          "ally 35, 5 Mana Witthaya Alley, Khlong Ton Sai, Khlong San",
        addressLocality: "Bangkok",
        addressRegion: "Bangkok",
        postalCode: "10600",
        addressCountry: "TH",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: "13.7563",
        longitude: "100.5018",
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "11:00",
          closes: "23:00",
          name: "Dine-in",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "10:00",
          closes: "22:00",
          name: "Delivery",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "10:00",
          closes: "12:00",
          name: "Breakfast",
        },
      ],
      servesCuisine: ["Indian", "South Asian"],
      priceRange: "฿฿",
      currenciesAccepted: "THB",
      paymentAccepted: "Cash, Credit Card",
      hasMap:
        "https://maps.google.com/?q=ally+35+5+Mana+Witthaya+Alley+Khlong+San+Bangkok",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        reviewCount: "324",
      },
      menu: "https://curryhub.co.th/#menu",
      reservations: "https://curryhub.co.th/#reservations",
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://curryhub.co.th/#localbusiness",
      name: "Curry Hub Bangkok",
      description:
        "Authentic Indian restaurant in Bangkok offering traditional curries, tandoori dishes, biryani, and more.",
      url: "https://curryhub.co.th",
      telephone: "+66643073879",
      address: {
        "@type": "PostalAddress",
        streetAddress:
          "ally 35, 5 Mana Witthaya Alley, Khlong Ton Sai, Khlong San",
        addressLocality: "Bangkok",
        addressRegion: "Bangkok",
        postalCode: "10600",
        addressCountry: "TH",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Where is Curry Hub Bangkok located?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Curry Hub Bangkok is located at ally 35, 5 Mana Witthaya Alley, Khlong Ton Sai, Khlong San, Bangkok 10600, Thailand.",
          },
        },
        {
          "@type": "Question",
          name: "What are Curry Hub Bangkok opening hours?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Dine-in: Monday to Sunday 11:00 AM – 11:00 PM. Delivery: Monday to Sunday 10:00 AM – 10:00 PM. Breakfast: Monday to Sunday 10:00 AM – 12:00 PM.",
          },
        },
        {
          "@type": "Question",
          name: "Does Curry Hub Bangkok take reservations?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, we accept reservations online through our website, by phone at +66 64 307 3879, or via WhatsApp. We recommend booking in advance for dinner.",
          },
        },
        {
          "@type": "Question",
          name: "What type of Indian food does Curry Hub Bangkok serve?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We serve authentic North and South Indian cuisine including butter chicken, chicken tikka masala, biryani, tandoori dishes, paneer dishes, naan bread, and a variety of vegetarian and non-vegetarian options.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" href="/logo.png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <meta name="theme-color" content="#D97706" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-background text-white font-inter antialiased">
        {children}
      </body>
    </html>
  );
}
