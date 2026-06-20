import { useState, useEffect } from "react";

const cache = new Map<string, string | null>();
const inFlight = new Map<string, Promise<string | null>>();

async function fetchThumbnail(url: string): Promise<string | null> {
  if (cache.has(url)) return cache.get(url)!;
  if (inFlight.has(url)) return inFlight.get(url)!;

  const p = fetch(`/api/thumbnail?url=${encodeURIComponent(url)}`)
    .then((r) => r.json())
    .then((d: { thumbnail?: string }) => d.thumbnail ?? null)
    .catch(() => null)
    .then((result) => {
      cache.set(url, result);
      inFlight.delete(url);
      return result;
    });

  inFlight.set(url, p);
  return p;
}

export function useThumbnail(url: string | undefined): { thumbnail: string | null; loading: boolean } {
  const [thumbnail, setThumbnail] = useState<string | null>(() =>
    url && cache.has(url) ? cache.get(url)! : null
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!url) return;
    if (cache.has(url)) { setThumbnail(cache.get(url)!); return; }
    setLoading(true);
    fetchThumbnail(url).then((t) => { setThumbnail(t); setLoading(false); });
  }, [url]);

  return { thumbnail, loading };
}
