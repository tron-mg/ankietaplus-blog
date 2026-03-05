import Image from 'next/image';
import Link from 'next/link';
import { listDocs } from '@/lib/content';
import { getCategoryMeta } from '@/lib/categories';

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
          <a href="https://ankietaplus.pl/rejestracja?plan=1" className="btn btn-primary">Załóż darmowe konto</a>
        </div>
      </header>

      <section className="hub-grid">
        {categories.map((cat) => {
          const meta = getCategoryMeta(cat);
          return (
            <article key={cat} className="hub-card">
              <h3><Link href={`/kategoria/${cat}`}>{meta.icon} {meta.label}</Link></h3>
              <p>Kategoria tematyczna</p>
            </article>
          );
        })}
      </section>

      <section id="landingi" className="section">
        <h2>Landingi ({landings.length})</h2>
        <div className="grid">
          {landings.map((d) => (
            <article key={d.slug} className="card">
              <Image src={d.cover} alt={d.title} width={800} height={450} className="thumb" />
              <div className="card-body">
                <p className="category-line">Kategoria: {getCategoryMeta(d.category).label}</p>
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
                <p className="category-line">Kategoria: {getCategoryMeta(d.category).label}</p>
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
