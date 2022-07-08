import Layout from '../containers/Layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <Layout title={pageProps.title}>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
