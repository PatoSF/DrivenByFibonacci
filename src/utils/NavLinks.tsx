import { FaBuilding, FaGem, FaGift, FaExchangeAlt, FaChartLine, FaBalanceScale } from 'react-icons/fa';
import { FaLandmark } from "react-icons/fa";
import { FaCoins } from "react-icons/fa";
import { FiBarChart2 } from "react-icons/fi";
import { MdBusinessCenter, MdMonitor, MdDescription, MdLibraryBooks, MdPeople } from 'react-icons/md';
import { RiBarChartFill, RiGovernmentFill } from "react-icons/ri";
import { HiDocumentText } from "react-icons/hi";


export type NavlinksType = {
  name: string;
  href: string;
  subNav?: SubNavType[];
};

export type SubNavType = {
  name: string;
  href: string;
  description: string;
  icon: React.JSX.Element;
};

export const NavLinks: NavlinksType[] = [
  {
    name: "Fibonacci",
    href: "#",
    subNav: [
      {
        name: "About FIBO",
        href: "/fibonacci/aboutfibo",
        description: "The World's First Digital Commodity",
        icon: <FaGem className='w-5 h-5 lg:w-8 lg:h-8' />,
      },
      {
        name: "Institutional FIBO",
        href: "/fibonacci/institutionalfibo",
        description: "FIBOX for Institutions",
        icon: <FaLandmark className='w-5 h-5 lg:w-8 lg:h-8' />,
      },
      {
        name: "Euler",
        href: "/fibonacci/euler",
        description: "One Way Ticket to Freedom",
        icon: <FaCoins className='w-5 h-5 lg:w-8 lg:h-8' />,
      },
      {
        name: "Fundamental Dashboard",
        href: "/fibonacci/fundamentaldashboard",
        description: "Custom metrics for your needs",
        icon: <FiBarChart2 className='w-5 h-5 lg:w-8 lg:h-8' />,
      },
    ],
  },
  {
    name: "Equilibrium",
    href: "#",
    subNav: [
      {
        name: "About Equilibrium",
        href: "/equilibrium/aboutequilibrium",
        description: "The Power of Diversification",
        icon: <FaBalanceScale className='w-5 h-5 lg:w-8 lg:h-8' />,
      },
      {
        name: "Collateral Monitoring",
        href: "/equilibrium/collateralmonitoring",
        description: "Real-time monitoring of collateral",
        icon: <MdMonitor className='w-5 h-5 lg:w-8 lg:h-8' />,
      },
      {
        name: "Community Perks",
        href: "/equilibrium/communityperks",
        description: "Minting $EQLB with $FIBO",
        icon: <FaGift className='w-5 h-5 lg:w-8 lg:h-8' />,
      },
      {
        name: "Equilibrium Analytics",
        href: "/equilibrium/equilibriumanalytics",
        description: "Your Equilibrium Dashboard",
        icon: <RiBarChartFill className='w-5 h-5 lg:w-8 lg:h-8' />,
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
        icon: <FaBuilding className='w-5 h-5 lg:w-8 lg:h-8' />,
      },
      {
        name: "SMB Solutions",
        href: "#",
        description: "Solutions for small to medium businesses and professional investors",
        icon: <MdBusinessCenter className='w-5 h-5 lg:w-8 lg:h-8' />,
      },
      {
        name: "Cross-Chain Payments",
        href: "#",
        description: "Invest from anywhere",
        icon: <FaExchangeAlt className='w-5 h-5 lg:w-8 lg:h-8' />,
      },
      {
        name: "Real-Time Market Data",
        href: "#",
        description: "Chainlink data feeds",
        icon: <FaChartLine className='w-5 h-5 lg:w-8 lg:h-8' />,
      },
    ],
  },
  {
    name: "Market",
    href: "#",
    subNav: [
      {
        name: "EulerFi's Insider Market",
        href: "/market/eulerfi-market",
        description: "Trade with confidence",
        icon: <MdBusinessCenter className='w-5 h-5 lg:w-8 lg:h-8' />,
      },
      {
        name: "Token Listing",
        href: "#",
        description: "Tokens we offer",
        icon: <FaCoins className='w-5 h-5 lg:w-8 lg:h-8' />,
      },
      {
        name: "Holders",
        href: "#",
        description: "The Holders of EulerFi",
        icon: <MdPeople className='w-5 h-5 lg:w-8 lg:h-8' />,
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
        icon: <HiDocumentText className='w-5 h-5 lg:w-8 lg:h-8' />,
      },
      {
        name: "Whitepapers",
        href: "#",
        description: "In-depth research",
        icon: <MdDescription className='w-5 h-5 lg:w-8 lg:h-8' />,
      },
      {
        name: "Blogs",
        href: "#",
        description: "Latest news and updates",
        icon: <MdLibraryBooks className='w-5 h-5 lg:w-8 lg:h-8' />,
      },
    ],
  },
  {
    name: "Team",
    href: "#",
    subNav: [
      {
        name: "EulerFi Team",
        href: "/team/eulerfi-team",
        description: "The people behind this masterpiece",
        icon: <MdPeople className='w-5 h-5 lg:w-8 lg:h-8' />,
      },
      {
        name: "Top Investors",
        href: "#",
        description: "Backed by the best",
        icon: <FaLandmark className='w-5 h-5 lg:w-8 lg:h-8' />,
      },
      {
        name: "Business Partners",
        href: "#",
        description: "Collaborative partnerships",
        icon: <MdBusinessCenter className='w-5 h-5 lg:w-8 lg:h-8' />,
      },
      {
        name: "DAO Governance",
        href: "#",
        description: "The Decentralized Council",
        icon: <RiGovernmentFill className='w-5 h-5 lg:w-8 lg:h-8' />,
      },
    ],
  },
];
