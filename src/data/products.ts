import {
  BarChart3,
  Blocks,
  BriefcaseBusiness,
  Globe2,
  Mail,
  Palette,
  type LucideIcon,
} from "lucide-react";

export type Category =
  | "Social Media"
  | "Digital Marketing"
  | "Email Services"
  | "Business Tools"
  | "Website Services"
  | "Other Digital Solutions";

export type Product = {
  slug: string;
  name: string;
  category: Category;
  description: string;
  longDescription: string;
  price: number;
  oldPrice?: number;
  featured: boolean;
  latest: boolean;
  color: string;
  icon: LucideIcon;
  features: string[];
  delivery: string;
  package: string;
};

// All catalog entries are editable demo content; replace sample prices and copy before launch.
export const products: Product[] = [
  {
    slug: "social-content-starter",
    name: "Social Content Starter Kit",
    category: "Social Media",
    description: "A practical set of templates to plan a more consistent social presence.",
    longDescription: "Give your next content sprint a thoughtful head start. This editable starter kit is designed to help organize ideas, build a recognizable visual rhythm, and make planning feel a little easier.",
    price: 18,
    oldPrice: 24,
    featured: true,
    latest: true,
    color: "lilac",
    icon: Palette,
    features: ["Editable planning templates", "Reusable content prompts", "Quick-start usage guide"],
    delivery: "Digital delivery details are confirmed after you contact us.",
    package: "Starter",
  },
  {
    slug: "brand-visual-toolkit",
    name: "Brand Visual Toolkit",
    category: "Digital Marketing",
    description: "A cohesive collection of on-brand layouts for everyday campaigns.",
    longDescription: "Bring a little more consistency to your marketing materials with a versatile set of visual layouts. Adapt the colors, typography, and content to suit your own brand.",
    price: 32,
    featured: true,
    latest: false,
    color: "peach",
    icon: Palette,
    features: ["Flexible campaign layouts", "Brand style checklist", "Easy-to-edit source files"],
    delivery: "Digital delivery details are confirmed after you contact us.",
    package: "Complete kit",
  },
  {
    slug: "email-campaign-blueprints",
    name: "Email Campaign Blueprints",
    category: "Email Services",
    description: "Clear, reusable email structures for launches and updates.",
    longDescription: "Start your next email with a clear structure. These blueprints help shape a useful message from subject line through call to action, without locking you into a particular platform.",
    price: 14,
    featured: false,
    latest: true,
    color: "mint",
    icon: Mail,
    features: ["Launch and newsletter outlines", "Subject line prompt sheet", "Platform-neutral guidance"],
    delivery: "Digital delivery details are confirmed after you contact us.",
    package: "Essentials",
  },
  {
    slug: "business-workflow-pack",
    name: "Business Workflow Pack",
    category: "Business Tools",
    description: "Simple checklists and trackers to keep everyday work moving.",
    longDescription: "A small collection of practical workflow resources for solo businesses and growing teams. Set up a repeatable routine, keep projects visible, and adapt each tracker to your process.",
    price: 22,
    featured: true,
    latest: false,
    color: "blue",
    icon: BriefcaseBusiness,
    features: ["Project overview tracker", "Weekly planning checklist", "Customizable workflow boards"],
    delivery: "Digital delivery details are confirmed after you contact us.",
    package: "Business pack",
  },
  {
    slug: "website-audit-session",
    name: "Website Clarity Review",
    category: "Website Services",
    description: "A friendly review focused on clarity, structure, and usability.",
    longDescription: "Get an outside perspective on how your website communicates. This service focuses on practical observations about content clarity, navigation, and overall usability—not promises of guaranteed search results.",
    price: 45,
    featured: false,
    latest: true,
    color: "sky",
    icon: Globe2,
    features: ["Content clarity observations", "Navigation review", "Prioritized improvement notes"],
    delivery: "Scheduling and review timing are agreed with you before ordering.",
    package: "One-site review",
  },
  {
    slug: "campaign-insight-dashboard",
    name: "Campaign Insight Dashboard",
    category: "Digital Marketing",
    description: "A lightweight tracker for organizing campaign performance notes.",
    longDescription: "Keep campaign notes and key measurements in one organized place. The dashboard is intended as a planning aid and can be adapted to the metrics that matter to your business.",
    price: 26,
    featured: false,
    latest: false,
    color: "yellow",
    icon: BarChart3,
    features: ["Campaign overview sheet", "Editable measurement fields", "Reflection and next-step prompts"],
    delivery: "Digital delivery details are confirmed after you contact us.",
    package: "Single dashboard",
  },
  {
    slug: "creative-launch-checklist",
    name: "Creative Launch Checklist",
    category: "Other Digital Solutions",
    description: "A calm, step-by-step checklist for preparing a digital launch.",
    longDescription: "Keep the moving pieces of a digital launch visible with a thoughtfully grouped checklist covering preparation, publishing, and follow-up. Make it your own and use it at your pace.",
    price: 12,
    featured: false,
    latest: true,
    color: "rose",
    icon: Blocks,
    features: ["Pre-launch planning sections", "Publishing day reminders", "Post-launch review prompts"],
    delivery: "Digital delivery details are confirmed after you contact us.",
    package: "Launch checklist",
  },
  {
    slug: "social-profile-refresh",
    name: "Social Profile Refresh",
    category: "Social Media",
    description: "A guided refresh for your profile copy and visual direction.",
    longDescription: "Clarify the first impression your social profile makes with a guided review of your bio, key links, and visual direction. The final scope is confirmed together before work begins.",
    price: 38,
    featured: true,
    latest: false,
    color: "violet",
    icon: Palette,
    features: ["Profile copy feedback", "Visual consistency notes", "Actionable refresh suggestions"],
    delivery: "Scope and delivery timing are agreed with you before ordering.",
    package: "Profile review",
  },
];

export const categories: { name: Category; description: string; icon: LucideIcon }[] = [
  { name: "Social Media", description: "Thoughtful tools for your social presence.", icon: Palette },
  { name: "Digital Marketing", description: "Creative resources for your next campaign.", icon: BarChart3 },
  { name: "Email Services", description: "Make every message feel more considered.", icon: Mail },
  { name: "Business Tools", description: "Practical templates for smoother workflows.", icon: BriefcaseBusiness },
  { name: "Website Services", description: "Make your online home clearer and easier to use.", icon: Globe2 },
  { name: "Other Digital Solutions", description: "Useful little helpers for your next idea.", icon: Blocks },
];
