import { NotesService } from "@/lib/notes";

/**
 * Test function to verify image endpoint is working
 * Examples:
 * - testImageEndpoint('20250904_013319_34f6feb1.png')
 * - testImageEndpoint('/api/notes/image/20250904_013319_34f6feb1.png')
 * - testImageEndpoint('http://72.60.58.137/api/notes/image/20250904_013319_34f6feb1.png')
 */
export async function testImageEndpoint(imageUrlOrFilename: string) {
  try {
    console.log(`Testing image endpoint for: ${imageUrlOrFilename}`);

    // Test 1: Get normalized image URL
    const imageUrl = NotesService.getImageUrl(imageUrlOrFilename);
    console.log(`Normalized Image URL: ${imageUrl}`);

    // Test 2: Extract filename for direct API calls
    const filename = NotesService.extractFilenameFromUrl(imageUrl);
    console.log(`Extracted filename: ${filename}`);

    let blob: Blob | undefined;
    let dataUrl: string | undefined;

    // Test 3: Try to fetch the image using filename
    if (filename) {
      blob = await NotesService.getImage(filename);
      console.log(`Image blob size: ${blob.size} bytes`);
      console.log(`Image type: ${blob.type}`);

      // Test 4: Convert to data URL
      dataUrl = await NotesService.getImageDataUrl(filename);
      console.log(`Data URL length: ${dataUrl.length} characters`);
      console.log(`Data URL preview: ${dataUrl.substring(0, 100)}...`);
    }

    return {
      success: true,
      imageUrl,
      filename,
      blobSize: blob?.size || 0,
      blobType: blob?.type || "",
      dataUrlLength: dataUrl?.length || 0
    };
  } catch (error) {
    console.error("Image endpoint test failed:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
}

// Make it available globally for testing
if (typeof window !== "undefined") {
  (window as any).testImageEndpoint = testImageEndpoint;
}
