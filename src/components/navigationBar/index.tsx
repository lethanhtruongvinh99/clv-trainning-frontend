import classnames from "classnames";

import { Button, Menu, MenuProps } from "antd";
import { NextRouter, useRouter } from "next/router";
import styles from "./style.module.css";
import { LogoutOutlined, TableOutlined, UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getInitialTab, leftSideMenuArray } from "./handle";
type MenuItem = Required<MenuProps>["items"][number];

import { deleteCookie } from "cookies-next";

interface IProps {
  className?: string;
}
const NavigationBar = (props: IProps) => {
  const router: NextRouter = useRouter();

  const [tab, setTab] = useState<string[]>(["1"]);

  const onChangeTab = (tab: any) => {
    setTab(tab.selectedKeys);
    router.replace( leftSideMenuArray[+tab.key - 1].path)
  };
  const onSignOut = () => {
    window.localStorage.clear();
    deleteCookie('mycook')
    router.push("/auth");
  };
  function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[],
  ): MenuItem {
    return {
      label,
      key,
      icon,
      children,
    } as MenuItem;
  }

  const items: MenuItem[] = [
    getItem("User Management", "1", <UserOutlined /> ),
    getItem("Vessel Management", "2", <TableOutlined />),
  ];

  useEffect(() => {
    const initTab = getInitialTab(router.pathname);
    setTab(initTab);
  }, [router.pathname]);
  return (
    <div className={classnames(styles.navigationBar, props.className)}>
      <div>Some logo</div>
      <Menu
        className={styles.menu}
        items={items}
        selectedKeys={tab}
        onSelect={onChangeTab}
      />
      <Button
        className={styles.signOutBtn}
        type="text"
        danger
        icon={<LogoutOutlined />}
        onClick={onSignOut}
      >
        Sign out
      </Button>
    </div>
  );
};
export default NavigationBar;
