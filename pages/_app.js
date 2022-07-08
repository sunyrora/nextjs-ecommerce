import Layout from '../containers/Layout';
import '../styles/globals.css';
import { StoreProvider } from '../utils/redux/Store';

function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider>
      <Layout title={pageProps.title}>
        <Component {...pageProps} />
      </Layout>
    </StoreProvider>
  );
}

export default MyApp;
