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
    powered: "Patrocinado por",
  },
  en: {
    rent: "Rent",
    buy: "Buy",
    month: "/month",
    viewDetails: "View Details",
    powered: "Powered by",
  },
};

export function ApartmentCard({ apartment }: ApartmentCardProps) {
  const { language } = useLanguage();
  const t = translations[language];

  function formatNumber(value: number) {
    if (value >= 1000) {
      return value.toLocaleString("es-AR");
    }
    return value;
  }
  console.log(apartment.link);
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div>
        <p
          className={
            apartment.source === "Argenprop"
              ? "bg-[#7FAA2F] text-white text-center"
              : "bg-[#FF5500] text-white text-center"
          }
        >
          {t.powered} <span className="font-bold">{apartment.source}</span>
        </p>
        <ImageCarousel images={apartment.images} alt={apartment.title} />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{apartment.title}</h3>
        <p className="text-gray-600 mb-4">
          {apartment?.details?.substring(0, 100)}...
        </p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-gray-800">
            ${formatNumber(apartment.price)}
            {apartment?.type === "rent" ? t.month : ""}
          </span>
          <a href={apartment?.link} target="__blank">
            <Button>{t.viewDetails}</Button>
          </a>
        </div>
      </div>
    </div>
  );
}
