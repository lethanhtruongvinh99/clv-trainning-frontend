import classnames from "classnames";
import { useEffect, useState } from "react";

import { IUser } from "@/src/model/user";
import { Button, Input, Table, notification } from "antd";
import type { ColumnsType } from "antd/es/table";
import { NextRouter, useRouter } from "next/router";
import { Socket } from "socket.io-client";
import styles from "./style.module.css";
import { getAccessToken } from "@/src/util/localStorage";
import UserModal from "@/src/components/modals/userModal";
import { SearchOutlined, UserAddOutlined } from "@ant-design/icons";

import { getCookie } from "cookies-next";
import { HttpCaller } from "@/src/util/httpCaller";

interface IProps {
  className?: string;
}

interface IState {
  isLoading: boolean;
  users: IUser[];
  userModalOpen: boolean;
  edittingUser: any;
}

interface ISearchState {
  user_id?: string;
  office_code?: string;
}

const UserManagement = (props: IProps) => {
  const router: NextRouter = useRouter();
  const [state, setState] = useState<IState>({
    isLoading: false,
    users: [],
    userModalOpen: false,
    edittingUser: {},
  });
  const [socket, setSocket] = useState<Socket>();

  const [search, setSearch] = useState<ISearchState>({
    user_id: "",
    office_code: "",
  });

  const fetchUser = async (search: ISearchState) => {
    setState({ ...state, isLoading: true });
    try {
      const response = await HttpCaller(
        `http://localhost:3000/users?office_code=${search.office_code}&id=${search.user_id}`,
        "GET",
        {}
      );
      if (response.isSuccess) {
        setState({ ...state, users: response.data, isLoading: false });
      } else {
        setState({ ...state, users: [], isLoading: false });
      }
    } catch (error) {
      console.log(error)
      setState({ ...state, users: [], isLoading: false });
    }
  };

  const toggleUserModal = () => {
    setState({ ...state, userModalOpen: !state.userModalOpen });
  };

  const onEditUser = (user: any) => {
    setState({ ...state, edittingUser: user, userModalOpen: true });
  };

  const onChangeSearch = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  const onAddNewUser = (action: string, data: any) => {
    if (action === "ADD") {
      setState({
        ...state,
        users: [...state.users, data],
        userModalOpen: !state.userModalOpen,
      });
      notification.success({
        placement: "bottomLeft",
        description: "Create user successfully",
      });
    } else {
      const targetUserIdx = state.users.findIndex(
        (user: any) => user.id === data.id
      );
      const clonedArray = [...state.users];
      clonedArray[targetUserIdx] = data;
      setState({
        ...state,
        users: clonedArray,
        userModalOpen: !state.userModalOpen,
      });
      notification.success({
        placement: "bottomLeft",
        description: "Edit user successfully",
      });
    }
  };

  const onSearch = () => {
    fetchUser(search);
    // setSearch({
    //   user_id: "",
    //   office_code: "",
    // });
  };

  useEffect(() => {
    fetchUser(search);
  }, [router.asPath]);

  // Header includes toolbox: search, create new.
  // create new --> open modal --> create new user
  // Body is a list of users, each row has 2 stage: view and edit.
  const clearEdittingUser = () => {
    setState({
      ...state,
      edittingUser: {},
      userModalOpen: !state.userModalOpen,
    });
  };
  const columns: ColumnsType<any> = [
    {
      title: "Userid",
      dataIndex: "id",
      key: "index",
    },
    {
      title: "First name",
      dataIndex: "first_name",
      key: "index",
    },
    {
      title: "Last name",
      dataIndex: "last_name",
      key: "index",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "index",
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "index",
      render: (row, record) => {
        return <Button onClick={() => onEditUser(record)}>Edit</Button>;
      },
    },
  ];
  return (
    <div className={classnames(styles.userManagement, props.className)}>
      <div className={styles.userManagementHeader}>
        <div className={styles.searchZone}>
          <Input
            name="user_id"
            placeholder="Search by User Id"
            onChange={onChangeSearch}
            value={search.user_id}
          />
          <Input
            name="office_code"
            placeholder="Search by Office code"
            onChange={onChangeSearch}
            value={search.office_code}
          />
          <Button onClick={onSearch} type="primary" icon={<SearchOutlined />}>
            Search
          </Button>
        </div>
        <div className={styles.actionZone}>
          <Button
            onClick={toggleUserModal}
            type="primary"
            icon={<UserAddOutlined />}
          >
            Create new
          </Button>
        </div>
      </div>
      <div className={styles.userManagementBody}>
        {state.isLoading ? (
          <div>Loading...</div>
        ) : (
          <Table
            columns={columns}
            dataSource={state.users}
            pagination={{ pageSize: 5 }}
          />
        )}
      </div>
      <UserModal
        open={state.userModalOpen}
        user={state.edittingUser}
        onClose={clearEdittingUser}
        toggleModal={toggleUserModal}
        onAddUser={onAddNewUser}
      />
    </div>
  );
};
export default UserManagement;
