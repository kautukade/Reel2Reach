-- Reel2Reach blog CMS + media storage
-- Run after 001_initial_schema.sql

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT DEFAULT '',
  content TEXT DEFAULT '',
  cover_image TEXT,
  author_name TEXT DEFAULT 'Reel2Reach Media',
  category TEXT DEFAULT 'Creative',
  featured BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  published_at TIMESTAMPTZ,
  seo_title TEXT DEFAULT '',
  seo_description TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS blog_media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
  media_type TEXT NOT NULL CHECK (media_type IN ('image', 'video')),
  url TEXT NOT NULL,
  storage_path TEXT,
  caption TEXT DEFAULT '',
  alt_text TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_blog_posts_status_published ON blog_posts(status, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_media_post_sort ON blog_media(post_id, sort_order);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_media ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read published blog posts" ON blog_posts
  FOR SELECT USING (status = 'published');

CREATE POLICY "Public read published blog media" ON blog_media
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM blog_posts
      WHERE blog_posts.id = blog_media.post_id
        AND blog_posts.status = 'published'
    )
  );

CREATE POLICY "Admin full access blog posts" ON blog_posts
  FOR ALL USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin full access blog media" ON blog_media
  FOR ALL USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

GRANT SELECT ON blog_posts, blog_media TO anon;
GRANT ALL ON blog_posts, blog_media TO authenticated;

-- Public bucket used by the CMS for blog, portfolio and general site media.
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'reel2reach-media',
  'reel2reach-media',
  TRUE,
  104857600,
  ARRAY[
    'image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif',
    'video/mp4', 'video/webm', 'video/quicktime'
  ]
)
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

CREATE POLICY "Public read Reel2Reach media" ON storage.objects
  FOR SELECT USING (bucket_id = 'reel2reach-media');

CREATE POLICY "Authenticated upload Reel2Reach media" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'reel2reach-media');

CREATE POLICY "Authenticated update Reel2Reach media" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'reel2reach-media')
  WITH CHECK (bucket_id = 'reel2reach-media');

CREATE POLICY "Authenticated delete Reel2Reach media" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'reel2reach-media');
