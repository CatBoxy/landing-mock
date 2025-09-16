import Link from "next/link";

interface TratamientoCardProps {
  title: string;
  subtitle: string;
  description: string;
}

export function TratamientoCard({
  title,
  subtitle,
  description
}: TratamientoCardProps) {
  return (
    <div className="bg-tertiary-bg rounded-lg py-4 px-[22px] flex flex-col items-start gap-4">
      {/* First Section - Title Only */}
      <div className="flex-1 flex flex-col justify-left items-center">
        <div className="text-left">
          <h4
            className="font-hero font-medium text-[30px] text-white"
            style={{ lineHeight: "26px" }}
          >
            {title}
            <br />
            {subtitle}
          </h4>
        </div>
      </div>

      {/* Second Section - Description */}
      <div className="flex-1 flex items-center">
        <p
          className="font-main font-thin text-[16px] text-white text-left"
          style={{ lineHeight: "22px" }}
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>

      {/* Third Section - Button */}
      <div className="flex-1 flex justify-center items-center">
        <Link href="/tratamientos">
          <button className="w-[162px] h-[45px] bg-white rounded text-black font-main font-bold text-[14px] hover:bg-gray-100 transition-colors">
            Ver más
          </button>
        </Link>
      </div>
    </div>
  );
}
