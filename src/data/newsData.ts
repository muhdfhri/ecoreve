import news1Img from "@/assets/news/news1.png";
import news2Img from "@/assets/news/news2.png";
import news3Img from "@/assets/news/news3.png";
import news4Img from "@/assets/news/news4.png";
import news5Img from "@/assets/news/news5.png";
import news6Img from "@/assets/news/news6.png";

export interface NewsItem {
  id: number;
  category: string;
  date: string;
  title: string;
  bgType: "image" | "accent";
  bgAccentColor?: string;
  textColor?: string;
  image?: string;
  linkText?: string;
}

export const newsItems: NewsItem[] = [
  {
    id: 1,
    category: "ARTICLE",
    date: "JUN 05",
    title: "EcoReve ZLD System: Achieving 99.5% Industrial Wastewater Recirculation in Chemical Manufacturing",
    bgType: "image",
    image: news1Img,
    linkText: "MORE",
  },
  {
    id: 2,
    category: "CASE-STUDY",
    date: "MAY 07",
    title: 'Qingdao Topolar Receives Top Rating: "Automated Demineralization Plants Cut Chemical Dosing Costs by 38%"',
    bgType: "accent",
    bgAccentColor: "#005883",
    textColor: "#ffffff",
  },
  {
    id: 3,
    category: "INNOVATION",
    date: "APR 24",
    title: "Next-Gen Ceramic Membrane MBR Assemblies: Resisting Extreme Acidic Wastewater Fouling",
    bgType: "image",
    image: news2Img,
    linkText: "EXPLORE",
  },
  {
    id: 4,
    category: "PODCAST",
    date: "APR 10",
    title: "Environmental Tech Talk - Featuring EcoReve CPO: Why Online COD Monitoring Is Crucial for Zero Discharge",
    bgType: "accent",
    bgAccentColor: "#005883",
    textColor: "#ffffff",
  },
  {
    id: 5,
    category: "PRESS RELEASE",
    date: "MAR 28",
    title: "EcoReve Awarded Global Water Tech Excellence Award at Qingdao International Environmental Expo",
    bgType: "image",
    image: news3Img,
    linkText: "READ MORE",
  },
  {
    id: 6,
    category: "BLOG",
    date: "MAR 15",
    title: "Why Precision High-Performance Butterfly Valves Are the Backbone of High-Pressure DAF Systems",
    bgType: "accent",
    bgAccentColor: "#008193",
    textColor: "#ffffff",
  },
];
