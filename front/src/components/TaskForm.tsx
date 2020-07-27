import React, { useState, useContext } from "react";
import AppContext from "../contexts/AppContext";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";

const TaskForm: React.FC = () => {
  const { dispatch } = useContext(AppContext);
  const [detail, setDetail] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ detail: detail }),
  };

  const handlePressEnterKey = (e: React.KeyboardEvent) => {
    const ENTER_KEY_CODE = 13;
    if (e.keyCode === ENTER_KEY_CODE && detail !== "") {
      const postTodo = async () => {
        setLoading(true);
        try {
          const response = await fetch(
            "http://localhost:1323/api/todos",
            requestOptions
          );
          // await を使う場合は、↓↓このように記述する（.then(data)のように取得できない）
          const data = await response.json();
          dispatch({ type: "ADD_TODO", task: data });
          setLoading(false);
        } catch (e) {
          setLoading(false);
          setError(e.message);
        }
      };
      postTodo();
      setDetail("");
    }
  };

  // 非同期処理の間に表示する
  const postMessage = (isLoading: boolean, error: string) => {
    if (isLoading) {
      return <p>登録中...</p>;
    }
    if (error) {
      return <p>登録エラーが発生しました</p>;
    }
  };

  return (
    <Box pt={2}>
      <TextField
        id="task-form"
        fullWidth
        label="Todoを入力"
        variant="outlined"
        value={detail}
        onChange={(e) => setDetail(e.target.value)}
        onKeyDown={handlePressEnterKey}
      />
      {postMessage(isLoading, error)}
    </Box>
  );
};

export default TaskForm;
