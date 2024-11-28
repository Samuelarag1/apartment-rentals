"use client";

import { ApartmentDetail } from "@/app/components/apartment-detail";
import { Footer } from "@/app/components/footer";
import { Header } from "@/app/components/header";
import { apartments } from "@/data/apartments";
import { useParams } from "next/navigation";

export default function ApartmentPage() {
  const params = useParams();
  const apartmentId = parseInt(params.id as string);
  const apartment = apartments.find((a) => a.id === apartmentId);

  if (!apartment) {
    return <div>Apartment not found</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <ApartmentDetail apartment={apartment} />
      </main>
      <Footer />
    </div>
  );
}
