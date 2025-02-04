import type { Metadata } from "next";

const isProduction = process.env.NODE_ENV === "production";
const baseUrl = isProduction
  ? "https://driven-by-fibonacci.vercel.app/"
  : `http://localhost:${process.env.PORT || 3000}`;

const titleTemplate = "%s | Stablecoins";

export const getMetadata = ({
  title,
  description,
  imageRelativePath = "/thumbnail.png",
}: {
  title: string;
  description: string;
  imageRelativePath?: string;
}): Metadata => {
  const imageUrl = `${baseUrl}${imageRelativePath}`;

  return {
    generator: "Driven By Fibonacci",
    applicationName: "Driven By Fibonacci",
    referrer: "origin-when-cross-origin",
    keywords: [
      "stablecoins",
      "defi",
      "ethereum",
      "driven by fibonacci",
      "drivenbyfibonacci",
      "stablecoin",
      "scroll",
    ],
    creator: "Driven By Fibonacci",
    publisher: "Driven By Fibonacci",
    metadataBase: new URL(baseUrl),
    manifest: `${baseUrl}/manifest.json`,
    alternates: {
      canonical: baseUrl,
    },
    robots: {
      index: false,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: false,
        noimageindex: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    title: {
      default: title,
      template: titleTemplate,
    },
    description: description,
    openGraph: {
      title: {
        default: title,
        template: titleTemplate,
      },
      description: description,
      images: [
        {
          url: imageUrl,
          alt: "Driven By Fibonacci - Stablecoins",
        },
      ],
      type: "website",
      siteName: "Driven By Fibonacci",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image", // Ensures Twitter uses a large image for the preview
      title: {
        default: title,
        template: titleTemplate,
      },
      description: description,
      images: [
        {
          url: imageUrl,
          alt: "Driven By Fibonacci - Stablecoins",
        },
      ],
    },
    icons: {
      icon: [
        {
          url: `${baseUrl}/favicon-32x32.png`, // Standard favicon for browsers
          sizes: "32x32",
          type: "image/png",
        },
        {
          url: `${baseUrl}/favicon-16x16.png`, // Smaller favicon for some contexts
          sizes: "16x16",
          type: "image/png",
        },
        {
          url: `${baseUrl}/favicon-192x192.png`, // Icon for mobile devices and apps
          sizes: "192x192",
          type: "image/png",
        },
        {
          url: `${baseUrl}/favicon-512x512.png`, // High-resolution icon for apps/PWAs
          sizes: "512x512",
          type: "image/png",
        },
      ],
      apple: [
        {
          url: `${baseUrl}/apple-touch-icon.png`, // Apple touch icon for iOS devices
          sizes: "180x180",
          type: "image/png",
        },
      ],
      shortcut: [
        {
          url: `${baseUrl}/favicon.ico`, // ICO format for legacy browsers
          sizes: "48x48",
          type: "image/x-icon",
        },
      ],
      other: [
        {
          url: `${baseUrl}/favicon-192x192.png`, // Manifest icon for web app manifest
          sizes: "192x192",
          type: "image/png",
        },
        {
          url: `${baseUrl}/favicon-512x512.png`, // Larger manifest icon
          sizes: "512x512",
          type: "image/png",
        },
      ],
    },
  };
};
