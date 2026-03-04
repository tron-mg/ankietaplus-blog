import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getDoc, listDocs } from '@/lib/content';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return listDocs('blog').map((d) => ({ slug: d.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const doc = getDoc('blog', params.slug);
  if (!doc) return {};
  return { title: doc.metaTitle, description: doc.metaDescription };
}

export default function BlogPage({ params }: { params: { slug: string } }) {
  const doc = getDoc('blog', params.slug);
  if (!doc) return notFound();

  const relatedBlog = listDocs('blog')
    .filter((d) => d.category === doc.category && d.slug !== doc.slug)
    .slice(0, 6);

  const relatedLandings = listDocs('landings').filter((d) => d.category === doc.category).slice(0, 3);

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: doc.title,
    description: doc.metaDescription,
    image: `https://ankietaplus-blog.vercel.app${doc.cover}`,
    author: { '@type': 'Organization', name: 'AnkietaPlus' },
  };

  return (
    <main className="article-wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <article className="article-main">
        <Image src={doc.cover} alt={doc.title} width={1200} height={675} className="hero-image" />
        <p className="tag">{doc.category}</p>
        <h1>{doc.title}</h1>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{doc.body}</ReactMarkdown>
      </article>

      <aside className="article-side">
        <div className="side-card cta-card">
          <h3>Przetestuj AnkietaPlus</h3>
          <p>Najwięcej funkcjonalności w najlepszej cenie. Uruchom pierwszą ankietę w kilka minut.</p>
          <a href="https://ankietaplus.pl/" className="btn btn-primary">Załóż konto</a>
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
