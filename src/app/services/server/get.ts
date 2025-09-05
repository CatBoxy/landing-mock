import jwt from "jsonwebtoken";
import type { Note } from "@/types/notes";

const API_BASE_URL = "http://72.60.58.137/api";

interface BlogArticleData {
  imageSrc: string;
  imageAlt: string;
  title: string;
  subtitle: string;
  text: string;
  author: string;
}

// Fallback data matching the current hardcoded articles
const fallbackArticles: BlogArticleData[] = [
  {
    imageSrc: "/hero-bg.png",
    imageAlt: "Nuevas Tendencias",
    title: "Nuevas Tendencias",
    subtitle: "Innovaciones en medicina estética",
    text: "Descubre las últimas técnicas y tratamientos que están revolucionando el campo de la medicina estética.",
    author: "Dr. German Miranda Marini"
  },
  {
    imageSrc: "/hero-bg.png",
    imageAlt: "Cuidado Post-Tratamiento",
    title: "Cuidado Post-Tratamiento",
    subtitle: "Guía completa de recuperación",
    text: "Consejos esenciales para optimizar los resultados y mantener la salud de tu piel después de cualquier procedimiento.",
    author: "Dr. German Miranda Marini"
  },
  {
    imageSrc: "/hero-bg.png",
    imageAlt: "Bienestar Integral",
    title: "Bienestar Integral",
    subtitle: "Salud física y mental",
    text: "Cómo la medicina estética contribuye al bienestar general y la confianza personal de cada paciente.",
    author: "Dr. German Miranda Marini"
  },
  {
    imageSrc: "/hero-bg.png",
    imageAlt: "Tecnología Avanzada",
    title: "Tecnología Avanzada",
    subtitle: "Equipamiento de última generación",
    text: "Nuestras instalaciones cuentan con la tecnología más avanzada para garantizar tratamientos seguros y efectivos.",
    author: "Dr. German Miranda Marini"
  },
  {
    imageSrc: "/hero-bg.png",
    imageAlt: "Nutrición y Belleza",
    title: "Nutrición y Belleza",
    subtitle: "Alimentación para la piel",
    text: "La importancia de una dieta equilibrada en el mantenimiento de la salud y belleza de la piel.",
    author: "Dr. German Miranda Marini"
  },
  {
    imageSrc: "/hero-bg.png",
    imageAlt: "Envejecimiento Saludable",
    title: "Envejecimiento Saludable",
    subtitle: "Aceptación y cuidado",
    text: "Cómo envejecer de manera saludable manteniendo la autoestima y el bienestar personal.",
    author: "Dr. German Miranda Marini"
  }
];

/**
 * Generate JWT token for server-side API calls
 */
function generateServerJWT(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET environment variable is not set");
  }

  // Generate a server-side JWT with appropriate claims
  const payload = {
    iss: "landing-server",
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 60 * 60 // 1 hour expiration
  };

  return jwt.sign(payload, secret);
}

/**
 * Process image URL to ensure it's a full URL
 */
function processImageUrl(imageUrlOrFilename: string): string {
  // If it's already a full URL, return as is
  if (
    imageUrlOrFilename.startsWith("http://") ||
    imageUrlOrFilename.startsWith("https://")
  ) {
    return imageUrlOrFilename;
  }

  // If it's a relative API path, construct full URL
  if (imageUrlOrFilename.startsWith("/api/notes/image/")) {
    return `http://72.60.58.137${imageUrlOrFilename}`;
  }

  // If it's just a filename, construct the full URL
  return `${API_BASE_URL}/notes/image/${imageUrlOrFilename}`;
}

/**
 * Convert Note to BlogArticleData format
 */
function noteToArticleData(note: Note): BlogArticleData {
  return {
    imageSrc: note.imageUrl ? processImageUrl(note.imageUrl) : "/hero-bg.png",
    imageAlt: note.title,
    title: note.title,
    subtitle: "Actualidad médica", // Default subtitle since notes don't have subtitles
    text: note.description,
    author: note.username || "Dr. German Miranda Marini"
  };
}

/**
 * Get notes with images for the homepage actualidad section
 * Returns up to 6 notes with processed image URLs
 */
export async function getNotesForHomepage(): Promise<BlogArticleData[]> {
  try {
    const token = generateServerJWT();

    const response = await fetch(
      `${API_BASE_URL}/notes/with-images?page=0&size=6`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        cache: "no-store" // Ensure fresh data for each request
      }
    );

    if (!response.ok) {
      console.warn(
        "Failed to fetch notes from API, using fallback data:",
        response.status
      );
      return fallbackArticles;
    }

    const data = await response.json();

    if (!data.content || !Array.isArray(data.content)) {
      console.warn("Invalid API response format, using fallback data");
      return fallbackArticles;
    }

    // Convert notes to article format
    const articles = data.content.map(noteToArticleData);

    // If we have fewer than 6 notes, pad with fallback data
    if (articles.length < 6) {
      const remainingCount = 6 - articles.length;
      articles.push(...fallbackArticles.slice(0, remainingCount));
    }

    return articles.slice(0, 6); // Ensure we return exactly 6 articles
  } catch (error) {
    console.error("Error fetching notes for homepage:", error);
    return fallbackArticles;
  }
}
