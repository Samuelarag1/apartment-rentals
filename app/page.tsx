"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useLanguage } from "./contexts/LanguageContext";
import { apartments } from "../data/apartments";
import { Header } from "./components/header";
import { ApartmentCard } from "./components/apartment-card";
import { Footer } from "./components/footer";

const translations = {
  es: {
    heroTitle: "Encuentra Tu Hogar Ideal",
    heroSubtitle: "Descubre los mejores apartamentos en alquiler y venta",
    searchPlaceholder: "Buscar por ubicación...",
    searchButton: "Buscar",
    featuredApartments: "Apartamentos Destacados",
    whyChooseUs: "¿Por qué elegir RentaFácil?",
    features: [
      {
        title: "Amplia Selección",
        description:
          "Miles de propiedades para elegir en las mejores ubicaciones.",
      },
      {
        title: "Proceso Sencillo",
        description:
          "Búsqueda, selección y alquiler simplificados para tu comodidad.",
      },
      {
        title: "Soporte 24/7",
        description: "Estamos aquí para ayudarte en cada paso del camino.",
      },
    ],
  },
  en: {
    heroTitle: "Find Your Ideal Home",
    heroSubtitle: "Discover the best apartments for rent and sale",
    searchPlaceholder: "Search by location...",
    searchButton: "Search",
    featuredApartments: "Featured Apartments",
    whyChooseUs: "Why Choose RentaFácil?",
    features: [
      {
        title: "Wide Selection",
        description:
          "Thousands of properties to choose from in the best locations.",
      },
      {
        title: "Simple Process",
        description:
          "Simplified search, selection, and rental process for your convenience.",
      },
      {
        title: "24/7 Support",
        description: "We're here to help you every step of the way.",
      },
    ],
  },
};

export default function Home() {
  const { language } = useLanguage();
  const t = translations[language];
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredApartments, setFilteredApartments] = useState(apartments);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const filtered = apartments.filter(
      (apartment) =>
        apartment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apartment.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredApartments(filtered);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <section
          className="relative h-[60vh] bg-cover bg-center flex items-center justify-center"
          style={{
            backgroundImage: "url('/background.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {t.heroTitle}
            </h1>
            <p className="text-xl md:text-2xl mb-8">{t.heroSubtitle}</p>
            <form
              onSubmit={handleSearch}
              className="flex justify-center max-w-md mx-auto"
            >
              <Input
                type="text"
                placeholder={t.searchPlaceholder}
                className="rounded-r-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button type="submit" className="rounded-l-none">
                <Search className="mr-2 h-4 w-4" /> {t.searchButton}
              </Button>
            </form>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            {t.featuredApartments}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredApartments.map((apartment) => (
              <ApartmentCard key={apartment.id} apartment={apartment} />
            ))}
          </div>
        </section>

        <section className="bg-gray-100 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">
              {t.whyChooseUs}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {t.features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md text-center"
                >
                  <h3 className="text-xl font-semibold mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
