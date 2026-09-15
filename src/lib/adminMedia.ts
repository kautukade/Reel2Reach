import { isSupabaseConfigured, supabase } from './supabase';

export const MEDIA_BUCKET = 'reel2reach-media';

export type UploadedMedia = {
  url: string;
  path: string;
  type: 'image' | 'video';
};

function safeFileName(name: string) {
  const dot = name.lastIndexOf('.');
  const ext = dot >= 0 ? name.slice(dot).toLowerCase() : '';
  const stem = (dot >= 0 ? name.slice(0, dot) : name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60) || 'media';
  return `${stem}${ext}`;
}

export function mediaTypeFromFile(file: File): 'image' | 'video' {
  return file.type.startsWith('video/') ? 'video' : 'image';
}

export function validateMediaFile(file: File) {
  const isImage = file.type.startsWith('image/');
  const isVideo = file.type.startsWith('video/');
  if (!isImage && !isVideo) {
    throw new Error('Only image and video files are supported.');
  }
  const maxBytes = isVideo ? 100 * 1024 * 1024 : 12 * 1024 * 1024;
  if (file.size > maxBytes) {
    throw new Error(isVideo ? 'Video must be 100 MB or smaller.' : 'Image must be 12 MB or smaller.');
  }
}

export async function uploadAdminMedia(file: File, folder = 'library'): Promise<UploadedMedia> {
  if (!isSupabaseConfigured()) throw new Error('Supabase is not configured.');
  validateMediaFile(file);
  const type = mediaTypeFromFile(file);
  const path = `${folder}/${Date.now()}-${crypto.randomUUID()}-${safeFileName(file.name)}`;
  const { error } = await supabase.storage.from(MEDIA_BUCKET).upload(path, file, {
    cacheControl: '3600',
    upsert: false,
    contentType: file.type || undefined,
  });
  if (error) throw error;
  const { data } = supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path);
  if (!data.publicUrl) throw new Error('Could not create public media URL.');
  return { url: data.publicUrl, path, type };
}

export async function deleteAdminMedia(path?: string | null) {
  if (!path || !isSupabaseConfigured()) return;
  const { error } = await supabase.storage.from(MEDIA_BUCKET).remove([path]);
  if (error) throw error;
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}
