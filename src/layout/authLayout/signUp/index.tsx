import { Button, Form, Input, notification } from 'antd';
import classnames from 'classnames';
import styles from './style.module.css';
import { HttpCaller } from '@/src/util/httpCaller';

interface IProps {
  className?: string,

  toggleForm: () => void,
}
const SignUpForm = (props: IProps) => {
  const onSubmit = async (values: any) => {
    console.log(values);
    try {
      const result = await HttpCaller('http://localhost:3000/auth/signup', 'POST', values);
      if (result.isSuccess) {
        // router.push("/user");
        props.toggleForm()
      } else {
        notification.error({
          title: "Something went wrong~",
          description: result.error,
        });
      }
    } catch (error) {
      console.log(error)
    } finally {
      // setState({ ...state, loading: false });
    }
  }


  return (
    <div className={classnames(styles.signUpForm, props.className)}>
      <h2>Sign Up</h2>
      <Form name="login" layout="vertical" onFinish={onSubmit}>
        <Form.Item label="Email" name="email">
          <Input placeholder='Input your email' />
        </Form.Item>
        <Form.Item label="First name" name="first_name">
          <Input placeholder='Input your first name' />
        </Form.Item>
        <Form.Item label="Last name" name="last_name">
          <Input placeholder='Input your last name' />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input.Password placeholder='Input your password' />
        </Form.Item>
        <Form.Item label="Confirm password" name="confirmPassword">
          <Input.Password placeholder='Confirm your password' />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className={styles.btn}>
            Sign Up
          </Button>
        </Form.Item>
      </Form>
      <Button className={styles.btn} type='text' onClick={props.toggleForm}>Back to Sign in</Button>
    </div>
  )
}

export default SignUpForm