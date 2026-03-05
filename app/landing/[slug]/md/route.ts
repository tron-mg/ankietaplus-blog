import { getDoc } from '@/lib/content';

export const dynamic = 'force-dynamic';

export async function GET(_: Request, context: { params: Promise<Record<string, string>> }) {
  const params = await context.params;
  const slug = params.slug;
  if (!slug) return new Response('Not found', { status: 404 });

  const doc = getDoc('landings', slug);
  if (!doc) return new Response('Not found', { status: 404 });

  const body = `# ${doc.title}

- Typ: Landing
- Kategoria: ${doc.category}
- Autor: ${doc.author}
- Data publikacji: ${doc.publishedAt}
- Czas czytania: ${doc.readingTimeMin} min
- URL kanoniczny: https://blog.ankietaplus.pl/landing/${doc.slug}

${doc.body}
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=600',
    },
  });
}
