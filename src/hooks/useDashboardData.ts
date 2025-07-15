import { useState, useEffect } from "react";

// Generic hook for dashboard data fetching
export function useDashboardData<T>(
  fetchFunction: () => Promise<T>,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await fetchFunction();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, dependencies);

  return { data, loading, error, refetch: () => fetchData() };
}

// Hook for real-time data updates
export function useRealTimeData<T>(
  fetchFunction: () => Promise<T>,
  interval: number = 30000 // 30 seconds default
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchFunction();
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching real-time data:', error);
      }
    };

    // Initial fetch
    fetchData();

    // Set up interval
    const intervalId = setInterval(fetchData, interval);

    return () => clearInterval(intervalId);
  }, [interval]);

  return { data, loading };
}