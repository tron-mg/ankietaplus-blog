export async function GET() {
  const body = `# FAQ — AnkietaPlus

## Czym jest AnkietaPlus?
AnkietaPlus to narzędzie do ankiet online, testów, quizów i formularzy, które pomaga zamieniać odpowiedzi w konkretne decyzje biznesowe.

## Dla kogo jest platforma?
Dla firm i zespołów (marketing, HR, CX, sprzedaż, edukacja, sektor publiczny), które potrzebują szybkiego feedbacku i czytelnych raportów.

## Jak zacząć?
Załóż darmowe konto, wybierz typ badania, opublikuj link i zbieraj odpowiedzi. Następnie analizuj wyniki i wdrażaj poprawki.

## Czy są plany płatne?
Tak. Szczegóły są dostępne na stronie cennika: https://ankietaplus.pl/cennik

## Jak kontaktować się z zespołem?
Przez formularz kontaktowy i kanały na stronie głównej produktu: https://ankietaplus.pl/
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=600",
    },
  });
}
