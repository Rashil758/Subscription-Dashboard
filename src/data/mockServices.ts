// Types
export type BillingCycle = "Monthly" | "Yearly";
export type ServiceStatus = "Active" | "Inactive";
export type Category =
  | "Streaming"
  | "Music"
  | "Software"
  | "Productivity"
  | "Cloud"
  | "Education"
  | "Health"
  | "Finance"
  | "Other";

export interface Service {
  id: string;
  name: string;
  category: Category;
  price: number;
  billingCycle: BillingCycle;
  status: ServiceStatus;
  startDate: string;
  emoji: string;
}

// Constants
export const CATEGORIES: Category[] = [
  "Streaming",
  "Music",
  "Software",
  "Productivity",
  "Cloud",
  "Education",
  "Health",
  "Finance",
  "Other",
];

export const BILLING_CYCLES: BillingCycle[] = ["Monthly", "Yearly"];

export const EMOJI_MAP: Record<Category, string> = {
  Streaming: "🎬",
  Music: "🎵",
  Software: "💻",
  Productivity: "📝",
  Cloud: "☁️",
  Education: "📚",
  Health: "💪",
  Finance: "💰",
  Other: "📦",
};

// Mock data
export const mockServices: Service[] = [
  {
    id: "1",
    name: "Netflix",
    category: "Streaming",
    price: 15.99,
    billingCycle: "Monthly",
    status: "Active",
    startDate: "2023-01-15",
    emoji: "🎬",
  },
  {
    id: "2",
    name: "Spotify",
    category: "Music",
    price: 9.99,
    billingCycle: "Monthly",
    status: "Active",
    startDate: "2022-06-01",
    emoji: "🎵",
  },
  {
    id: "3",
    name: "Adobe Creative Cloud",
    category: "Software",
    price: 54.99,
    billingCycle: "Monthly",
    status: "Active",
    startDate: "2023-03-10",
    emoji: "🎨",
  },
  {
    id: "4",
    name: "GitHub Pro",
    category: "Software",
    price: 4.0,
    billingCycle: "Monthly",
    status: "Active",
    startDate: "2023-05-20",
    emoji: "💻",
  },
  {
    id: "5",
    name: "Disney+",
    category: "Streaming",
    price: 7.99,
    billingCycle: "Monthly",
    status: "Inactive",
    startDate: "2022-12-01",
    emoji: "🏰",
  },
  {
    id: "6",
    name: "Notion",
    category: "Productivity",
    price: 8.0,
    billingCycle: "Monthly",
    status: "Active",
    startDate: "2023-08-01",
    emoji: "📝",
  },
  {
    id: "7",
    name: "AWS",
    category: "Cloud",
    price: 32.5,
    billingCycle: "Monthly",
    status: "Active",
    startDate: "2022-09-15",
    emoji: "☁️",
  },
  {
    id: "8",
    name: "Figma",
    category: "Software",
    price: 12.0,
    billingCycle: "Monthly",
    status: "Inactive",
    startDate: "2023-02-01",
    emoji: "✏️",
  },
  {
    id: "9",
    name: "Duolingo Plus",
    category: "Education",
    price: 6.99,
    billingCycle: "Monthly",
    status: "Active",
    startDate: "2024-01-10",
    emoji: "🦜",
  },
  {
    id: "10",
    name: "Gym Membership",
    category: "Health",
    price: 45.0,
    billingCycle: "Monthly",
    status: "Active",
    startDate: "2023-07-01",
    emoji: "💪",
  },
];
