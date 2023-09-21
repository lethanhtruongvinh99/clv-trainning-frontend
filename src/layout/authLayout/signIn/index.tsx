import classnames from "classnames";
import { useState } from "react";

import { HttpCaller } from "@/src/util/httpCaller";
import { GoogleOutlined } from "@ant-design/icons";
import { Button, Divider, Form, Input, notification } from "antd";
import { NextRouter, useRouter } from "next/router";
import styles from "./style.module.css";
import { setCookie } from "cookies-next";

interface IProps {
  className?: string;

  toggleForm: () => void;
}

interface IState {
  loading: boolean;
}

const SignInForm = (props: IProps) => {
  const router: NextRouter = useRouter();

  const [state, setState] = useState<IState>({
    loading: false,
  });

  const onSubmit = async (values: any) => {
    try {
      const result = await HttpCaller('http://localhost:3000/auth/login', 'POST', values);
      if (result.isSuccess) {
        window.localStorage.setItem("access_token", result.data.access_token);
        setCookie('mycook',result.data.access_token)
        router.push("/user");
      } else {
        notification.error({
          title: "Something went wrong~",
          description: result.error,
        });
      }
    } catch (error) {
      console.log(error)
    } finally {
      setState({ ...state, loading: false });
    }
  };

  const onGoogleSignIn = async () => {
    try {
      window.open('http://localhost:3000/auth/google',  "_self")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={classnames(styles.signInForm, props.className)}>
      <h2>Login</h2>
      <Form name="login" layout="vertical" onFinish={onSubmit}>
        <Form.Item label="Email" name="email" rules={[{ required: true }]}>
          <Input placeholder="Input your email" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true }]}
        >
          <Input.Password placeholder="Input your password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className={styles.btn} loading={state.loading}>
            Login
          </Button>
        </Form.Item>
      </Form>
      <div className={styles.socialSignIn}>
        <h4>Or Sign In Using</h4>
        <Button danger shape="circle" icon={<GoogleOutlined />} onClick={onGoogleSignIn} />
      </div>
      <Divider />
      <div className={styles.socialSignIn}>
        <h4>Or Sign Up Using</h4>
        <Button type="text" onClick={props.toggleForm}>
          SIGN UP
        </Button>
      </div>
    </div>
  );
};

export default SignInForm;
