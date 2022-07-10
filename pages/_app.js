import { SessionProvider } from 'next-auth/react';
import Layout from '../containers/Layout';
import '../styles/globals.css';
import { StoreProvider } from '../utils/redux/Store';

function MyApp({ Component, pageProps: { session, title, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <StoreProvider>
        <Layout title={title}>
          <Component {...pageProps} />
        </Layout>
      </StoreProvider>
    </SessionProvider>
  );
}

export default MyApp;
