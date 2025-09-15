import { PublicLayout } from "@/components/layout/PublicLayout";
import {
  getNoteById,
  getAllNotesWithImages,
  processImageUrl
} from "@/app/services/server/get";
import { ContactoSectionWrapper } from "@/components/ContactoSectionWrapper";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";

interface BlogArticlePageProps {
  params: {
    id: string;
  };
}

export default async function BlogArticlePage({
  params
}: BlogArticlePageProps) {
  // Fetch the specific article
  const { id } = await params;
  const note = await getNoteById(id);

  if (!note) {
    notFound();
  }

  // Fetch related articles for sidebar (excluding current article)
  const allNotes = await getAllNotesWithImages(10);
  const relatedNotes = allNotes.filter((n) => n.id !== note.id).slice(0, 6);

  // Process the main article image
  const articleImageSrc =
    note.imageUrl || note.imageFilename
      ? processImageUrl(note.imageUrl || note.imageFilename!)
      : "/hero-bg.png";

  return (
    <PublicLayout>
      <div
        className="pb-[76px] md:py-12 md:pt-[137px] py-6"
        style={{ backgroundColor: "#F7EEEB" }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Desktop Version - Hidden on mobile */}
          <div className="hidden md:block">
            {/* Top Component - Category, Title, Image */}
            <div className="mb-12">
              {/* Category */}
              <div className="mb-[70px]">
                <span className="text-gray-600 text-[15px] font-semibold tracking-[3px]">
                  {note.category}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-[70px] font-hero font-bold italic text-gray-900 mb-[38px]">
                {note.title}
              </h1>

              {/* Main Image */}
              <div className="w-full md:h-[460px] md:w-[708px] relative md:mb-[28px] rounded-lg overflow-hidden">
                <Image
                  src={articleImageSrc}
                  alt={note.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Two Column Layout Below */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Left Column - Article Data */}
              <div className="lg:col-span-2">
                {/* Subtitle */}
                <h2 className="md:text-[30px] font-medium text-black md:mb-[48px]">
                  {note.subtitle}
                </h2>

                {/* Description */}
                <div className="prose prose-lg max-w-none mb-8">
                  <div className="text-gray-700 leading-relaxed whitespace-pre-wrap md:text-black md:text-[20px] md:leading-[32px] md:tracking-[0px] md:font-thin md:max-w-[706px]">
                    {note.description}
                  </div>
                </div>

                {/* Author */}
                <div className="flex items-center text-sm text-gray-600 mb-8">
                  <div>
                    <p className="font-medium text-gray-900">
                      {note.username || "Dr. German Miranda Marini"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column - Related Posts */}
              <div className="lg:col-span-1">
                <div className="md:sticky md:top-0">
                  {/* Divider Line */}
                  <div className="w-[527px] h-px bg-black mb-6"></div>

                  <div className="space-y-6">
                    {relatedNotes.map((relatedNote) => (
                      <Link
                        key={relatedNote.id}
                        href={`/blog/${relatedNote.id}`}
                        className="block group hover:opacity-80 transition-opacity"
                      >
                        <div className="flex gap-4">
                          {/* Left Column - Image */}
                          <div className="w-[223px] h-[154px] relative flex-shrink-0 rounded-lg overflow-hidden">
                            <Image
                              src={
                                relatedNote.imageUrl ||
                                relatedNote.imageFilename
                                  ? processImageUrl(
                                      relatedNote.imageUrl ||
                                        relatedNote.imageFilename!
                                    )
                                  : "/hero-bg.png"
                              }
                              alt={relatedNote.title}
                              fill
                              className="object-cover"
                            />
                          </div>

                          {/* Right Column - Content */}
                          <div className="flex-1 min-w-0 flex flex-col justify-center">
                            {/* Title */}
                            <div className="max-w-[170px]">
                              <h4
                                className="font-bold italic text-[25px] tracking-[0px] text-gray-900 group-hover:text-gray-600 line-clamp-2"
                                style={{ fontFamily: "Times, serif" }}
                              >
                                {relatedNote.title}
                              </h4>
                            </div>

                            {/* Subtitle */}
                            <div className="max-w-[170px]b-2">
                              <p className="font-main font-semibold text-[20px] tracking-[0px] text-black">
                                {relatedNote.subtitle || "Actualidad médica"}
                              </p>
                            </div>

                            {/* Description Extract */}
                            <div className="max-w-[170px]">
                              <p className="font-main font-thin text-[10px] leading-[14px] text-left line-clamp-4">
                                {relatedNote.description.substring(0, 120)}...
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {relatedNotes.length === 0 && (
                    <p className="text-gray-500 text-sm">
                      No hay artículos relacionados disponibles en este momento.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Version - Visible on mobile only */}
          <div className="block md:hidden">
            {/* Mobile layout will go here */}
            <div className="space-y-6">
              {/* Title */}
              <h1
                className="font-bold italic text-[30px] text-gray-900 mb-[28px]"
                style={{ fontFamily: "Times, serif" }}
              >
                {note.title}
              </h1>

              {/* Main Image */}
              <div className="w-[248px] h-[187px] relative rounded-lg overflow-hidden mb-[10px]">
                <Image
                  src={articleImageSrc}
                  alt={note.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Subtitle */}
              <h2 className="text-lg font-medium text-black mb-[10px]">
                {note.subtitle}
              </h2>

              {/* Description */}
              <div className="prose prose-sm max-w-none">
                <div className="text-black whitespace-pre-wrap text-left font-thin text-[16px] leading-[22px]">
                  {note.description}
                </div>
              </div>

              {/* Author */}
              <div className="flex items-center text-sm text-gray-600">
                <div>
                  <p className="font-medium text-gray-900">
                    {note.username || "Dr. German Miranda Marini"}
                  </p>
                </div>
              </div>

              {/* Related Posts */}
              <div className="pt-6">
                <div className="grid grid-cols-2 gap-4">
                  {relatedNotes.map((relatedNote) => (
                    <Link
                      key={relatedNote.id}
                      href={`/blog/${relatedNote.id}`}
                      className="block group hover:opacity-80 transition-opacity"
                    >
                      <div className="space-y-2">
                        {/* Image */}
                        <div className="w-full h-32 relative rounded-lg overflow-hidden">
                          <Image
                            src={
                              relatedNote.imageUrl || relatedNote.imageFilename
                                ? processImageUrl(
                                    relatedNote.imageUrl ||
                                      relatedNote.imageFilename!
                                  )
                                : "/hero-bg.png"
                            }
                            alt={relatedNote.title}
                            fill
                            className="object-cover"
                          />
                        </div>

                        {/* Title */}
                        <h4 className="text-[20px] font-serif font-bold italic text-black group-hover:text-gray-600 line-clamp-2">
                          {relatedNote.title}
                        </h4>

                        {/* Subtitle */}
                        <p className="text-[16px] font-main font-regular text-black">
                          {relatedNote.subtitle || "Actualidad médica"}
                        </p>

                        {/* Description */}
                        <p className="text-[16px] font-main font-thin text-black line-clamp-4">
                          {relatedNote.description.substring(0, 100)}...
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contacto Section */}
      <div id="contacto-section">
        <ContactoSectionWrapper />
      </div>
    </PublicLayout>
  );
}
