/** "Last updated {date}" stamp for blog posts and key service pages. */
export function LastUpdated({ date, className }: { date: string; className?: string }) {
  const formatted = new Date(`${date}T00:00:00`).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <p className={className ?? "text-sm text-brand-ink/60"}>
      Last updated <time dateTime={date}>{formatted}</time>
    </p>
  );
}
