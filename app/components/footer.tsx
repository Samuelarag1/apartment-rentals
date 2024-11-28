"use client";

import { useLanguage } from "../contexts/LanguageContext";

const translations = {
  es: {
    slogan: "Tu hogar, tu estilo, tu elección.",
    quickLinks: "Enlaces Rápidos",
    contact: "Contacto",
    rights: "Todos los derechos reservados.",
    address: "Calle Falsa 123, Ciudad Imaginaria",
    phone: "Teléfono",
    email: "Correo electrónico",
  },
  en: {
    slogan: "Your home, your style, your choice.",
    quickLinks: "Quick Links",
    contact: "Contact",
    rights: "All rights reserved.",
    address: "123 Fake Street, Imaginary City",
    phone: "Phone",
    email: "Email",
  },
};

export function Footer() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">RentaFácil</h3>
            <p className="text-gray-400">{t.slogan}</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">{t.quickLinks}</h4>
            <ul className="space-y-2">
              {["Inicio", "Apartamentos", "Sobre Nosotros", "Contacto"].map(
                (item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-400 hover:text-white">
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">{t.contact}</h4>
            <p className="text-gray-400">
              {t.address}
              <br />
              {t.phone}: (123) 456-7890
              <br />
              {t.email}: info@rentafacil.com
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          © {new Date().getFullYear()} RentaFácil. {t.rights}
        </div>
      </div>
    </footer>
  );
}
