export async function GET() {
  const body = `Contact: mailto:security@ankietaplus.pl
Expires: 2026-12-31T23:59:59Z
Preferred-Languages: pl, en
Policy: https://blog.ankietaplus.pl/security-policy/
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
