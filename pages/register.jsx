import Register from '../components/Register';

function RegisterPage() {
  return <Register />;
}

export default RegisterPage;

export const getStaticProps = async () => {
  return {
    props: {
      title: 'Creat acccount',
    },
  };
};
