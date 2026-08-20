export interface Product {
  id?: string | number;
  img: string;
  name: string;
  price: number;
  wasPrice: number;
  tags: string[];
  category: string;
  description?: string;
}

export interface ProductCategory {
  category: string;
  items: string[];
}

export interface WaterTreatmentCategory {
  img: string;
  tags: string[];
  title: string;
  desc: string;
}
