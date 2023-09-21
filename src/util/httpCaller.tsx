import { getCookie } from 'cookies-next';
import { isEmpty } from '.';

export const HttpCaller = async (URL: string, method: string, data: any) => {
  const accessToken = getCookie('mycook');
  const response = await fetch(URL, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      "Authorization": accessToken ? `Bearer ${accessToken || ""}` : '' ,
    },
    body: isEmpty(data) ? null : JSON.stringify(data),
  })
  if (response.ok) {
    return {
      isSuccess: true,
      data: await response.json()
    }
  } else {
    // window.localStorage.clear();
    // router.replace('/auth');
    return {
      isSuccess: false,
      error: await response.json()
    }
  }
}