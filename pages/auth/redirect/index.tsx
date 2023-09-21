import { NextRouter, useRouter } from 'next/router';
import React, { useEffect} from 'react';
import { setCookie } from 'cookies-next';

interface IProps {

}

const Redirect = (props: IProps) => {
  const router: NextRouter = useRouter();

  useEffect(() => {
    const accessTokenFromUrl = router.query?.access_token;
    if (accessTokenFromUrl) {
      window.localStorage.setItem('access_token', accessTokenFromUrl.toString());
      setCookie('mycook', accessTokenFromUrl.toString());
      router.push('/auth')
    }
  }, [router.isReady])

  return (
    <>Loading</>
  )
}

export default Redirect;