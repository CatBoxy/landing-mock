import { PublicLayout } from "@/components/layout/PublicLayout";
import { ContactoSection } from "@/components/ContactoSection";
import { DropdownContainer } from "@/components/DropdownContainer";

export default function TratamientosPage() {
  const dropdownItems = [
    {
      id: "cirugia",
      title: "Cirugía Plástica",
      content:
        "Ofrecemos procedimientos quirúrgicos de alta calidad para el rostro y cuerpo, incluyendo rinoplastia, blefaroplastia, lifting facial, liposucción y cirugía mamaria. Cada procedimiento es personalizado y realizado con técnicas avanzadas para lograr resultados naturales y duraderos."
    },
    {
      id: "estetica",
      title: "Medicina Estética",
      content:
        "Nuestros tratamientos no quirúrgicos incluyen toxina botulínica, rellenos dérmicos, hilos tensores, peelings químicos y tratamientos con láser. Utilizamos tecnología de vanguardia para rejuvenecimiento facial y corporal sin tiempo de recuperación."
    },
    {
      id: "minimamente",
      title: "Procedimientos Mínimamente Invasivos",
      content:
        "Tratamientos que ofrecen resultados visibles con mínima invasión: radiofrecuencia, ultrasonido focalizado, microneedling y tratamientos con plasma rico en plaquetas. Ideales para quienes buscan mejoras sin cirugía."
    }
  ];

  return (
    <PublicLayout>
      <div className="bg-main-bg pb-12">
        {/* Main Title */}
        <div className="flex items-center justify-center h-16">
          <h1 className="font-hero font-bold text-[18px] text-black text-center">
            Tratamientos
          </h1>
        </div>

        {/* Subtitle */}
        <div className="px-4 max-w-md mx-auto space-y-4">
          <p className="font-main font-thin text-[12px] text-black leading-[13px] text-center">
            No trabajamos para cambiar cuerpos, sino para acompañar procesos.
          </p>
          <p className="font-main font-thin text-[12px] text-black leading-[13px] text-center">
            Buscamos{" "}
            <span className="font-main font-semibold text-[12px] text-black leading-[13px]">
              armonía, naturalidad y resultados sostenibles
            </span>
            , sin exageraciones.
          </p>
        </div>

        {/* Dropdowns Section */}
        <div className="px-4 max-w-md mx-auto mt-8">
          <DropdownContainer items={dropdownItems} />
        </div>
      </div>
      {/* Contacto Section */}
      <ContactoSection />
    </PublicLayout>
  );
}
