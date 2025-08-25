import React from "react";
import Image from "next/image";

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
    <div className="bg-white rounded-lg overflow-hidden">
      {/* Image at the top */}
      <div className="w-full h-[100px] relative">
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
        <h3 className="mb-0 font-hero font-bold text-lg text-black leading-tight">
          {title}
        </h3>

        {/* Subtitle */}
        <p className="font-main font-medium text-sm text-gray-700 leading-relaxed">
          {subtitle}
        </p>

        {/* Text */}
        <p className="font-main font-light text-[10px] text-gray-600 leading-[12px]">
          {text}
        </p>

        {/* Author */}
        <p className="font-main font-normal text-[8px] text-[#B0B0B0] leading-none">
          Por {author}
        </p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        className="block hover:shadow-md transition-shadow duration-200"
      >
        {CardContent}
      </a>
    );
  }

  return CardContent;
}
