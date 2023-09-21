import { isEmpty } from "@/src/util";
import { getAccessToken } from "@/src/util/localStorage";
import { Button, Form, Input, Modal, Select, notification } from "antd";
import { useEffect, useState } from "react";

interface IProps {
  className?: string;

  open?: boolean;

  user?: any;

  onClose: () => void;

  toggleModal: () => void;

  onAddUser: (action: string, data: any) => void;
}

const UserModal = (props: IProps) => {
  const [form] = Form.useForm();
  const [state, setState] = useState({});

  const onClose = () => {
    // props.clearEdittingUser();
    props.onClose();
  };

  const onCreateNewUser = async (values: any) => {
    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          roles: values.roles
            ? values.roles.map((role: any) => ({ id: role }))
            : [],
        }),
      });
      if (response.ok) {
        const result = await response.json();
        props.onAddUser("ADD", result);
        form.resetFields();
      } else {
        notification.error({
          description: "Something went wrong!",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onUpdateUser = async (id = props.user.id, values: any) => {
    try {
      const response = await fetch(`http://localhost:3000/users/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          id: id,
          roles: values.roles
            ? values.roles.map((role: any) => ({ id: role }))
            : [],
        }),
      });
      if (response.ok) {
        const result = await response.json();
        props.onAddUser("UPDATE", result);
        form.resetFields();
      } else {
        notification.error({
          description: "Something went wrong!",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmit = async (values: any) => {
    if (isEmpty(props.user)) {
      onCreateNewUser(values);
    } else {
      onUpdateUser(props.user.id, values);
    }
  };

  const getRoles = async () => {
    const request = await fetch("http://localhost:3000/roles", {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    const result = await request.json();
    setState({
      ...state,
      roles: result.map((role: any) => ({ label: role.name, value: role.id })),
    });
  };

  useEffect(() => {
    if (props.open) {
      if (props.user) {
        form.setFieldsValue({
          email: props.user.email,
          first_name: props.user.first_name,
          last_name: props.user.last_name,
          roles: props.user.roles
            ? props.user.roles.map((role: any) => role.id)
            : [],
        });
      }
    } else {
      form.resetFields();
    }
  }, [props.open]);

  useEffect(() => {
    getRoles();
  }, []);
  return (
    <Modal
      open={props.open}
      title={!isEmpty(props.user) ? "Edit user" : "Create new user"}
      onCancel={onClose}
      footer={[]}
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={onSubmit}>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: "Please input email" }]}
        >
          <Input placeholder="Input..." disabled={!isEmpty(props.user)} />
        </Form.Item>
        <Form.Item
          name="first_name"
          label="First name"
          rules={[{ required: true, message: "Please input first name" }]}
        >
          <Input placeholder="Input..." />
        </Form.Item>
        <Form.Item
          name="last_name"
          label="Last name"
          rules={[{ required: true, message: "Please input last name" }]}
        >
          <Input placeholder="Input..." />
        </Form.Item>
        <Form.Item name="roles" label="Roles">
          <Select
            options={state?.roles}
            mode="multiple"
            placeholder="Select..."
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {!isEmpty(props.user) ? "Save" : "Create"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserModal;
