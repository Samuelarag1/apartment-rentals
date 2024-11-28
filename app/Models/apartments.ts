export interface Apartment {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
  type: "rent" | "sale";
}
