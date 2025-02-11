type NavlinksType = {
  name: string;
  href: string;
  subNav?: {
    name: string;
    href: string;
    description: string;
  }[];
};

export const NavLinks: NavlinksType[] = [
  {
    name: "USDC",
    href: "#",
    subNav: [
      {
        name: "About USDC",
        href: "#",
        description: "The world's digital money",
      },
      {
        name: "USDC Overview",
        href: "#",
        description: "Learn the basics",
      },
      {
        name: "USDC Features",
        href: "#",
        description: "Key benefits and functionality",
      },
      {
        name: "USDC FAQ",
        href: "#",
        description: "Frequently asked questions",
      },
    ],
  },
  {
    name: "Platform",
    href: "#",
    subNav: [
      {
        name: "Platform Overview",
        href: "#",
        description: "Discover our platform",
      },
      {
        name: "Platform Features",
        href: "#",
        description: "Detailed feature list",
      },
      {
        name: "Platform Pricing",
        href: "#",
        description: "Cost breakdown and plans",
      },
      {
        name: "Platform Roadmap",
        href: "#",
        description: "Upcoming improvements",
      },
    ],
  },
  {
    name: "Solutions",
    href: "#",
    subNav: [
      {
        name: "Enterprise Solutions",
        href: "#",
        description: "Tailored for large businesses",
      },
      {
        name: "SMB Solutions",
        href: "#",
        description: "Solutions for small to medium businesses",
      },
      {
        name: "Financial Solutions",
        href: "#",
        description: "Custom financial products",
      },
      {
        name: "Innovative Solutions",
        href: "#",
        description: "Cutting edge technology",
      },
    ],
  },
  {
    name: "Developer",
    href: "#",
    subNav: [
      {
        name: "API Documentation",
        href: "#",
        description: "Comprehensive API guides",
      },
      {
        name: "Developer Tools",
        href: "#",
        description: "Everything you need to build",
      },
      {
        name: "SDKs & Libraries",
        href: "#",
        description: "Integrate with ease",
      },
      {
        name: "Community Support",
        href: "#",
        description: "Join our developer community",
      },
    ],
  },
  {
    name: "Resources",
    href: "#",
    subNav: [
      {
        name: "Blog",
        href: "#",
        description: "Latest news and updates",
      },
      {
        name: "Case Studies",
        href: "#",
        description: "Success stories",
      },
      {
        name: "Whitepapers",
        href: "#",
        description: "In-depth research",
      },
      {
        name: "Webinars",
        href: "#",
        description: "Upcoming educational sessions",
      },
    ],
  },
  {
    name: "Partners",
    href: "#",
    subNav: [
      {
        name: "Technology Partners",
        href: "#",
        description: "Our tech allies",
      },
      {
        name: "Business Partners",
        href: "#",
        description: "Collaborative growth",
      },
      {
        name: "Strategic Partners",
        href: "#",
        description: "Key alliances",
      },
      {
        name: "Partner Programs",
        href: "#",
        description: "Join our partner network",
      },
    ],
  },
  {
    name: "Transparency",
    href: "#",
  },
];
