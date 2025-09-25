import { PublicLayout } from "@/components/layout/PublicLayout";
import { ContactoSectionWrapper } from "@/components/ContactoSectionWrapper";
import { DropdownContainer } from "@/components/DropdownContainer";
import { treatments } from "@/lib/tratamientos";

export default function TratamientosPage() {
  return (
    <PublicLayout>
      <div className="bg-main-bg pb-12 md:hidden">
        {/* Mobile Layout */}
        <div>
          {/* Main Title */}
          <div className="flex items-center justify-left px-[20px] mb-[32px]">
            <h1 className="font-hero font-bold text-[30px] text-black text-center">
              Tratamientos
            </h1>
          </div>

          {/* Subtitle */}
          <div className="px-4 max-w-md mx-auto space-y-4 text-left px-[20px]">
            <p className="font-main text-[18px] text-left text-black leading-[24px] text-center">
              No trabajamos para cambiar cuerpos, <br />
              sino para acompañar procesos.
            </p>
            <p className="font-main text-left text-[18px] text-black leading-[24px] text-center">
              Buscamos armonía, naturalidad y <br />
              resultados sostenibles, sin <br />
              exageraciones.
            </p>
          </div>

          {/* Dropdowns Section */}
          <div className="px-4 max-w-md mx-auto mt-8">
            <DropdownContainer treatments={treatments} />
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="bg-main-bg pb-[145px] hidden md:block">
        <div>
          <div className="max-w-[1440px] mx-auto px-8 pt-16">
            {/* Title Row */}
            <div className="text-left mb-12">
              <h1 className="font-hero font-bold text-[45px] text-black">
                Tratamientos
              </h1>
            </div>

            {/* Content Row - Text and Dropdowns */}
            <div className="flex items-start justify-between">
              {/* Left Column - Text */}
              <div className="flex-1 pr-12">
                <div className="space-y-6">
                  <p className="font-main font-thin text-[25px] text-black leading-[35px]">
                    No trabajamos para cambiar cuerpos, sino para acompañar
                    procesos.
                  </p>
                  <p className="font-main font-thin text-[25px] text-black leading-[35px]">
                    Buscamos{" "}
                    <span className="font-main font-semibold text-[25px] text-black leading-[35px]">
                      armonía, naturalidad y resultados sostenibles
                    </span>
                    , sin exageraciones.
                  </p>
                </div>
              </div>

              {/* Right Column - Dropdowns */}
              <div className="flex-1 pl-12">
                <DropdownContainer treatments={treatments} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Contacto Section */}
      <ContactoSectionWrapper />
    </PublicLayout>
  );
}
