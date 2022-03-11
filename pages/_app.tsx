import { useState } from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  const [formData, setFormData] = useState({});

  return (
    <Component {...pageProps} formData={formData} setFormData={setFormData} />
  );
}

export default MyApp;
