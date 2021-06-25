import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/styles/app.scss";
import Head from "next/head";
import { Provider } from "next-auth/client";
import Progress from "../components/misc/Progress";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <Provider session={pageProps.session}>
        <Progress />
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default MyApp;
