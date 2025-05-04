import { CSSProperties } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  weight: string;
  image: string;
  uniqueId: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  date: string;
  userEmail?: string;
  deliveryDetails?: {
    name: string;
    phone: string;
    address: string;
    deliveryDate: string;
    comment: string;
    paymentMethod: string;
  };
}

export interface OrderItem {
  id: string;
  name: string;
  image: string;
  weight: string;
  price: number;
  quantity: number;
  uniqueId: string;
}

export interface ProductCardProps {
  id: string;
  name: string;
  price?: number;
  image: string;
  description: string;
  showPrice?: boolean;
  showWeights: boolean;
  showCart: boolean;
  category: ProductCategory;
  isBird: boolean;
  style?: CSSProperties;
}

export interface RelatedItem {
  id: number;
  name: string;
  image: string;
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  margin?: string;
  'aria-label'?: string;
  text?: string;
  backgroundColor?: string;
  color?: string;
  padding?: string;
  border?: string;
  borderColor?: string;
  width?: string;
}

export interface CatalogItem {
  name: string;
  path: string;
  image: string;
  description?: string;
}

export interface SectionConfig {
  title: string;
  products: Array<Product | Bird | Grain>;
  path: string;
  showPrice: boolean;
  showWeights: boolean;
  showCart: boolean;
  category: ProductCategory;
  isBird: boolean;
}

export type ProductCategory =
  | 'gotovye-miksy'
  | 'grains'
  | 'kormushki'
  | 'gotovye-komplekty'
  | 'otdelnye-vidy-kormov'
  | 'aksessuary-i-drugoe'
  | 'bird';

  export interface RouteParams extends Record<string, string | undefined> {
    category?: string;
    id?: string;
  }

export interface Product {
  id: number;
  name: string;
  basePrice: number;
  description: string;
  pageDescription: string[];
  image: string;
  imageBig: string;
  relatedBirds?: RelatedItem[];
  grains?: RelatedItem[];
  materials?: string[];
  recommendedBirds?: RelatedItem[];
  includes?: string[];
  targetBirds?: RelatedItem[];
  suitableFor?: RelatedItem[];
}

export interface Bird {
  id: number;
  name: string;
  description: string;
  pageDescription: string[];
  image: string;
  imageBig: string;
  relatedGrains?: RelatedItem[];
  relatedMixes?: RelatedItem[];
}

export interface Grain {
  id: number;
  name: string;
  basePrice: number;
  description: string;
  pageDescription: string[];
  image: string;
  imageBig: string;
  relatedBirds: RelatedItem[];
  relatedMixes: RelatedItem[];
}

export interface Products {
  'gotovye-miksy': Product[];
  'otdelnye-vidy-kormov': Product[];
  kormushki: Product[];
  'gotovye-komplekty': Product[];
  'aksessuary-i-drugoe': Product[];
  bird: Bird[];
  grains: Grain[];
}