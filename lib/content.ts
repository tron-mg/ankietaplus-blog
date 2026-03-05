import fs from 'fs';
import path from 'path';

export type DocType = 'landings' | 'blog';

export type Doc = {
  type: DocType;
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  category: string;
  keyword: string;
  cover: string;
  author: string;
  publishedAt: string;
  readingTimeMin: number;
  body: string;
};

function parseFrontmatter(raw: string) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { meta: {}, body: raw };
  const [, head, body] = match;
  const meta: Record<string, string> = {};

  head.split('\n').forEach((line) => {
    const i = line.indexOf(':');
    if (i === -1) return;
    const key = line.slice(0, i).trim();
    const value = line.slice(i + 1).trim().replace(/^"|"$/g, '');
    meta[key] = value;
  });

  return { meta, body };
}

function folderFor(type: DocType) {
  return path.join(process.cwd(), 'content', type);
}

export function listDocs(type: DocType): Doc[] {
  const folder = folderFor(type);
  const files = fs.readdirSync(folder).filter((f) => f.endsWith('.md'));

  return files.map((file) => {
    const slug = file.replace(/\.md$/, '');
    const raw = fs.readFileSync(path.join(folder, file), 'utf8');
    const { meta, body } = parseFrontmatter(raw);

    const words = body.trim().split(/\s+/).filter(Boolean).length;
    return {
      type,
      slug,
      title: meta.title || slug,
      metaTitle: meta.metaTitle || meta.title || slug,
      metaDescription: meta.metaDescription || '',
      category: meta.category || 'general',
      keyword: meta.keyword || '',
      cover: meta.cover || '/images/default.svg',
      author: meta.author || 'Zespół AnkietaPlus',
      publishedAt: meta.publishedAt || '2026-03-05',
      readingTimeMin: Math.max(2, Math.round(words / 200)),
      body,
    };
  });
}

export function getDoc(type: DocType, slug: string): Doc | null {
  const p = path.join(folderFor(type), `${slug}.md`);
  if (!fs.existsSync(p)) return null;

  const raw = fs.readFileSync(p, 'utf8');
  const { meta, body } = parseFrontmatter(raw);

  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return {
    type,
    slug,
    title: meta.title || slug,
    metaTitle: meta.metaTitle || meta.title || slug,
    metaDescription: meta.metaDescription || '',
    category: meta.category || 'general',
    keyword: meta.keyword || '',
    cover: meta.cover || '/images/default.svg',
    author: meta.author || 'Zespół AnkietaPlus',
    publishedAt: meta.publishedAt || '2026-03-05',
    readingTimeMin: Math.max(2, Math.round(words / 200)),
    body,
  };
}

export function getRelated(doc: Doc, limit = 4): Doc[] {
  const sameType = listDocs(doc.type).filter((d) => d.slug !== doc.slug);
  const sameCategory = sameType.filter((d) => d.category === doc.category);
  return sameCategory.slice(0, limit);
}
