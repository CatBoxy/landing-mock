import { PublicLayout } from "@/components/layout/PublicLayout";
import Link from "next/link";
import { TratamientoCard } from "@/components/TratamientoCard";
import { BlogArticleCard } from "@/components/BlogArticleCard";
import { ContactoSection } from "@/components/ContactoSection";
import { ChevronDown } from "lucide-react";

export default function InicioPage() {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <div className="bg-[url('/hero-bg-mobile.png')] md:bg-[url('/hero-bg.png')] bg-[position:bottom_left] bg-cover md:bg-[size:110%_auto] h-[378px] md:h-[1162px] relative">
        <div className="bg-gradient-to-b from-black/50 to-neutral-300/50 h-full flex flex-col px-4">
          <div className="text-center pt-[98px] md:pt-[114px] flex-1 flex flex-col justify-between">
            <div>
              <h1
                className="text-white text-[25px] md:text-[45px] font-hero font-semibold leading-tight md:leading-tight"
                style={{ letterSpacing: "0px" }}
              >
                Cirugía Plástica y <br />
                Medicina estética
              </h1>

              {/* Desktop Subtitle */}
              <div className="hidden md:block mt-[71px] text-center">
                <p
                  className="text-white font-sans text-[25px] mx-auto max-w-4xl"
                  style={{
                    lineHeight: "35px",
                    letterSpacing: "0px"
                  }}
                >
                  <span className="font-thin">Somos más que una clínica:</span>
                  <span className="font-semibold">
                    {" "}
                    somos una cultura de cuidado.
                  </span>
                  <br />
                  <span className="font-thin">Creemos en una </span>
                  <span className="font-semibold">
                    estética ética, basada en la ciencia, el respeto y la
                    escucha real.
                  </span>
                  <br />
                  <span className="font-thin">
                    Acompañamos a cada paciente con tratamientos personalizados
                    y atención humana, para que vuelvas a habitar tu cuerpo con
                    confianza y libertad.
                  </span>
                </p>

                {/* Desktop Buttons */}
                <div className="flex flex-row space-x-5 items-center justify-center mt-[52px]">
                  <Link
                    href="/contacto"
                    className="bg-black text-white w-[223px] h-[66px] rounded-lg font-medium flex items-center justify-center space-x-2 hover:bg-gray-800 transition-colors"
                  >
                    <span>Reservá tu turno</span>
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                    </svg>
                  </Link>
                  <a
                    href="#tratamientos-section"
                    className="border border-white text-white w-[223px] h-[66px] rounded-lg font-medium flex items-center justify-center space-x-2 hover:bg-white hover:text-black transition-colors"
                  >
                    <span>Ver Tratamientos</span>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </a>
                </div>

                {/* White Divider */}
                <div className="flex justify-center mt-[54px]">
                  <div className="w-[950px] h-[1px] bg-white"></div>
                </div>

                {/* Additional Subtitles */}
                <div className="text-center mt-[98px]">
                  <h2
                    className="text-white font-sans font-normal text-[25px]"
                    style={{ letterSpacing: "7px" }}
                  >
                    HABITAR EL CUERPO
                  </h2>

                  <p
                    className="text-black font-serif font-bold italic text-[30px] mt-[29px]"
                    style={{ letterSpacing: "0px" }}
                  >
                    Tu bienestar y confianza son nuestra prioridad
                  </p>

                  {/* Down Chevron Icon */}
                  <div className="flex justify-center mt-[42px]">
                    <a
                      href="#doctor-section"
                      className="hover:opacity-80 transition-opacity cursor-pointer inline-block"
                      aria-label="Scroll to doctor section"
                    >
                      <ChevronDown className="w-[39px] h-[39px] text-white" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Buttons - Positioned over hero image */}
        <div className="md:hidden absolute bottom-[30px] left-1/2 transform -translate-x-1/2 flex flex-row items-center space-x-3">
          {/* Button 1: Black background, "Reservá tu turno" + WhatsApp icon */}
          <Link
            href="/contacto"
            className="bg-black text-white font-medium flex items-center justify-center space-x-2 hover:bg-gray-800 transition-colors"
            style={{ width: "160px", height: "30px", borderRadius: "1px" }}
          >
            <span className="text-xs">Reservá tu turno</span>
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
            </svg>
          </Link>

          {/* Button 2: Transparent background, white thin border */}
          <a
            href="#tratamientos-section"
            className="border border-white text-white font-medium flex items-center justify-center space-x-2 hover:bg-white hover:text-black transition-colors"
            style={{ width: "160px", height: "30px", borderRadius: "1px" }}
          >
            <span className="text-xs">Ver tratamientos</span>
          </a>
        </div>
      </div>

      {/* Desktop Doctor Section */}
      <div
        id="doctor-section"
        className="hidden md:flex relative -mt-[217px] z-10 flex-col items-center"
      >
        {/* First Row - Overlapping */}
        <div className="grid grid-cols-[530px_530px] gap-[21px] mb-[64px]">
          {/* Column 1: Background Image Card */}
          <div
            className="h-[560px] rounded-lg bg-cover bg-center"
            style={{
              backgroundImage: "url('/hero-bg.png')"
            }}
          ></div>

          {/* Column 2: Content Card */}
          <div
            className="h-[560px] bg-[#E9E3DC] rounded-lg flex flex-col justify-center flex justify-start"
            style={{ padding: "45px 47px" }}
          >
            {/* Title */}
            <h2
              className="font-hero font-extrabold text-[35px] text-black mb-4"
              style={{ lineHeight: "1" }}
            >
              Dr. German <br />
              Miranda Marini
            </h2>

            {/* Subtitle */}
            <h3
              className="font-sf-pro font-normal text-[20px] text-black mb-6"
              style={{ letterSpacing: "0px" }}
            >
              Director Médico de Santë
            </h3>

            {/* Text */}
            <div className="max-w-[353px]">
              <p
                className="font-sf-pro font-light text-[20px] text-black text-left"
                style={{
                  lineHeight: "30px",
                  letterSpacing: "0px"
                }}
              >
                Soy médico cirujano, especializado en cirugía plástica estética
                y reconstructiva. Me formé en la Universidad Nacional de Córdoba
                y realicé mi residencia en cirugía general y cirugía plástica en
                el Hospital Cosme Argerich, en Buenos Aires.
              </p>
            </div>

            {/* CTA Button */}
            <button className="mt-6 bg-black text-white w-[202px] h-[54px] rounded-lg font-medium flex items-center justify-center space-x-2 hover:bg-gray-800 transition-colors">
              <span>Reservá tu turno</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
              </svg>
            </button>
          </div>
        </div>

        {/* Second Row - Two Paragraphs */}
        <div className="grid grid-cols-[530px_530px] gap-[21px]">
          {/* Paragraph 1 */}
          <div className="bg-white rounded-lg">
            <p
              className="font-sf-pro font-light text-[20px] text-black text-left w-[482px]"
              style={{
                lineHeight: "30px",
                letterSpacing: "0px"
              }}
            >
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
            </p>
          </div>

          {/* Paragraph 2 */}
          <div className="bg-white rounded-lg">
            <p
              className="font-sf-pro font-light text-[20px] text-black text-left w-[482px]"
              style={{
                lineHeight: "30px",
                letterSpacing: "0px"
              }}
            >
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
          </div>
        </div>
      </div>

      {/* Desktop Tratamientos Section */}
      <div
        id="tratamientos-section"
        className="hidden md:flex items-center flex-col mt-[223px] mb-[93px] text-center"
      >
        <h2
          className="font-serif font-bold text-[45px] text-black"
          style={{ letterSpacing: "0px" }}
        >
          Tratamientos
        </h2>

        {/* Subtitle */}
        <p
          className="font-sf-pro font-thin text-[20px] text-black max-w-4xl mx-auto mt-[117px]"
          style={{
            lineHeight: "30px",
            letterSpacing: "0px"
          }}
        >
          Cada tratamiento es pensado como parte de una{" "}
          <span className="font-semibold">experiencia integral</span>, guiada{" "}
          <br />
          por{" "}
          <span className="font-semibold">
            la ciencia, la sensibilidad y el respeto
          </span>{" "}
          por la identidad de cada paciente.
        </p>

        {/* Tratamientos Card */}
        <div
          className="w-[1075px] h-[442px] bg-tertiary-bg rounded-lg mt-[105px] flex"
          style={{ padding: "35px 60px 90px" }}
        >
          {/* Cirugía Plástica Section */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="w-[44px] h-[44px] border-2 border-white rounded-full flex items-center justify-center mb-[24px]">
              <div className="w-[22px] h-[22px] bg-[#D9D9D9] rounded-full"></div>
            </div>
            <h4
              className="font-hero font-medium text-[35px] text-white text-center mb-[19px]"
              style={{ lineHeight: "38px" }}
            >
              Cirugía
              <br />
              Plástica
            </h4>
            <p
              className="font-main font-thin text-[16px] text-white text-center max-w-xs mb-4"
              style={{ lineHeight: "16px" }}
            >
              Acompañamos cada cirugía <br /> plástica con profesionalismo y{" "}
              <br /> un enfoque personalizado para <br /> lograr resultados
              naturales.
            </p>
            <Link
              href="/tratamientos"
              className="w-[157px] h-[50px] bg-white rounded text-black font-main font-semibold text-[12px] flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              Ver más
            </Link>
          </div>

          {/* Estética Médica Section */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="w-[44px] h-[44px] border-2 border-white rounded-full flex items-center justify-center mb-[24px]">
              <div className="w-[22px] h-[22px] bg-[#D9D9D9] rounded-full"></div>
            </div>
            <h4
              className="font-hero font-medium text-[35px] text-white text-center mb-[19px]"
              style={{ lineHeight: "38px" }}
            >
              Estética
              <br />
              Médica
            </h4>
            <p
              className="font-main font-thin text-[16px] text-white text-center max-w-xs mb-4"
              style={{ lineHeight: "20px" }}
            >
              La estética médica es un <br /> cuidado preciso y consciente{" "}
              <br /> que realza la belleza natural <br /> sin alterar la
              esencia.
            </p>
            <Link
              href="/tratamientos"
              className="w-[157px] h-[50px] bg-white rounded text-black font-main font-semibold text-[12px] flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              Ver más
            </Link>
          </div>

          {/* Mini Invasivos Section */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="w-[44px] h-[44px] border-2 border-white rounded-full flex items-center justify-center mb-[24px]">
              <div className="w-[22px] h-[22px] bg-[#D9D9D9] rounded-full"></div>
            </div>
            <h4
              className="font-hero font-medium text-[35px] text-white text-center mb-[19px]"
              style={{ lineHeight: "38px" }}
            >
              Mini
              <br />
              Invasivos
            </h4>
            <p
              className="font-main font-thin text-[16px] text-white text-center max-w-xs mb-4"
              style={{ lineHeight: "20px" }}
            >
              Tratamientos no invasivos, <br /> seguros y personalizados <br />{" "}
              para lograr resultados
              <br /> naturales y efectivos.
            </p>
            <Link
              href="/tratamientos"
              className="w-[157px] h-[50px] bg-white rounded text-black font-main font-semibold text-[12px] flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              Ver más
            </Link>
          </div>
        </div>
      </div>

      {/* Desktop "¿Por qué elegirnos?" Section */}
      <div
        id="por-que-elegirnos-section"
        className="hidden md:block bg-[#C8C8C8] h-[1190px]"
      >
        <div className="pt-[229px] text-center">
          <h2 className="font-serif font-bold text-[45px] text-black">
            ¿Por qué elegirnos?
          </h2>

          {/* Image */}
          <div className="mt-[86px]">
            <img
              src="/por-que-elegirnos.png"
              alt="¿Por qué elegirnos?"
              className="mx-auto"
              style={{ width: "1055px", height: "676px" }}
            />
          </div>
        </div>
      </div>

      {/* Desktop Actualidad Section */}
      <div id="actualidad-section" className="hidden md:block">
        <div className="mt-[77px] text-center">
          <h2 className="font-serif font-bold text-[45px] text-black">
            Actualidad
          </h2>

          {/* Subtitle */}
          <p
            className="font-sf-pro font-thin text-[20px] text-black max-w-4xl mx-auto mt-[46px]"
            style={{ lineHeight: "30px" }}
          >
            Entendemos que cada persona es{" "}
            <span className="font-medium">única</span>, y por eso, ofrecemos un
            enfoque
            <br /> personalizado que se adapta a{" "}
            <span className="font-medium">tus sueños y expectativas</span>.
          </p>

          {/* Blog Article Cards Grid */}
          <div className="mt-[116px] grid grid-cols-3 gap-x-[20px] max-w-[1075px] mx-auto">
            <BlogArticleCard
              imageSrc="/hero-bg.png"
              imageAlt="Nuevas Tendencias"
              title="Nuevas Tendencias"
              subtitle="Innovaciones en medicina estética"
              text="Descubre las últimas técnicas y tratamientos que están revolucionando el campo de la medicina estética."
              author="Dr. German Miranda Marini"
            />
            <BlogArticleCard
              imageSrc="/hero-bg.png"
              imageAlt="Cuidado Post-Tratamiento"
              title="Cuidado Post-Tratamiento"
              subtitle="Guía completa de recuperación"
              text="Consejos esenciales para optimizar los resultados y mantener la salud de tu piel después de cualquier procedimiento."
              author="Dr. German Miranda Marini"
            />
            <BlogArticleCard
              imageSrc="/hero-bg.png"
              imageAlt="Bienestar Integral"
              title="Bienestar Integral"
              subtitle="Salud física y mental"
              text="Cómo la medicina estética contribuye al bienestar general y la confianza personal de cada paciente."
              author="Dr. German Miranda Marini"
            />
            <BlogArticleCard
              imageSrc="/hero-bg.png"
              imageAlt="Tecnología Avanzada"
              title="Tecnología Avanzada"
              subtitle="Equipamiento de última generación"
              text="Nuestras instalaciones cuentan con la tecnología más avanzada para garantizar tratamientos seguros y efectivos."
              author="Dr. German Miranda Marini"
            />
            <BlogArticleCard
              imageSrc="/hero-bg.png"
              imageAlt="Nutrición y Belleza"
              title="Nutrición y Belleza"
              subtitle="Alimentación para la piel"
              text="La importancia de una dieta equilibrada en el mantenimiento de la salud y belleza de la piel."
              author="Dr. German Miranda Marini"
            />
            <BlogArticleCard
              imageSrc="/hero-bg.png"
              imageAlt="Envejecimiento Saludable"
              title="Envejecimiento Saludable"
              subtitle="Aceptación y cuidado"
              text="Cómo envejecer de manera saludable manteniendo la autoestima y el bienestar personal."
              author="Dr. German Miranda Marini"
            />
          </div>
        </div>
      </div>

      {/* Desktop Contacto Section */}
      <div id="contacto-section" className="hidden md:block">
        <ContactoSection />
      </div>

      {/* Mobile Only Text Section */}
      <div className="md:hidden h-[152px] bg-main-bg flex items-center justify-center px-4">
        <div className="text-center max-w-sm text-center">
          <p className="text-black font-main text-[14px] leading-[13px]">
            Somos más que una clínica: <br />
            somos una cultura de cuidado. <br />
            Creemos en una estética ética, basada en la <br />
            ciencia, el respeto y la escucha real. <br />
            Acompañamos a cada paciente con tratamientos <br />
            personalizados y atención humana, para que <br />
            vuelvas a habitar tu cuerpo con confianza <br />y libertad.
          </p>
        </div>
      </div>

      {/* Divider Line */}
      <div className="md:hidden flex justify-center">
        <div className="w-[288px] h-[1px] bg-black"></div>
      </div>

      {/* Mobile Only Section - Habitar el Cuerpo */}
      <div className="md:hidden bg-main-bg">
        {/* Title Section */}
        <div className="h-[54px] flex items-center justify-center">
          <h2
            className="text-black font-main font-regular text-lg uppercase"
            style={{ letterSpacing: "5px" }}
          >
            HABITAR EL CUERPO
          </h2>
        </div>

        {/* Subtitle Text Section */}
        <div className="flex items-center justify-center px-4">
          <p
            className="text-black font-serif font-bold italic text-[18px] text-center"
            style={{ lineHeight: "22px" }}
          >
            Tu bienestar y confianza
            <br />
            son nuestra prioridad
          </p>
        </div>

        {/* Personal Photo Container */}
        <div className="flex justify-center px-4 mt-8">
          <div
            className="h-[109px] w-full max-w-sm rounded-lg"
            style={{
              backgroundImage: "url('/personal-photo.png')",
              backgroundSize: "100%",
              backgroundPosition: "center -43px",
              backgroundRepeat: "no-repeat"
            }}
          ></div>
        </div>
        {/* Doctor Information */}
        <div className="flex justify-center px-4" style={{ marginTop: "9px" }}>
          <div className="rounded-lg bg-stone-200 px-2.5 pt-8 pb-5 text-xs w-full max-w-sm">
            <p className="font-light leading-none">
              Soy médico cirujano, especializado en cirugía plástica estética y
              reconstructiva. Me formé en la Universidad Nacional de Córdoba y
              realicé mi residencia en cirugía general y cirugía plástica en el
              Hospital Cosme Argerich, en Buenos Aires.{" "}
            </p>
            <p className="mt-6 font-extrabold leading-loose">
              Dr. German Miranda Marini{" "}
            </p>
            <p className="mt-px text-neutral-600 leading-relaxed">
              Director Médico de Santë
            </p>
          </div>
        </div>

        {/* Four Paragraphs in Two Columns */}
        <div className="flex justify-center px-4 mt-8">
          <div className="w-full max-w-sm grid grid-cols-2 gap-4">
            {/* Left Column */}
            <div className="space-y-4">
              <p
                className="font-main font-light text-[12px] text-left"
                style={{ lineHeight: "13px" }}
              >
                Desde entonces, nunca dejé de formarme. Creo en la actualización
                constante como parte esencial del compromiso médico, porque
                estoy convencido de que la excelencia se sostiene en el
                aprendizaje continuo.
              </p>
              <p
                className="font-main font-light text-[12px] text-left"
                style={{ lineHeight: "13px" }}
              >
                Hace más de 12 años decidí fundar Santë con una idea clara: que
                la medicina estética podía ser ética, cercana y profundamente
                respetuosa. Desde entonces, mi compromiso no ha sido solo con
                los resultados, sino con las personas que los buscan.
              </p>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <p
                className="font-main font-light text-[12px] text-left"
                style={{ lineHeight: "13px" }}
              >
                Creo que cada paciente merece ser escuchado antes que
                intervenido. Por eso, mi trabajo comienza mucho antes del
                procedimiento: en la mirada, en el diálogo, en la confianza. No
                creo en las fórmulas ni en los moldes. Creo en acompañar
                procesos reales, que respeten la identidad de cada quien y
                prioricen siempre el bienestar.
              </p>
              <p
                className="font-main font-light text-[12px] text-left"
                style={{ lineHeight: "13px" }}
              >
                Ejercer la medicina es, para mí, una responsabilidad y una
                vocación. Y Santë, el espacio donde esa visión se vuelve
                práctica, todos los días.
              </p>
            </div>
          </div>
        </div>

        {/* Tratamientos Title */}
        <div className="flex justify-center px-4 mt-8">
          <div className="w-[292px] h-[72px] flex items-center justify-center">
            <h3 className="font-serif font-bold text-[18px] text-center">
              Tratamientos
            </h3>
          </div>
        </div>

        {/* Subtitle with Mixed Weights */}
        <div className="flex justify-center px-4">
          <div className="w-full max-w-sm">
            <p className="text-center" style={{ lineHeight: "15px" }}>
              <span className="font-main font-thin text-[14px]">
                Cada tratamiento es pensado como <br />
                parte de una{" "}
              </span>
              <span className="font-main font-semibold text-[14px]">
                experiencia integral
              </span>
              <span className="font-main font-thin text-[14px]">
                , guiada por{" "}
              </span>
              <span className="font-main font-semibold text-[14px]">
                la <br /> ciencia, la sensibilidad y el respeto
              </span>
              <span className="font-main font-thin text-[14px]">
                {" "}
                por la <br /> identidad de cada paciente.
              </span>
            </p>
          </div>
        </div>

        {/* Tratamiento Cards */}
        <div className="flex flex-col space-y-4 px-4 mt-8">
          <TratamientoCard
            title="Cirugía"
            subtitle="Plástica"
            description="Acompañamos cada cirugía plástica con profesionalismo y un enfoque personalizado para lograr resultados naturales."
          />
          <TratamientoCard
            title="Estética"
            subtitle="Médica"
            description="La estética médica es un cuidado preciso y consciente que realza la belleza natural sin alterar la esencia."
          />
          <TratamientoCard
            title="Mini"
            subtitle="Invasivos"
            description="Tratamientos no invasivos, seguros y personalizados para lograr resultados naturales y efectivos."
          />
        </div>
      </div>

      {/* Por qué elegirnos Section */}
      <div
        className="md:hidden bg-secondary-bg pb-8 pt-10"
        style={{ marginTop: "16px" }}
      >
        <div className="flex flex-col items-center space-y-6">
          <h3 className="font-hero font-bold text-[18px] text-black text-center mb-0">
            ¿Por qué elegirnos?
          </h3>
          <div className="flex justify-center px-5 w-full max-w-sm">
            <div
              className="w-full h-64 bg-center bg-no-repeat bg-contain"
              style={{
                backgroundImage: "url('/por-que-elegirnos.png')"
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Actualidad Section */}
      <div className="md:hidden bg-white py-8">
        <div className="flex flex-col items-center space-y-6">
          <h3 className="font-hero font-bold text-[18px] text-black text-center mb-0">
            Actualidad
          </h3>
          <div className="flex justify-center px-5 w-full max-w-sm">
            <div className="text-center space-y-4">
              <p className="font-main font-light text-[12px] text-black leading-[13px]">
                Entendemos que cada persona es{" "}
                <span className="font-main font-medium text-[12px] text-black leading-[13px]">
                  única
                </span>
                , y por
                <br />
                eso, ofrecemos un enfoque personalizado que se adapta a{" "}
                <span className="font-main font-medium text-[12px] text-black leading-[13px]">
                  tus sueños y expectativas
                </span>
                .
              </p>
            </div>
          </div>

          {/* Blog Article Cards Grid */}
          <div className="grid grid-cols-2 gap-4 px-5 w-full max-w-sm mt-6">
            <BlogArticleCard
              imageSrc="/hero-bg.png"
              imageAlt="Blog article 1"
              title="Nuevas Tendencias"
              subtitle="Innovaciones en medicina estética"
              text="Descubre las últimas técnicas y tratamientos que están revolucionando el campo de la medicina estética."
              author="Dr. German Miranda Marini"
            />
            <BlogArticleCard
              imageSrc="/hero-bg.png"
              imageAlt="Blog article 2"
              title="Cuidado Post-Tratamiento"
              subtitle="Guía completa de recuperación"
              text="Consejos esenciales para optimizar los resultados y mantener la salud de tu piel después de cualquier procedimiento."
              author="Dr. German Miranda Marini"
            />
            <BlogArticleCard
              imageSrc="/hero-bg.png"
              imageAlt="Blog article 3"
              title="Bienestar Integral"
              subtitle="Salud física y mental"
              text="Cómo la medicina estética contribuye al bienestar general y la confianza personal de cada paciente."
              author="Dr. German Miranda Marini"
            />
            <BlogArticleCard
              imageSrc="/hero-bg.png"
              imageAlt="Blog article 4"
              title="Tecnología Avanzada"
              subtitle="Equipamiento de última generación"
              text="Nuestras instalaciones cuentan con la tecnología más avanzada para garantizar tratamientos seguros y efectivos."
              author="Dr. German Miranda Marini"
            />
            <BlogArticleCard
              imageSrc="/hero-bg.png"
              imageAlt="Blog article 5"
              title="Nutrición y Belleza"
              subtitle="Alimentación para la piel"
              text="La importancia de una dieta equilibrada en el mantenimiento de la salud y belleza de la piel."
              author="Dr. German Miranda Marini"
            />
            <BlogArticleCard
              imageSrc="/hero-bg.png"
              imageAlt="Blog article 6"
              title="Envejecimiento Saludable"
              subtitle="Aceptación y cuidado"
              text="Cómo envejecer de manera saludable manteniendo la autoestima y el bienestar personal."
              author="Dr. German Miranda Marini"
            />
          </div>
        </div>
      </div>

      {/* Mobile Contacto Section */}
      <div className="md:hidden">
        <ContactoSection />
      </div>
    </PublicLayout>
  );
}
