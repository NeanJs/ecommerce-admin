import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import "sweetalert2/src/sweetalert2.scss";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer } from "react-toastify";
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <ToastContainer />
      <Component {...pageProps} />
    </SessionProvider>
  );
}
