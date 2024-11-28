export interface Apartment {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  type: "rent" | "sale";
}
