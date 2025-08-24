import { PublicLayout } from "@/components/layout/PublicLayout";

export default function BlogPage() {
  return (
    <PublicLayout>
      <div className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-hero font-bold tracking-tight text-gray-900 sm:text-6xl">
              Blog
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Lee nuestros últimos artículos y noticias.
            </p>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
