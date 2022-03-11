import type { NextPage, GetServerSideProps } from 'next';
import { auth, AuthProps, getRfqs, RfqProps } from './api';
import Head from 'next/head';
import { Text, Button } from '@simplybusiness/mobius-core';
import Quote from '../components/Quote';
import styles from '../styles/Home.module.css';

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  // Auth with Cognito
  const authData: AuthProps = await auth();
  const { error, access_token } = authData;
  if (error || !access_token) {
    return { props: { data: authData } };
  }
  // We have a token: fetch RFQs
  const rfqData: RfqProps = await getRfqs(access_token, query);
  return { props: { data: rfqData } };
};

const transformQuotes = (response: any) => ({
  reference: response.quotes?.[0].reference,
  price: response.quotes?.[0].decision?.premiums?.gross,
  insurer: response.quotes?.[0].insurer_responses?.[0].insurer,
  covers: response.quotes?.[0].insurer_responses?.[0].covers
    ?.filter((c: any) => c.premiums?.gross?.amount > 0)
    .map((cover: any) => ({
      name: cover.name,
      price: cover.premiums?.gross,
    })),
});

type Props = {
  data: AuthProps & RfqProps;
};

const Home: NextPage<Props> = ({ data }) => {
  console.log('🚀 ~ quotes.tsx ~ data', data);

  const { error, message } = data;

  if (error || message) {
    return (
      <div className={styles.container}>
        <div className="error">Error: {error || message}</div>
      </div>
    );
  }

  const quote = transformQuotes(data);

  return (
    <div className={styles.container}>
      <Head>
        <title>Quotes</title>
        <meta name="description" content="Quotes for cover" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Text variant="h1">Your quote</Text>
      <Quote {...quote} />

      <Button>Buy</Button>
    </div>
  );
};

export default Home;
