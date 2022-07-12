import { SessionProvider, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Layout from '../containers/Layout';
import '../styles/globals.css';
import { StoreProvider } from '../utils/redux/Store';

function MyApp({ Component, pageProps: { session, title, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <StoreProvider>
        <Layout title={title}>
          {Component.auth ? (
            <Auth>
              <Component {...pageProps} />
            </Auth>
          ) : (
            <Component {...pageProps} />
          )}
        </Layout>
      </StoreProvider>
    </SessionProvider>
  );
}

export default MyApp;

function Auth({ children }) {
  const router = useRouter();
  const { pathname } = router;
  const { status } = useSession({
    required: true,
    onUnauthenticated: () => {
      router.push({
        pathname: '/unauthorized',
        query: {
          message: 'Login required',
          redirect: pathname ?? '/',
        },
      });
    },
  });

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return children;
}
