import { useEffect, useState } from "react";

import { publicApi } from "../services/api";

export function usePortfolioData() {
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadPortfolio() {
      try {
        setLoading(true);
        const data = await publicApi.getPortfolio();
        if (isMounted) {
          setPortfolio(data);
          setError("");
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err.response?.data?.message ||
              "Unable to load portfolio data right now."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadPortfolio();
    return () => {
      isMounted = false;
    };
  }, []);

  return { portfolio, loading, error };
}
