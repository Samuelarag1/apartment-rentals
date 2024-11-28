"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ImageCarousel } from "./image-carousel";
import { Apartment } from "../Models/apartments";
import { useLanguage } from "../contexts/LanguageContext";

interface ApartmentCardProps {
  apartment: Apartment;
}

const translations = {
  es: {
    rent: "Alquilar",
    buy: "Comprar",
    month: "/mes",
    viewDetails: "Ver Detalles",
  },
  en: {
    rent: "Rent",
    buy: "Buy",
    month: "/month",
    viewDetails: "View Details",
  },
};

export function ApartmentCard({ apartment }: ApartmentCardProps) {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <ImageCarousel images={apartment.images} alt={apartment.title} />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{apartment.title}</h3>
        <p className="text-gray-600 mb-4">
          {apartment.description.substring(0, 100)}...
        </p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-gray-800">
            ${apartment.price.toLocaleString()}
            {apartment.type === "rent" ? t.month : ""}
          </span>
          <Link href={`/apartment/${apartment.id}`}>
            <Button>{t.viewDetails}</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
