export interface Note {
  id: number;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  imageUrl?: string; // Full URL or filename depending on API response
  imageFilename?: string; // Filename from API response
  createdAt: string;
  updatedAt: string;
  userId: number;
  username?: string; // For display purposes
}

export interface CreateNoteRequest {
  title: string;
  subtitle: string;
  category: string;
  description: string;
  image?: File;
}

export interface UpdateNoteRequest {
  title: string;
  subtitle: string;
  category: string;
  description: string;
  image?: File;
}

export interface NotesResponse {
  content: Note[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}

export interface PaginationParams {
  page?: number;
  size?: number;
}
