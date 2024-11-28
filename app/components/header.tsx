"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "../contexts/LanguageContext";

const translations = {
  es: {
    home: "Inicio",
    apartments: "Apartamentos",
    about: "Sobre Nosotros",
    contact: "Contacto",
    login: "Iniciar Sesión",
    logout: "Cerrar Sesión",
    dashboard: "Panel de Control",
  },
  en: {
    home: "Home",
    apartments: "Apartments",
    about: "About Us",
    contact: "Contact",
    login: "Login",
    logout: "Logout",
    dashboard: "Dashboard",
  },
};

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    setIsAdmin(localStorage.getItem("isAdmin") === "true");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    setIsAdmin(false);
    router.push("/");
  };

  const t = translations[language];

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          RentaFácil
        </Link>
        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Globe className="h-[1.2rem] w-[1.2rem]" />
                <span className="sr-only">Switch language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLanguage("es")}>
                Español
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("en")}>
                English
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <nav className="hidden md:block ml-4">
            <ul className="flex space-x-4">
              {[
                { label: t.home, href: "/" },
                { label: t.apartments, href: "/apartments" },
                { label: t.about, href: "/about" },
                { label: t.contact, href: "/contact" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-gray-700 hover:text-gray-900"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              {isAdmin && (
                <li>
                  <Link
                    href="/dashboard"
                    className="text-gray-700 hover:text-gray-900"
                  >
                    {t.dashboard}
                  </Link>
                </li>
              )}
            </ul>
          </nav>
          <div className="hidden md:block ml-4">
            {isAdmin ? (
              <Button onClick={handleLogout}>{t.logout}</Button>
            ) : (
              <Button onClick={() => router.push("/login")}>{t.login}</Button>
            )}
          </div>
          <button
            className="md:hidden ml-4"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <nav className="px-4 pt-2 pb-4 bg-white">
            <ul className="space-y-2">
              {[
                { label: t.home, href: "/" },
                { label: t.apartments, href: "/apartments" },
                { label: t.about, href: "/about" },
                { label: t.contact, href: "/contact" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="block text-gray-700 hover:text-gray-900"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              {isAdmin && (
                <li>
                  <Link
                    href="/dashboard"
                    className="block text-gray-700 hover:text-gray-900"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t.dashboard}
                  </Link>
                </li>
              )}
              <li>
                {isAdmin ? (
                  <Button onClick={handleLogout} className="w-full">
                    {t.logout}
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      router.push("/login");
                      setIsMenuOpen(false);
                    }}
                    className="w-full"
                  >
                    {t.login}
                  </Button>
                )}
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
