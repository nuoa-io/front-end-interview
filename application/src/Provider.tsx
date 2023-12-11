import { ReactNode } from "react";
import { Provider } from "use-http";

export default function ProviderWrapper({ children }: { children: ReactNode }) {
  return (
    <Provider
      url={import.meta.env.VITE_ENDPOINT_URL}
      options={{
        headers: {
          "Access-Control-Allow-Origin": "localhost",
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        },
      }}
    >
      {children}
    </Provider>
  );
}
