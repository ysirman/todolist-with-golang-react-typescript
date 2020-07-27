import { useState, useContext, useCallback } from "react";
import AppContext from "../contexts/AppContext";
import { RoadTask } from "../Types";

export const useRoadTask: RoadTask = () => {
  const { state, dispatch } = useContext(AppContext);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // keyを設定しているコンポーネントを削除すると警告が発生する
  // index.js:1 Warning: Can't perform a React state update on an unmounted component.
  // This is a no-op, but it indicates a memory leak in your application.
  // To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
  const roadTask = useCallback(async () => {
    setLoading(true);
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    try {
      const response = await fetch(
        "http://localhost:1323/api/todos",
        requestOptions
      );
      const data = await response.json();
      dispatch({ type: "ROAD_TODO", tasks: data });
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setError(e.message);
    }
  }, [dispatch]);
  return { tasks: state, roadTask, isLoading, error };
};
