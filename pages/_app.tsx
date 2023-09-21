import AppLayout from "@/src/layout/appLayout";
import { store } from "@/src/redux/store";
import "@/styles/globals.css";
import { ConfigProvider } from "antd";
import type { AppProps } from "next/app";
import { NextRouter, useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Provider } from "react-redux";
import { Socket, io } from "socket.io-client";
import { getCookie } from "cookies-next";

export default function App({ Component, pageProps }: AppProps) {
  const router: NextRouter = useRouter();
  const accessToken = getCookie("mycook");
  const [isLoggedIn, setLoggedIn] = useState(false);
  const socketRef = useRef<Socket>();
  const protectedRoutes = ["/user", "/vessel"];

  // socket will be in global
  useEffect(() => {
    if (router.asPath.includes("/auth/redirect")) return;
    if (accessToken) {
      const isProtectedRoute = protectedRoutes.includes(router.asPath);
      setLoggedIn(!!accessToken);
      if (!isProtectedRoute) {
        router.push("/user");
      }
    } else {
      setLoggedIn(!!accessToken);
      router.push("/auth");
    }
  }, [router.asPath]);

  useEffect(() => {
    if (isLoggedIn) {
      const socket = io("http://localhost:8001");
      socket.on("users", (data) => {
        console.log(data);
      });
      socketRef.current = socket;
    }
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [isLoggedIn]);

  return (
    <Provider store={store}>
      <ConfigProvider>
        {isLoggedIn ? (
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        ) : protectedRoutes.includes(router.asPath) ? (
          "Loading"
        ) : (
          <Component {...pageProps} />
        )}
      </ConfigProvider>
    </Provider>
  );
}
