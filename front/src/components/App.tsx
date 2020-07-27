import React, { useReducer } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import AppContext from "../contexts/AppContext";
import reducer from "../reducers";
import { Task } from "../Types";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";

const initialState: Task[] = [
  // { id: 1, detail: "hogehoge" },
  // { id: 2, detail: "fugafuga" },
];

const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <CssBaseline />
      <Container maxWidth="sm">
        <TaskForm />
        <TaskList />
      </Container>
    </AppContext.Provider>
  );
};

export default App;
