const CATEGORY_META: Record<string, { label: string; icon: string }> = {
  marketing: { label: 'Marketing', icon: '📈' },
  education: { label: 'Edukacja', icon: '🎓' },
  hr: { label: 'HR', icon: '🧑‍💼' },
  cx: { label: 'Customer Experience', icon: '💬' },
  product: { label: 'Produkt', icon: '🧩' },
  sales: { label: 'Sprzedaż', icon: '💼' },
  public: { label: 'Sektor publiczny', icon: '🏛️' },
  ngo: { label: 'NGO', icon: '🤝' },
  'e-commerce': { label: 'E-commerce', icon: '🛒' },
  integrations: { label: 'Integracje', icon: '🔌' },
  'geo-aeo': { label: 'SEO / GEO / AEO', icon: '🧠' },
  general: { label: 'Ogólne', icon: '📚' },
};

function titleCaseSlug(slug: string) {
  return slug
    .split('-')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ');
}

export function getCategoryMeta(slug: string) {
  return CATEGORY_META[slug] || { label: titleCaseSlug(slug), icon: '📁' };
}
