import heroBannerImg from "@/assets/hero-banner.webp";
import bannerFooterImg from "@/assets/banner-footer.webp";
import news1Img from "@/assets/news/news1.png";
import news2Img from "@/assets/news/news2.png";
import news3Img from "@/assets/news/news3.png";
import news4Img from "@/assets/news/news4.png";

export interface Article {
  id: number;
  category: "Partnership" | "Research" | "Funding" | "Technology" | "Innovation" | string;
  date: string;
  readTime?: string;
  authorName?: string;
  authorRole?: string;
  authorAvatar?: string;
  title: string;
  slug?: string;
  image: string;
  description: string;
  content?: string;
  tableOfContents?: { id: string; title: string }[] | string;
  table_of_contents?: { id: string; title: string }[] | string;
}

// Empty array; all news data is dynamically fetched from backend MySQL database
export const newsArticles: Article[] = [];
