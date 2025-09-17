// src/lib/wp.ts
export async function wpQuery<T>(
  query: string,
  variables: Record<string, any> = {}
) {
  const endpoint = import.meta.env.WP_GRAPHQL_ENDPOINT;
  if (!endpoint) throw new Error('WP_GRAPHQL_ENDPOINT is not set');

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok)
    throw new Error(`WPGraphQL failed: ${res.status} ${res.statusText}`);

  const json = await res.json();
  if (json.errors) throw new Error(JSON.stringify(json.errors));
  return json.data as T;
}
