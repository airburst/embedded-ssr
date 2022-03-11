import type { NextPage, GetServerSideProps } from 'next';
import { auth, AuthProps, getRfqs, RfqProps } from './api';
import Head from 'next/head';
import Loader from '../components/Loader';
import styles from '../styles/Home.module.css';

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  console.log('🚀 ~ constgetServerSideProps', query); // FIXME:
  // Auth with Cognito
  const authData: AuthProps = await auth();
  const { error, access_token } = authData;
  if (error || !access_token) {
    return { props: { data: authData } };
  }
  // We have a token: fetch RFQs
  const rfqData: RfqProps = await getRfqs(access_token, query);
  return { props: { data: { ...rfqData, loading: false } } };
};

type Props = {
  data: AuthProps & RfqProps & { loading: boolean };
};

const Home: NextPage<Props> = ({ data }) => {
  console.log('🚀 ~ file: quotes.tsx ~ line 27 ~ data', data); // FIXME:
  const { error, message, reference, rfq_url, loading = true } = data;

  if (loading) {
    return (
      <div className={styles.container}>
        <Loader message="Creating proposal..." />
      </div>
    );
  }

  if (error || message) {
    return (
      <div className={styles.container}>
        <div className="error">Error: {error || message}</div>
      </div>
    );
  }

  const title = reference
    ? `Your Reference is: ${reference}`
    : 'Creating your proposal...';

  return (
    <div className={styles.container}>
      <Head>
        <title>RFQ</title>
        <meta name="description" content="Create an RFQ" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>{title}</h1>
        {rfq_url && <h4>Link: {rfq_url}</h4>}
      </main>
    </div>
  );
};

export default Home;
