/**
 * Renders a JSON-LD <script> block. JSON-LD must mirror ONLY what is visible
 * on the page — keep the `data` you pass accurate to the rendered content.
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      // Content is server-generated from typed data, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
