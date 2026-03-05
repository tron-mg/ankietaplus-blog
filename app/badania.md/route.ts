export async function GET() {
  const body = `# Badania i metodologia — AnkietaPlus

## Co mierzymy
- satysfakcję (CSAT),
- lojalność (NPS),
- wysiłek klienta (CES),
- jakość procesu i doświadczenia.

## Jak pracować z danymi
1. Ustal cel i KPI.
2. Zaprojektuj pytania pod decyzję.
3. Zbierz odpowiedzi na właściwym segmencie.
4. Przeanalizuj wyniki i wdroż zmiany.
5. Zmierz efekt w kolejnej fali.

## Standard jakości
- pytania mają prowadzić do decyzji,
- odpowiedzi jakościowe są analizowane razem z danymi ilościowymi,
- wyniki porównywane w czasie i między segmentami.

## Uwaga dot. claimów
Każde twierdzenie o skuteczności powinno mieć kontekst (okres, segment, metodologia).
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=600",
    },
  });
}
