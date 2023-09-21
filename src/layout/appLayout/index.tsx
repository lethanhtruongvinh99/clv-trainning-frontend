import NavigationBar from "@/src/components/navigationBar";
import { NextRouter, useRouter } from "next/router";
import styles from './style.module.css';

interface IProps {
  children: any
}

const AppLayout = ({children} : IProps) => {
  const router: NextRouter = useRouter();
  return (
    <div className={styles.appLayout}>
      <NavigationBar />
      {children}
    </div>
  );
};

export default AppLayout
