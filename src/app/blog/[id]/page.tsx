import { PublicLayout } from "@/components/layout/PublicLayout";
import {
  getNoteById,
  getAllNotesWithImages,
  processImageUrl
} from "@/app/services/server/get";
import { BlogArticleCard } from "@/components/BlogArticleCard";
import { ContactoSection } from "@/components/ContactoSection";
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
  const articleImageSrc = note.imageUrl
    ? processImageUrl(note.imageUrl)
    : "/hero-bg.png";

  return (
    <PublicLayout>
      <div className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Article Content */}
            <div className="lg:col-span-2">
              {/* Article Image */}
              <div className="w-full h-[400px] relative mb-8 rounded-lg overflow-hidden">
                <Image
                  src={articleImageSrc}
                  alt={note.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Article Header */}
              <div className="mb-8">
                <h1 className="text-4xl font-hero font-bold text-gray-900 mb-4">
                  {note.title}
                </h1>

                {/* Article Meta */}
                <div className="flex items-center text-sm text-gray-500 mb-6">
                  <span>
                    Por {note.username || "Dr. German Miranda Marini"}
                  </span>
                  <span className="mx-2">•</span>
                  <span>
                    {new Date(note.createdAt).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric"
                    })}
                  </span>
                </div>

                {/* Category */}
                <div className="mb-6">
                  <span className="inline-block bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded-full">
                    Actualidad médica
                  </span>
                </div>
              </div>

              {/* Article Content */}
              <div className="prose prose-lg max-w-none">
                <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {note.description}
                </div>
              </div>

              {/* Back to Blog */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <Link
                  href="/blog"
                  className="inline-flex items-center text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  Volver al Blog
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <h3 className="text-xl font-hero font-bold text-gray-900 mb-6">
                  Artículos Relacionados
                </h3>

                <div className="space-y-6">
                  {relatedNotes.map((relatedNote) => (
                    <div
                      key={relatedNote.id}
                      className="border-b border-gray-200 pb-6 last:border-b-0"
                    >
                      <BlogArticleCard
                        imageSrc={
                          relatedNote.imageUrl
                            ? processImageUrl(relatedNote.imageUrl)
                            : "/hero-bg.png"
                        }
                        imageAlt={relatedNote.title}
                        title={relatedNote.title}
                        subtitle="Actualidad médica"
                        text={relatedNote.description.substring(0, 100) + "..."}
                        author={
                          relatedNote.username || "Dr. German Miranda Marini"
                        }
                        href={`/blog/${relatedNote.id}`}
                      />
                    </div>
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
      </div>

      {/* Contacto Section */}
      <div id="contacto-section">
        <ContactoSection />
      </div>
    </PublicLayout>
  );
}
