import { useState, useCallback } from 'react';
import { signupUser } from '../api/auth';

export function useSignup() {
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);
  const [data, setData]       = useState(null);

  const signup = useCallback(async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const response = await signupUser(payload);
      setData(response);
      return response;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { signup, loading, error, data };
}