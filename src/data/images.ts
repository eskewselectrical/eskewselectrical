import type { ImageMetadata } from 'astro';

/**
 * Auto-discovers images. Drop a .jpg/.jpeg/.png/.webp into:
 *   src/images/services/<service>/  -> becomes that service's photo
 *   src/images/gallery/             -> appears in the gallery
 * No code changes needed. First image alphabetically wins for services.
 */

const serviceGlobs = import.meta.glob<{ default: ImageMetadata }>(
  '../images/services/**/*.{jpg,jpeg,png,webp}',
  { eager: true }
);

const galleryGlobs = import.meta.glob<{ default: ImageMetadata }>(
  '../images/gallery/*.{jpg,jpeg,png,webp}',
  { eager: true }
);

export function serviceImage(slug: string): ImageMetadata | null {
  const matches = Object.entries(serviceGlobs)
    .filter(([path]) => path.includes(`/services/${slug}/`))
    .sort(([a], [b]) => a.localeCompare(b));
  return matches.length > 0 ? matches[0][1].default : null;
}

export interface GalleryImage {
  image: ImageMetadata;
  alt: string;
}

/** Filename becomes the alt text: "kitchen-lighting-install.jpg" -> "Kitchen lighting install" */
export const galleryImages: GalleryImage[] = Object.entries(galleryGlobs)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, mod]) => {
    const file = path.split('/').pop() ?? '';
    const name = file.replace(/\.(jpg|jpeg|png|webp)$/i, '').replace(/[-_]+/g, ' ');
    const alt = name.charAt(0).toUpperCase() + name.slice(1);
    return { image: mod.default, alt };
  });
