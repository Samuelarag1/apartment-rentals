"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Footer } from "../components/footer";
import { Header } from "../components/header";

interface Apartment {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  type: "rent" | "sale";
}

export default function Dashboard() {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [newApartment, setNewApartment] = useState<Omit<Apartment, "id">>({
    title: "",
    description: "",
    price: 0,
    image: "",
    type: "rent",
  });
  const router = useRouter();

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) {
      router.push("/login");
    }
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewApartment((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleSelectChange = (value: string) => {
    setNewApartment((prev) => ({ ...prev, type: value as "rent" | "sale" }));
  };

  const handleAddApartment = () => {
    setApartments((prev) => [...prev, { ...newApartment, id: Date.now() }]);
    setNewApartment({
      title: "",
      description: "",
      price: 0,
      image: "",
      type: "rent",
    });
  };

  const handleDeleteApartment = (id: number) => {
    setApartments((prev) => prev.filter((apartment) => apartment.id !== id));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Panel de Administración</h1>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="mb-4">Agregar Nuevo Apartamento</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Agregar Nuevo Apartamento</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Título
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={newApartment.title}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Descripción
                </Label>
                <Input
                  id="description"
                  name="description"
                  value={newApartment.description}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Precio
                </Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={newApartment.price}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="image" className="text-right">
                  Imagen URL
                </Label>
                <Input
                  id="image"
                  name="image"
                  value={newApartment.image}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Tipo
                </Label>
                <Select
                  onValueChange={handleSelectChange}
                  defaultValue={newApartment.type}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rent">Alquiler</SelectItem>
                    <SelectItem value="sale">Venta</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={handleAddApartment}>Agregar Apartamento</Button>
          </DialogContent>
        </Dialog>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Imagen</TableHead>
              <TableHead>Título</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {apartments.map((apartment) => (
              <TableRow key={apartment.id}>
                <TableCell>
                  <Image
                    src={apartment.image}
                    alt={apartment.title}
                    width={100}
                    height={100}
                    className="object-cover"
                  />
                </TableCell>
                <TableCell>{apartment.title}</TableCell>
                <TableCell>{apartment.description}</TableCell>
                <TableCell>
                  ${apartment.price}/
                  {apartment.type === "rent" ? "mes" : "total"}
                </TableCell>
                <TableCell>
                  {apartment.type === "rent" ? "Alquiler" : "Venta"}
                </TableCell>
                <TableCell>
                  <Button
                    variant="destructive"
                    onClick={() => handleDeleteApartment(apartment.id)}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
      <Footer />
    </div>
  );
}
