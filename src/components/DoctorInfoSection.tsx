"use client";

import { useState } from "react";

export function DoctorInfoSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex justify-center px-4" style={{ marginTop: "21px" }}>
      <div className="rounded-lg bg-[#E9E3DC] px-[20px] pt-[24px] pb-5 text-xs w-full max-w-sm">
        <p className="font-light leading-none text-[18px] text-left !leading-[24px]">
          Soy médico cirujano, especializado <br />
          en cirugía plástica estética y <br />
          reconstructiva. Me formé en la <br />
          Universidad Nacional de Córdoba y <br />
          realicé mi residencia en cirugía <br />
          general y cirugía plástica en el <br />
          Hospital Cosme Argerich, en <br />
          Buenos Aires.{" "}
        </p>

        {!isExpanded && (
          <>
            <div>
              <button
                onClick={toggleExpanded}
                className="mt-[14px] font-regular text-[18px] text-left hover:opacity-70 transition-opacity"
              >
                Ver más
              </button>
              <div className="w-[62px] h-[1px] bg-black"></div>
            </div>
            <p className="mt-[24px] font-serif font-extrabold text-[18px]">
              Dr. German Miranda Marini{" "}
            </p>
            <p className="mt-px text-neutral-600 text-[18px]">
              Director Médico de Santë
            </p>
          </>
        )}

        {/* Four Paragraphs - Only shown when expanded */}
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            isExpanded
              ? "max-h-[1000px] opacity-100 mt-[14px]"
              : "max-h-0 opacity-0 mt-0"
          }`}
        >
          <div className="transform transition-transform duration-500 ease-in-out">
            <p className="font-light leading-none text-[18px] text-left">
              Desde entonces, nunca dejé de formarme. Creo en la actualización
              constante como parte esencial del compromiso médico, porque estoy
              convencido de que la excelencia se sostiene en el aprendizaje
              continuo.
              <br />
              <br />
              Hace más de 12 años decidí fundar Santë con una idea clara: que la
              medicina estética podía ser ética, cercana y profundamente
              respetuosa. Desde entonces, mi compromiso no ha sido solo con los
              resultados, sino con las personas que los buscan.
              <br />
              <br />
              Creo que cada paciente merece ser escuchado antes que intervenido.
              Por eso, mi trabajo comienza mucho antes del procedimiento: en la
              mirada, en el diálogo, en la confianza. No creo en las fórmulas ni
              en los moldes. Creo en acompañar procesos reales, que respeten la
              identidad de cada quien y prioricen siempre el bienestar.
              <br />
              <br />
              Ejercer la medicina es, para mí, una responsabilidad y una
              vocación. Y Santë, el espacio donde esa visión se vuelve práctica,
              todos los días.
            </p>
            <div>
              <button
                onClick={toggleExpanded}
                className="mt-[14px] font-regular text-[18px] text-left hover:opacity-70 transition-opacity"
              >
                Ver menos
              </button>
              <div className="w-[82px] h-[1px] bg-black"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
