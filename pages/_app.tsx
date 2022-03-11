import { useState } from 'react';
import { SSRProvider } from '@react-aria/ssr';
import '../styles/globals.css';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  const [formData, setFormData] = useState({});

  return (
    <SSRProvider>
      <Component {...pageProps} formData={formData} setFormData={setFormData} />
    </SSRProvider>
  );
}

export default MyApp;
