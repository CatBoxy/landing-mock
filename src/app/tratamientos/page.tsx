import { PublicLayout } from "@/components/layout/PublicLayout";
import { ContactoSection } from "@/components/ContactoSection";
import { DropdownContainer } from "@/components/DropdownContainer";
import { treatments } from "@/lib/tratamientos";

export default function TratamientosPage() {
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
          <DropdownContainer treatments={treatments} />
        </div>
      </div>
      {/* Contacto Section */}
      <ContactoSection />
    </PublicLayout>
  );
}
