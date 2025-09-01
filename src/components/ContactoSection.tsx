import { Mail } from "lucide-react";

export function ContactoSection() {
  return (
    <div className="bg-tertiary-bg py-8 md:pt-[211px] md:pb-[192px]">
      <div className="px-4 space-y-6 md:max-w-[710px] md:mx-auto">
        {/* Title */}
        <h3 className="font-serif font-bold text-[18px] md:text-[45px] text-white text-center">
          Contacto
        </h3>

        {/* Subtitle */}
        <div className="text-center space-y-2 md:space-y-0 md:mt-[26px]">
          <p
            className="font-main font-light text-[12px] md:text-[20px] text-white"
            style={{ lineHeight: "13px" }}
          >
            ¿Te gustaría saber qué es lo <br className="md:hidden" /> mejor para
            vos?{" "}
            <span className="font-main font-medium text-[12px] md:text-[20px] text-white md:block md:mt-[26px]">
              Escribinos
            </span>
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4 md:space-y-3">
          <div>
            <input
              type="text"
              placeholder="Nombre"
              className="w-full px-4 h-[30px] md:h-[45px] md:w-[710px] rounded-lg border !rounded-[6px] border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent placeholder-[#A4A2A2]"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 h-[30px] md:h-[45px] md:w-[710px] rounded-lg border !rounded-[6px] border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent placeholder-[#A4A2A2]"
            />
          </div>
          <div className="md:mb-6">
            <input
              type="text"
              placeholder="Localidad"
              className="w-full px-4 h-[30px] md:h-[45px] md:w-[710px] rounded-lg border !rounded-[6px] border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent placeholder-[#A4A2A2]"
            />
          </div>

          {/* Mobile Buttons - Side by side */}
          <div className="flex space-x-4 pt-4 md:hidden">
            <button
              type="submit"
              className="flex-1 bg-black text-white px-6 py-3 rounded-lg font-main font-medium flex items-center justify-center space-x-2"
            >
              <span>Enviar</span>
              <Mail className="w-4 h-4" />
            </button>
            <button
              type="button"
              className="flex-1 bg-black text-white px-6 py-3 rounded-lg font-main font-medium flex items-center justify-center space-x-2"
            >
              <span>WhatsApp</span>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
              </svg>
            </button>
          </div>

          {/* Desktop Buttons - Stacked vertically */}
          <div className="hidden md:flex md:flex-col md:items-center md:space-y-4 md:pt-4">
            {/* Enviar Button */}
            <button
              type="submit"
              className="w-[208px] h-[55px] bg-black text-white rounded-lg font-main font-medium flex items-center justify-center space-x-2"
            >
              <span>Enviar</span>
              <Mail className="w-4 h-4" />
            </button>

            {/* Alternative text */}
            <p className="font-main font-medium text-[20px] text-white">
              o comunicate por Whatsapp
            </p>

            {/* WhatsApp Button */}
            <button
              type="button"
              className="w-[208px] h-[55px] bg-black text-white rounded-lg font-main font-medium flex items-center justify-center space-x-2"
            >
              <span>WhatsApp</span>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
