import React, { useState, useContext, useEffect } from "react";
import AppContext from "../contexts/AppContext";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { Task } from "../Types";

const TaskItem: React.FC<{ task: Task }> = ({ task }) => {
  const { dispatch } = useContext(AppContext);
  const [isDeleting, setDeleting] = useState(false);
  const [isDone, setDone] = useState(false);

  // const handleToggleCheckbox = (id: number) => {};

  const requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };

  // 警告が発生する
  // 破棄されたコンポーネントに対して更新処理をしようとして怒られています。
  // index.js:1 Warning: Can't perform a React state update on an unmounted component.
  // This is a no-op, but it indicates a memory leak in your application.
  // To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
  // const [isLoading, setLoading] = useState(false);
  // const [error, setError] = useState("");
  // const handleDeleteButton = (
  //   e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  // ) => {
  //   const deleteTodo = async () => {
  //     setLoading(true);
  //     try {
  //       await fetch(
  //         "http://localhost:1323/api/todos/" + task.id,
  //         requestOptions
  //       );
  //       dispatch({ type: "DELETE_TODO", id: task.id });
  //       setLoading(false);
  //     } catch (e) {
  //       setLoading(false);
  //       setError(e.message);
  //     }
  //   };
  //   deleteTodo();
  // };

  // メモリリークの警告にしたがって
  // useEffectを使ってクリーンアップ関数を追加
  // https://www.debuggr.io/react-update-unmounted-component/
  useEffect(() => {
    if (isDeleting) {
      fetch("http://localhost:1323/api/todos/" + task.id, requestOptions).then(
        () => {
          dispatch({ type: "DELETE_TODO", id: task.id });
        }
      );
    }
    // クリーンアップ関数：useEffect のコールバックから返されたクリーンアップ関数は、コンポーネントがアンマウントされるたびに呼ばれます。
    // https://www.hypertextcandy.com/react-tutorial-06-effect
    // 削除ボタンを押下すると、TaskItemコンポーネントがアンマウントされるので、その時にクリーンアップ関数が呼ばれる
    // （この場合だとクリーンアップは無くても良いが、一応追加）
    return () => {
      setDeleting(false);
    };
  }, [isDeleting, dispatch, requestOptions, task.id]); // [isDeleting]　だけで良いと思うが、他を追記しないと、React Hook useEffect has a missing dependencyの警告が出る

  const handleToggleCheckbox = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setDone(!isDone);
  };

  return (
    <>
      <ListItem role={undefined} dense button onClick={handleToggleCheckbox}>
        <ListItemIcon>
          <Checkbox edge="start" disableRipple checked={isDone} />
        </ListItemIcon>
        <ListItemText primary={task.detail} />
        <ListItemSecondaryAction>
          <IconButton
            edge="end"
            onClick={() => {
              setDeleting(true);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </>
  );
};

export default TaskItem;
