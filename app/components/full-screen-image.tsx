"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "../contexts/LanguageContext";

interface FullScreenImageProps {
  images: string[];
  initialIndex: number;
  alt: string;
  onClose: () => void;
}

const translations = {
  es: {
    previous: "Anterior",
    next: "Siguiente",
    close: "Cerrar",
    imageOf: "Imagen {current} de {total}",
  },
  en: {
    previous: "Previous",
    next: "Next",
    close: "Close",
    imageOf: "Image {current} of {total}",
  },
};

export function FullScreenImage({
  images,
  initialIndex,
  alt,
  onClose,
}: FullScreenImageProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isLoading, setIsLoading] = useState(true);
  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      } else if (event.key === "ArrowLeft") {
        setCurrentIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : images.length - 1
        );
      } else if (event.key === "ArrowRight") {
        setCurrentIndex((prevIndex) =>
          prevIndex < images.length - 1 ? prevIndex + 1 : 0
        );
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, images.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : images.length - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < images.length - 1 ? prevIndex + 1 : 0
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
      <div className="relative w-full h-full">
        <Image
          src={images[currentIndex]}
          alt={`${alt} - ${currentIndex + 1}`}
          fill
          className="object-contain"
          onLoadingComplete={() => setIsLoading(false)}
        />
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
          </div>
        )}
      </div>
      <Button
        variant="outline"
        size="icon"
        className="absolute top-4 right-4 bg-white/10 hover:bg-white/20"
        onClick={onClose}
      >
        <X className="h-4 w-4" />
        <span className="sr-only">{t.close}</span>
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/10 hover:bg-white/20"
        onClick={goToPrevious}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">{t.previous}</span>
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/10 hover:bg-white/20"
        onClick={goToNext}
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">{t.next}</span>
      </Button>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black bg-opacity-50 px-4 py-2 rounded-full">
        {t.imageOf
          .replace("{current}", (currentIndex + 1).toString())
          .replace("{total}", images.length.toString())}
      </div>
    </div>
  );
}
