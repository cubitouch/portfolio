import { useCallback, useState } from "react";

interface CategoryCounts {
  total: number;
  updates: number;
  promotions: number;
  social: number;
  forums: number;
  personal: number;
}

const categories = [
  { field: "total" as const, labelIds: [] },
  { field: "updates" as const, labelIds: ["CATEGORY_UPDATES"] },
  { field: "promotions" as const, labelIds: ["CATEGORY_PROMOTIONS"] },
  { field: "social" as const, labelIds: ["CATEGORY_SOCIAL"] },
  { field: "forums" as const, labelIds: ["CATEGORY_FORUMS"] },
  { field: "personal" as const, labelIds: ["CATEGORY_PERSONAL"] },
];

/**
 * We'll define a helper that does incremental counting for a single category,
 * calling `onPartialUpdate` after each page so the UI can reflect partial progress.
 */
async function fetchCountIncrementally(
  accessToken: string,
  query: string | undefined,
  labelIds: string[],
  onPartialUpdate: (increment: number) => void
): Promise<void> {
  let pageToken: string | undefined;

  do {
    let url =
      "https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=500";
    if (pageToken) url += `&pageToken=${encodeURIComponent(pageToken)}`;
    if (query) url += `&q=${encodeURIComponent(query)}`;
    if (labelIds.length > 0) {
      labelIds.forEach((lbl) => {
        url += `&labelIds=${encodeURIComponent(lbl)}`;
      });
    }

    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }

    const data = await res.json();
    const messages = data.messages || [];
    // "messages.length" is how many IDs we got in this page
    onPartialUpdate(messages.length);

    pageToken = data.nextPageToken;
  } while (pageToken);
}

/**
 * Hook that counts Gmail messages across multiple categories,
 * updating counts incrementally from 0 upwards as pages arrive.
 */
export function useGmailProgressiveCounts(accessToken: string | null) {
  // We'll store each category's current partial count in state
  const [counts, setCounts] = useState<CategoryCounts>({
    total: 0,
    updates: 0,
    promotions: 0,
    social: 0,
    forums: 0,
    personal: 0,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  /**
   * fetchCounts(query) triggers the incremental counting for each category in parallel.
   * We show partial sums after each page for each category, so counts will "climb" from 0 to final.
   */
  const fetchCounts = useCallback(
    async (query?: string) => {
      if (!accessToken) {
        setError(new Error("No access token provided."));
        return;
      }

      setIsLoading(true);
      setError(null);

      // Reset everything to 0 so we can watch it climb
      setCounts({
        total: 0,
        updates: 0,
        promotions: 0,
        social: 0,
        forums: 0,
        personal: 0,
      });

      try {
        // We'll run each category fetch in parallel with Promise.all
        // so they're counting simultaneously, each updating state as they progress.
        const promises = categories.map(({ field, labelIds }) => {
          return fetchCountIncrementally(
            accessToken,
            query,
            labelIds,
            // onPartialUpdate callback: we get "messagesInThisPage"
            (increment) => {
              // increment the appropriate field
              setCounts((prev) => ({
                ...prev,
                [field]: prev[field] + increment,
              }));
            }
          );
        });

        await Promise.all(promises);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error(String(err)));
        }
      } finally {
        setIsLoading(false);
      }
    },
    [accessToken]
  );

  return {
    counts,
    isLoading,
    error,
    fetchCounts,
  };
}
