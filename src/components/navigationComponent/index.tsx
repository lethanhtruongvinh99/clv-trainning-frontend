import { NextRouter, useRouter } from 'next/router';
import React from 'react';

interface IProps {
  isLoggedIn: boolean
}
const NavigationComponent = (props: IProps) => {
  const router: NextRouter = useRouter();
  if (!props.isLoggedIn) {
    router.push('/auth')
  }
  return (
    <></>
  )
}
export default NavigationComponent