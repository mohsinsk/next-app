// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-icons/font/bootstrap-icons.css'
// import '../styles/globals.css'

// import { useEffect, useState } from 'react'
// import RootLayout from '../components/layout/root-layout';

// function MyApp({ Component, pageProps }) {
//   useEffect(() => {
//     import('bootstrap');
//   }, []);

//   const getLayout = Component.getLayout || ((page) => <RootLayout> {page} </RootLayout>)

//   return getLayout(<Component {...pageProps} />)
// }

// export default MyApp


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '../styles/globals.css'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Head from 'next/head';
import Navigation from '../components/bs-nav/navigation';
import { userService } from '../services/user.service';

export default App;

function App({ Component, pageProps }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // run auth check on initial load
    authCheck(router.asPath);

    // set authorized to false to hide page content while changing routes
    const hideContent = () => setAuthorized(false);
    router.events.on('routeChangeStart', hideContent);

    // run auth check on route change
    router.events.on('routeChangeComplete', authCheck)

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off('routeChangeStart', hideContent);
      router.events.off('routeChangeComplete', authCheck);
    }
  }, []);

  function authCheck(url) {
    // redirect to login page if accessing a private page and not logged in 
    const publicPaths = ['/login'];
    const path = url.split('?')[0];
    if (!userService.userValue && !publicPaths.includes(path)) {
      setAuthorized(false);
      router.push({
        pathname: '/login',
        query: { returnUrl: router.asPath }
      });
    } else {
      setAuthorized(true);
    }
  }

  return (
    <>
      <Head>
        <title>JWT Authentication Example</title>
      </Head>

      <div className="app-container bg-light">
        <Navigation />
        <div className="container pt-4 pb-4">
          {authorized &&
            <Component {...pageProps} />
          }
        </div>
      </div>
    </>
  );
}
