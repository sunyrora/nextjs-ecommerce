import Login from '../components/Login';

function LoginPage() {
  return <Login />;
}

export default LoginPage;

export const getStaticProps = async () => {
  return {
    props: {
      title: 'Login',
    },
  };
};
