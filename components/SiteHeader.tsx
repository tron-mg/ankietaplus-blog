import Link from 'next/link';

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/" className="brand">AnkietaPlus Blog</Link>
        <nav className="main-nav" aria-label="Główna nawigacja">
          <a href="https://ankietaplus.pl/cennik">Cennik</a>
          <a href="https://ankietaplus.pl/rejestracja?plan=1">Konto darmowe</a>
          <a href="https://ankietaplus.pl/rejestracja?plan=10">Plan bez limitów</a>
        </nav>
      </div>
    </header>
  );
}
