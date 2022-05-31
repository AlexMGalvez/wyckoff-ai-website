import Head from "next/head";
import Script from "next/script";
import Layout from "../components/layout/Layout";
import "../styles/globals.css";

import { wrapper } from "../store/store";

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
      </Head>
      {/* <Script src="https://cdn.jsdelivr.net/npm/chart.js"></Script>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/luxon/2.4.0/luxon.min.js" integrity="sha512-v1zUTZ9zv9Wb2scL/ANxXM6m7yegm/W5SN8SRHNFADdZIuSFFkrEBjNxO803DdFkjoCcJ88g1WHRVlLN6K/O1A==" crossorigin="anonymous" referrerpolicy="no-referrer"></Script>
      <Script src="https://cdn.jsdelivr.net/npm/chartjs-adapter-luxon@0.2.1"></Script>
      
      <Script src="..//chartjs-chart-financial.js"></Script> */}
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default wrapper.withRedux(App);
