import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getDoc, listDocs } from '@/lib/content';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return listDocs('landings').map((d) => ({ slug: d.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const doc = getDoc('landings', params.slug);
  if (!doc) return {};
  return { title: doc.metaTitle, description: doc.metaDescription };
}

export default function LandingPage({ params }: { params: { slug: string } }) {
  const doc = getDoc('landings', params.slug);
  if (!doc) return notFound();

  const relatedLandings = listDocs('landings')
    .filter((d) => d.category === doc.category && d.slug !== doc.slug)
    .slice(0, 4);

  const relatedBlog = listDocs('blog').filter((d) => d.category === doc.category).slice(0, 6);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: doc.title,
    description: doc.metaDescription,
    about: doc.keyword,
  };

  return (
    <main className="article-wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="article-main">
        <Image src={doc.cover} alt={doc.title} width={1200} height={675} className="hero-image" />
        <p className="tag">{doc.category}</p>
        <h1>{doc.title}</h1>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{doc.body}</ReactMarkdown>
      </article>
      <aside className="article-side">
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
