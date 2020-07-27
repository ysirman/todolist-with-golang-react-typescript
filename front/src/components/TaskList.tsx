import React, { useEffect } from "react";
import TaskItem from "./TaskItem";

import { useRoadTask } from "../hooks/tasks";

import List from "@material-ui/core/List";

const TaskList: React.FC = () => {
  const { tasks, roadTask, isLoading, error } = useRoadTask();
  useEffect(() => {
    roadTask();
  }, [roadTask]); // []だと警告が発生するので、警告にしたがって、引数を追加した。警告:React Hook useEffect has a missing dependency: 'roadTask'. Either include it or remove the dependency array  react-hooks/exhaustive-deps

  if (isLoading) {
    return <p>読み込み中...</p>;
  }
  if (error) {
    return <p>エラーが発生しました</p>;
  }

  return (
    <List>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </List>
  );
};

export default TaskList;
