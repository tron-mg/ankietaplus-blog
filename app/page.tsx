import Image from 'next/image';
import Link from 'next/link';
import { listDocs } from '@/lib/content';

export default function Home() {
  const landings = listDocs('landings');
  const blog = listDocs('blog');

  const categories = Array.from(new Set([...landings, ...blog].map((d) => d.category)));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'AnkietaPlus Blog',
    description: 'Nowoczesny serwis contentowy o ankietach online, testach i quizach.',
    publisher: { '@type': 'Organization', name: 'AnkietaPlus' },
  };

  return (
    <main className="container">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="hero">
        <p className="eyebrow">ANKIETAPLUS INSIGHTS</p>
        <h1>Nowoczesny blog o ankietach online, testach i quizach</h1>
        <p>
          Strategia, wdrożenia i praktyczne playbooki dla B2B i B2C. Wszystko pod wzrost
          konwersji i sprzedaż planów AnkietaPlus.
        </p>
        <div className="cta-row">
          <a href="https://ankietaplus.pl/" className="btn btn-primary">Załóż konto AnkietaPlus</a>
          <a href="#landingi" className="btn btn-ghost">Zobacz landingi SEO</a>
        </div>
      </header>

      <section className="hub-grid">
        {categories.map((cat) => (
          <article key={cat} className="hub-card">
            <h3>{cat.toUpperCase()}</h3>
            <p>
              {landings.filter((d) => d.category === cat).length} LP ·{' '}
              {blog.filter((d) => d.category === cat).length} artykułów
            </p>
          </article>
        ))}
      </section>

      <section id="landingi" className="section">
        <h2>Landingi ({landings.length})</h2>
        <div className="grid">
          {landings.map((d) => (
            <article key={d.slug} className="card">
              <Image src={d.cover} alt={d.title} width={800} height={450} className="thumb" />
              <div className="card-body">
                <p className="tag">{d.category}</p>
                <h3><Link href={`/landing/${d.slug}`}>{d.title}</Link></h3>
                <p>{d.metaDescription}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Artykuły ({blog.length})</h2>
        <div className="grid">
          {blog.map((d) => (
            <article key={d.slug} className="card">
              <Image src={d.cover} alt={d.title} width={800} height={450} className="thumb" />
              <div className="card-body">
                <p className="tag">{d.category}</p>
                <h3><Link href={`/blog/${d.slug}`}>{d.title}</Link></h3>
                <p>{d.metaDescription}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
