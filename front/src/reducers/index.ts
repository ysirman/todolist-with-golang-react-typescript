import { Task, Action } from "../Types";

const task = (state: Task[] = [], action: Action) => {
  switch (action.type) {
    case "ROAD_TODO":
      return [...action.tasks];
    case "ADD_TODO":
      return [...state, action.task];
    case "DELETE_TODO":
      return state.filter((task) => task.id !== action.id);
    default:
      return state;
  }
};

export default task;
