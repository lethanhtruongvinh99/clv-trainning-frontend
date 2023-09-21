import React, { useState } from "react";
import classnames from "classnames";

import styles from "./style.module.css";
import { IUser } from "@/src/model/user";

interface IProps {
  className?: string;
  user: IUser;
}

interface IState {
  isEditting: boolean;
  edittingUser: IUser | {};
}
const UserRow = (props: IProps) => {
  const [state, setState] = useState<IState>({
    isEditting: false,
    edittingUser: {},
  });

  const toggleButton = () => {
    // if clilck Edit
    // change View to Edit (input and select)
    // set current state from props.user
    if (!state.isEditting) {
      setState({...state, isEditting: !state.isEditting, edittingUser: props.user});
    } else {
      // update to list
      setState({ ...state, isEditting: !state.isEditting, edittingUser: {} });
    }
  }

  const onChange = e => {
    setState({...state, edittingUser: {...state.edittingUser, [e.target.name]: e.target.value}});
  }
  return (
    <div className={classnames(styles.userRow, props.className)}>
      {state.isEditting ? (
        <div className={styles.infoZone}>
          <div>{props.user.id}</div>
          <input name="first_name" value={state.edittingUser.first_name} onChange={onChange} />
          <input name="last_name" value={state.edittingUser.last_name} onChange={onChange}/>
          <div>{props.user.email}</div>
        </div>
      ) : (
        <div className={styles.infoZone}>
          <div>{props.user.id}</div>
          <div>{props.user.first_name}</div>
          <div>{props.user.last_name}</div>
          <div>{props.user.email}</div>
        </div>
      )}

      <div className={styles.actionZone}>
        {state.isEditting ? (
          <button onClick={toggleButton}>Save</button>
        ) : (
          <button onClick={toggleButton}>Edit</button>
        )}
      </div>
    </div>
  );
};

export default React.memo(UserRow);
