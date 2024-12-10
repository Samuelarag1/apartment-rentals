export interface Apartment {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
  type: "rent" | "sale";
  source: string;
  location: string;
  details: string;
  link: string;
}
