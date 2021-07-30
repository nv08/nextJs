
import '../styles/globals.css'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css' 

import Layout from "../components/Layout";

toast.configure()
function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
