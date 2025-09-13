"use client";

import { useState, useEffect } from "react";
import { NotesService, NotesError } from "@/lib/notes";
import { toast } from "sonner";

interface NoteImageProps {
  imageUrl?: string;
  imageFilename?: string; // Fallback when imageUrl is null
  alt: string;
  className?: string;
  fallback?: React.ReactNode;
}

export function NoteImage({
  imageUrl,
  imageFilename,
  alt,
  className = "",
  fallback
}: NoteImageProps) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Use imageUrl if available, otherwise fall back to imageFilename
    const imageToUse = imageUrl || imageFilename;

    if (!imageToUse) {
      setImageSrc(null);
      setError(false);
      return;
    }

    const loadImage = async () => {
      try {
        setLoading(true);
        setError(false);

        // Use the service to normalize the URL (handles all cases)
        const normalizedImageUrl = NotesService.getImageUrl(imageToUse);
        setImageSrc(normalizedImageUrl);
      } catch (err) {
        if (err instanceof NotesError) {
          toast.error(err.message);
        } else {
          toast.error("Error al cargar la imagen");
        }
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadImage();
  }, [imageUrl, imageFilename]);

  if (!imageUrl && !imageFilename) {
    return fallback ? <>{fallback}</> : null;
  }

  if (loading) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-100 ${className}`}
      >
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600"></div>
      </div>
    );
  }

  if (error || !imageSrc) {
    return fallback ? (
      <>{fallback}</>
    ) : (
      <div
        className={`flex items-center justify-center bg-gray-100 text-gray-500 ${className}`}
      >
        <p className="text-sm">Error al cargar imagen</p>
      </div>
    );
  }

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      onError={() => {
        setError(true);
        toast.error("Error al cargar la imagen");
      }}
      onLoad={() => setLoading(false)}
    />
  );
}
