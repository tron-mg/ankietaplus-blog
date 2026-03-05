import Link from 'next/link';
import { listDocs } from '@/lib/content';
import { getCategoryMeta } from '@/lib/categories';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  const cats = Array.from(new Set([...listDocs('landings'), ...listDocs('blog')].map((d) => d.category)));
  return cats.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cat = getCategoryMeta(slug);
  return {
    title: `Kategoria ${cat.label} | AnkietaPlus Blog`,
    description: `Treści SEO w kategorii ${cat.label} dla AnkietaPlus.`,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const landings = listDocs('landings').filter((d) => d.category === slug);
  const blog = listDocs('blog').filter((d) => d.category === slug);
  if (!landings.length && !blog.length) return notFound();

  const cat = getCategoryMeta(slug);

  return (
    <main className="container">
      <h1>{cat.icon} Kategoria: {cat.label}</h1>
      <p>Klaster tematyczny z pełnym cross-linkowaniem.</p>

      <section className="section">
        <h2>Landingi ({landings.length})</h2>
        <ul>{landings.map((d) => <li key={d.slug}><Link href={`/landing/${d.slug}`}>{d.title}</Link></li>)}</ul>
      </section>
      <section className="section">
        <h2>Artykuły ({blog.length})</h2>
        <ul>{blog.map((d) => <li key={d.slug}><Link href={`/blog/${d.slug}`}>{d.title}</Link></li>)}</ul>
      </section>
    </main>
  );
}
