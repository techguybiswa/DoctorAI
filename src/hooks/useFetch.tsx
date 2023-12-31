import { useState } from "react";
import { ApiResponse, HttpApiRequest, RequestType } from "../utils/constants";
type ApiHeaders = {
  [key: string]: string;
};
interface UseFetchProps {
  endpoint: string;
  headers?: ApiHeaders;
  body?: unknown;
  requestType: RequestType;
}
const useFetch = <T,>({
  endpoint,
  headers,
  body,
  requestType,
}: UseFetchProps): ApiResponse<T> => {
  const BASE_URL = import.meta.env.VITE_NECKTIE_BASE_URL;
  const url = BASE_URL + endpoint;
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const commonHeaders = {
    accept: "application/json",
    "x-api-key": import.meta.env.VITE_NECKTIE_API_KEY,
    "Content-Type": "application/json",
  };

  const request: HttpApiRequest = (): void => {
    setLoading(true);
    setError(null);
    fetch(url, {
      method: requestType,
      headers: { ...headers, ...commonHeaders },
      body: body ? JSON.stringify(body) : null,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(`${error.message}`);
        setLoading(false);
      });
  };

  return { request, data, loading, error };
};

export default useFetch;
