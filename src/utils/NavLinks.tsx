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
    name: "Fibonacci",
    href: "#",
    subNav: [
      {
        name: "About FIBO",
        href: "#",
        description: "The World's First Digital Commodity",
      },
      {
        name: "Institutional FIBO",
        href: "#",
        description: "FIBOX for Institutions",
      },
      {
        name: "Euler",
        href: "#",
        description: "One Way Ticket to Freedom",
      },
      {
        name: "Fundamental Dashboard",
        href: "#",
        description: "Custom metrics for your needs",
      },
    ],
  },
  {
    name: "Equilibrium",
    href: "#",
    subNav: [
      {
        name: "About Equilibrium",
        href: "#",
        description: "The Power of Diversification",
      },
      {
        name: "Collateral Monitoring",
        href: "#",
        description: "Real-time monitoring of collateral",
      },
      {
        name: "Community Perks",
        href: "#",
        description: "Minting $EQLB with $FIBO",
      },
      {
        name: "Equilibrium Analytics",
        href: "#",
        description: "Your Equilibrium Dashboard",
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
        description: "Tailored for banks and large businesses",
      },
      {
        name: "SMB Solutions",
        href: "#",
        description: "Solutions for small to medium businesses and professional investors",
      },
      {
        name: "Cross-Chain Payments",
        href: "#",
        description: "Invest from anywhere",
      },
      {
        name: "Real-Time Market Data",
        href: "#",
        description: "Chainlink data feeds",
      },
    ],
  },
  {
    name: "Market",
    href: "#",
    subNav: [
      {
        name: "EulerFi's Insider Market",
        href: "#",
        description: "Trade with confidence",
      },
      {
        name: "Token Listing",
        href: "#",
        description: "Tokens we offer",
      },
      {
        name: "Holders",
        href: "#",
        description: "The Holders of EulerFi",
      },
    ],
  },
  {
    name: "Resources",
    href: "#",
    subNav: [
      {
        name: "Documentation",
        href: "#",
        description: "Everything you need to know about our contracts", 
      },
      {
        name: "Whitepapers",
        href: "#",
        description: "In-depth research",
      },
      {
        name: "Blogs",
        href: "#",
        description: "Latest news and updates",
      },
    ],
  },
  {
    name: "Team",
    href: "#",
    subNav: [
      {
        name: "EulerFi Team",
        href: "#",
        description: "The people behind this masterpiece",
      },
      {
        name: "Top Investors",
        href: "#",
        description: "Backed by the best",
      },
      {
        name: "Business Partners",
        href: "#",
        description: "Collaborative partnerships",
      },
      {
        name: "DAO Governance",
        href: "#",
        description: "The Decentralized Council",
      },
    ],
  },

];
