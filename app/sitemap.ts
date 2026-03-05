import type { MetadataRoute } from 'next';
import { listDocs } from '@/lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://blog.ankietaplus.pl';
  const landings = listDocs('landings').map((d) => ({ url: `${base}/landing/${d.slug}` }));
  const blogs = listDocs('blog').map((d) => ({ url: `${base}/blog/${d.slug}` }));
  return [{ url: base }, ...landings, ...blogs];
}
