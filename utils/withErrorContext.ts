import { useError } from "@/context/ErrorContext";

/**
 * useApiWithErrorContext
 *
 * Returns a function that wraps an async API call and automatically sets errors in the global error context.
 * Usage:
 *   const apiWithError = useApiWithErrorContext();
 *   const fetchData = () => apiWithError(() => getProducts());
 */
export function useApiWithErrorContext() {
  const { setError } = useError();

  return async function <T>(fn: () => Promise<T>): Promise<T | undefined> {
    try {
      return await fn();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      return undefined;
    }
  };
}
