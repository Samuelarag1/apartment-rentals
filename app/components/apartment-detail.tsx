"use client";

import { useState } from "react";
import Image from "next/image";
import { useLanguage } from "../contexts/LanguageContext";
import { Apartment } from "../Models/apartments";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FullScreenImage } from "./full-screen-image";

interface ApartmentDetailProps {
  apartment: Apartment;
}

const translations = {
  es: {
    rent: "Alquilar",
    buy: "Comprar",
    month: "/mes",
    description: "Descripción",
    features: "Características",
    location: "Ubicación",
    contactAgent: "Contactar Agente",
    viewFullScreen: "Ver pantalla completa",
  },
  en: {
    rent: "Rent",
    buy: "Buy",
    month: "/month",
    description: "Description",
    features: "Features",
    location: "Location",
    contactAgent: "Contact Agent",
    viewFullScreen: "View full screen",
  },
};

export function ApartmentDetail({ apartment }: ApartmentDetailProps) {
  const { language } = useLanguage();
  const t = translations[language];
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="text-3xl">{apartment.title}</CardTitle>
          <CardDescription>
            <span className="text-2xl font-bold text-primary">
              ${apartment.price.toLocaleString()}
              {apartment.type === "rent" ? t.month : ""}
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="relative aspect-video overflow-hidden rounded-lg">
                <Image
                  src={apartment.images[mainImageIndex]}
                  alt={apartment.title}
                  fill
                  className="object-cover"
                />
                <Button
                  variant="secondary"
                  className="absolute bottom-2 right-2"
                  onClick={() => setIsFullScreen(true)}
                >
                  {t.viewFullScreen}
                </Button>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {apartment.images.map((img, index) => (
                  <div
                    key={index}
                    className="relative aspect-video cursor-pointer overflow-hidden rounded-md"
                    onClick={() => setMainImageIndex(index)}
                  >
                    <Image
                      src={img}
                      alt={`${apartment.title} - Image ${index + 1}`}
                      fill
                      className="object-cover transition-all hover:scale-110"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">{t.description}</h3>
                <p>{apartment.description}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{t.features}</h3>
                <ul className="list-disc list-inside">
                  <li>Feature 1</li>
                  <li>Feature 2</li>
                  <li>Feature 3</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{t.location}</h3>
                <p>123 Example Street, City, Country</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button size="lg">
            {apartment.type === "rent" ? t.rent : t.buy}
          </Button>
          <Button variant="outline" size="lg">
            {t.contactAgent}
          </Button>
        </CardFooter>
      </Card>
      {isFullScreen && (
        <FullScreenImage
          images={apartment.images}
          initialIndex={mainImageIndex}
          alt={apartment.title}
          onClose={() => setIsFullScreen(false)}
        />
      )}
    </div>
  );
}
