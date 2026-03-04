import fs from 'fs';
import path from 'path';

type DocType = 'landings' | 'blog';

export type Doc = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
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
    const k = line.slice(0, i).trim();
    const v = line.slice(i + 1).trim().replace(/^"|"$/g, '');
    meta[k] = v;
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
    return {
      slug,
      title: meta.title || slug,
      metaTitle: meta.metaTitle || meta.title || slug,
      metaDescription: meta.metaDescription || '',
      body,
    };
  });
}

export function getDoc(type: DocType, slug: string): Doc | null {
  const p = path.join(folderFor(type), `${slug}.md`);
  if (!fs.existsSync(p)) return null;
  const raw = fs.readFileSync(p, 'utf8');
  const { meta, body } = parseFrontmatter(raw);
  return {
    slug,
    title: meta.title || slug,
    metaTitle: meta.metaTitle || meta.title || slug,
    metaDescription: meta.metaDescription || '',
    body,
  };
}
