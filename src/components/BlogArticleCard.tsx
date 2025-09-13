import React from "react";
import Image from "next/image";
import Link from "next/link";

interface BlogArticleCardProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  subtitle: string;
  text: string;
  author: string;
  href?: string;
}

export function BlogArticleCard({
  imageSrc,
  imageAlt,
  title,
  subtitle,
  text,
  author,
  href
}: BlogArticleCardProps) {
  const CardContent = (
    <div className="bg-white rounded-lg overflow-hidden md:w-[345px]">
      {/* Image at the top */}
      <div className="w-full h-[106px] md:h-[208px] md:w-[345px] relative">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover rounded-b-lg"
        />
      </div>

      {/* Content below image */}
      <div className="pt-4 pb-4 space-y-3">
        {/* Title */}
        <h3 className="mb-0 font-serif font-bold italic text-[20px] md:text-lg text-black leading-tight md:text-left">
          {title}
        </h3>

        {/* Subtitle */}
        <p className="font-main font-regular text-[16px] text-black leading-[13px] md:text-left md:text-[15px]">
          {subtitle}
        </p>

        {/* Text */}
        <p className="font-main font-thin text-[16px] text-black leading-[22px] md:text-left md:text-[15px] line-clamp-4">
          {text}
        </p>

        {/* Author */}
        <div className="md:flex hidden">
          <p className="font-main font-normal text-[8px] text-[#B0B0B0] leading-none md:text-left md:text-[12px]">
            Por {author}
          </p>
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="block hover:shadow-md transition-shadow duration-200"
      >
        {CardContent}
      </Link>
    );
  }

  return CardContent;
}
