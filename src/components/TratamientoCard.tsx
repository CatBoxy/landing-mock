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
    <div className="bg-tertiary-bg rounded-lg py-4 px-[22px] flex items-center gap-4">
      {/* First Section - Icon and Title */}
      <div className="flex-1 flex flex-col justify-center space-y-2">
        <div className="w-3 h-3 border-2 border-white rounded-full flex items-center justify-center ml-6">
          <div className="w-1.5 h-1.5 bg-[#D9D9D9] rounded-full"></div>
        </div>
        <div className="text-left">
          <h4
            className="font-hero font-medium text-[18px] text-white"
            style={{ lineHeight: "18px" }}
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
          className="font-main font-thin text-[10px] text-white text-left"
          style={{ lineHeight: "11px" }}
        >
          {description}
        </p>
      </div>

      {/* Third Section - Button */}
      <div className="flex-1 flex justify-end items-center">
        <button className="w-16 h-[43px] bg-white rounded text-black font-main font-semibold text-[10px]">
          Ver más
        </button>
      </div>
    </div>
  );
}
