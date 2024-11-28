import { Apartment } from "@/app/Models/apartments";

export const apartments: Apartment[] = [
  {
    id: 1,
    title: "Apartamento Moderno en el Centro",
    description:
      "Hermoso apartamento de 2 habitaciones con vistas panorámicas de la ciudad. Cocina totalmente equipada, sala de estar espaciosa y balcón privado. Ubicado en el corazón de la ciudad, cerca de restaurantes, tiendas y transporte público.",
    price: 1200,
    images: [
      "/modern/1.webp",
      "/modern/2.jpg",
      "/modern/3.webp",
      "/modern/4.webp",
      "/modern/5.jpg",
    ],
    type: "rent",
  },
  {
    id: 2,
    title: "Loft Espacioso con Terraza",
    description:
      "Loft de diseño con amplia terraza, perfecto para entretenimiento. Techos altos, ventanales de piso a techo y acabados de lujo. Incluye cocina gourmet, área de oficina y dormitorio en altillo.",
    price: 250000,
    images: [
      "/loft/1.webp",
      "/loft/2.webp",
      "/loft/3.jpg",
      "/loft/4.jpg",
      "/loft/5.webp",
    ],
    type: "sale",
  },
  {
    id: 3,
    title: "Apartamento Familiar en Zona Residencial",
    description:
      "Cómodo apartamento de 3 habitaciones en tranquila zona residencial.",
    price: 1800,
    images: [
      "/resi_familiar/1.jpg",
      "/resi_familiar/2.jpg",
      "/resi_familiar/3.webp",
      "/resi_familiar/4.webp",
      "/resi_familiar/5.webp",
    ],
    type: "rent",
  },
  {
    id: 4,
    title: "Estudio Céntrico Recién Renovado",
    description:
      "Acogedor estudio completamente renovado, ideal para profesionales.",
    price: 150000,
    images: [
      "/office/1.jpg",
      "/office/2.jpg",
      "/office/3.jpg",
      "/office/4.jpg",
      "/office/5.jpg",
    ],
    type: "sale",
  },
  {
    id: 5,
    title: "Apartamento Premium zona Nuñez",
    description: "Apartamento sostenible con jardín privado y paneles solares.",
    price: 300000,
    images: [
      "/premium/1.jpg",
      "/premium/2.webp",
      "/premium/3.webp",
      "/premium/4.webp",
      "/premium/5.webp",
      "/premium/6.webp",
    ],
    type: "sale",
  },
];
