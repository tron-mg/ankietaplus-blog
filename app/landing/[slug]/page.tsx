import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getDoc, listDocs } from '@/lib/content';
import { getCategoryMeta } from '@/lib/categories';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return listDocs('landings').map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = getDoc('landings', slug);
  if (!doc) return {};
  return { title: doc.metaTitle, description: doc.metaDescription };
}

export default async function LandingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = getDoc('landings', slug);
  if (!doc) return notFound();

  const relatedLandings = listDocs('landings')
    .filter((d) => d.category === doc.category && d.slug !== doc.slug)
    .slice(0, 4);

  const relatedBlog = listDocs('blog').filter((d) => d.category === doc.category).slice(0, 6);
  const cat = getCategoryMeta(doc.category);

  const pageLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: doc.title,
    description: doc.metaDescription,
    about: doc.keyword,
  };

  const softwareLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'AnkietaPlus',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'PLN' },
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Strona główna', item: 'https://ankietaplus-blog.vercel.app/' },
      { '@type': 'ListItem', position: 2, name: 'Landingi', item: 'https://ankietaplus-blog.vercel.app/' },
      { '@type': 'ListItem', position: 3, name: doc.title, item: `https://ankietaplus-blog.vercel.app/landing/${doc.slug}` },
    ],
  };

  return (
    <main className="article-wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <article className="article-main medium-style">
        <nav className="breadcrumbs">
          <Link href="/">Start</Link> / <Link href={`/kategoria/${doc.category}`}>{cat.label}</Link> / <span>{doc.title}</span>
        </nav>
        <Image src={doc.cover} alt={doc.title} width={1200} height={675} className="hero-image" />
        <p className="tag">{cat.label}</p>
        <h1>{doc.title}</h1>
        <div className="meta-row">Autor: <strong>{doc.author}</strong> · Publikacja: {doc.publishedAt} · Czas czytania: {doc.readingTimeMin} min</div>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{doc.body}</ReactMarkdown>
      </article>
      <aside className="article-side sticky">
        <div className="side-card cta-card">
          <h3>AnkietaPlus: więcej funkcji, lepsza cena</h3>
          <p>Uruchom ankietę, test lub formularz i zamień odpowiedzi w konkretne decyzje biznesowe.</p>
          <a href="https://ankietaplus.pl/cennik" className="btn btn-primary">Zobacz cennik</a>
          <a href="https://ankietaplus.pl/rejestracja?plan=1" className="btn btn-ghost-dark">Konto darmowe</a>
          <a href="https://ankietaplus.pl/rejestracja?plan=10" className="btn btn-ghost-dark">Plan płatny</a>
        </div>
        <div className="side-card">
          <h3>Powiązane landingi</h3>
          <ul>{relatedLandings.map((d) => <li key={d.slug}><Link href={`/landing/${d.slug}`}>{d.title}</Link></li>)}</ul>
        </div>
        <div className="side-card">
          <h3>Powiązane artykuły</h3>
          <ul>{relatedBlog.map((d) => <li key={d.slug}><Link href={`/blog/${d.slug}`}>{d.title}</Link></li>)}</ul>
        </div>
      </aside>
    </main>
  );
}
