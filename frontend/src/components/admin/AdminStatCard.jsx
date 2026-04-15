export function AdminStatCard({ label, value }) {
  return (
    <article className="glass-card stat-card">
      <span className="eyebrow">{label}</span>
      <strong>{value}</strong>
    </article>
  );
}
