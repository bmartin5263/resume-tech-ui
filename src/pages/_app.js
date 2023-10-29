import App from "next/app"
import Layout from '../components/layout';
import ThemeContext from '../components/themeContext';
import useLog from '../hooks/useLog';
import '../../styles/globals.scss'
import { useEffect, useState } from "react";
import { SessionProvider, getSession } from "next-auth/react"
import RefreshTokenHandler from '../util/refreshTokenHandler';

const log = useLog("App");

export default function ResumeTechApp({ Component, theme, pageProps: { session, ...pageProps } }) {  
  const [darkMode, setDarkMode] = useState(theme == "dark");
  const [interval, setInterval] = useState(0);
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    const body = document.querySelector("body");
    if (darkMode && !body.classList.contains("dark")) {
      body.classList.add("dark");
      document.cookie = 'Theme=dark; expires=Sun, 1 Jan 2024 00:00:00 UTC; path=/'
    }
    else if (!darkMode && body.classList.contains("dark")) {
      body.classList.remove("dark");
      document.cookie = 'Theme=light; expires=Sun, 1 Jan 2024 00:00:00 UTC; path=/'
    }
  }, [darkMode]);
  
  return (
    <SessionProvider session={session} refetchInterval={interval}>
      <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
        <Layout>
          <Component {...pageProps} />
          <RefreshTokenHandler setInterval={setInterval} />
        </Layout>
      </ThemeContext.Provider>
    </SessionProvider>
  )
};

ResumeTechApp.getInitialProps = async (context) => {
  const appProps = await App.getInitialProps(context)
  const session = await getSession(context)
  let theme = context?.ctx?.req?.cookies["Theme"];

  if (theme == undefined || theme == null) {
    theme = 'dark';
  }

  return {
    ...appProps,
    session,
    theme: theme
  };
}
