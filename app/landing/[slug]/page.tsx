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
  return <main className="article"><h1>{doc.title}</h1><pre>{doc.body}</pre></main>;
}
