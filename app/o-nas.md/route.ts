export async function GET() {
  const body = `# O nas — AnkietaPlus

AnkietaPlus to platforma do tworzenia ankiet online, testów, quizów i formularzy.

## Dla kogo
- Marketing
- HR
- CX / Product
- Edukacja
- Sektor publiczny i NGO

## Co dostarczamy
- szybkie uruchamianie badań,
- logiczne ścieżki pytań,
- raportowanie i eksport danych,
- workflow od odpowiedzi do decyzji.

## Zasady komunikacji
- konkret zamiast marketingowego szumu,
- twierdzenia z kontekstem i źródłami,
- spójne nazewnictwo funkcji i zastosowań.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=600",
    },
  });
}
