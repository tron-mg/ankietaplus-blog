import Link from 'next/link';
import { listDocs } from '@/lib/content';

export default function Home() {
  const landings = listDocs('landings');
  const blog = listDocs('blog');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'AnkietaPlus Blog',
    url: 'https://prolabs-tetris-web.vercel.app',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://ankietaplus.pl/?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <main className="wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h1>AnkietaPlus Blog — SEO Hub</h1>
      <p>Serwis contentowy pod akwizycję organiczną (B2B+B2C) dla AnkietaPlus.</p>

      <section>
        <h2>Landingi ({landings.length})</h2>
        <ul>
          {landings.map((d) => (
            <li key={d.slug}><Link href={`/landing/${d.slug}`}>{d.title}</Link></li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Artykuły ({blog.length})</h2>
        <ul>
          {blog.map((d) => (
            <li key={d.slug}><Link href={`/blog/${d.slug}`}>{d.title}</Link></li>
          ))}
        </ul>
      </section>
    </main>
  );
}
