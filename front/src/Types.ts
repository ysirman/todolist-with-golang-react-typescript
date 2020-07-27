export type Task = {
  id: number;
  detail: string;
};

// TypeScriptのconstアサーション as const
// を使って オブジェクトのプロパティをread-onlyにできる。
// 例）const nonwidening = { ONE, TWO, THREE } as const
// 解決する問題：JSのconstは再代入不可であり、いわゆる定数ではありません。
//             TypeScriptを使用しなくても、Object.freezeを使うと、freezeしたプロパティへの変更はできなくなります。が、面倒
// https://qiita.com/daishi/items/a413f8e2141cb7c7eec5
const roadTodo = (tasks: Task[]) =>
  ({
    type: "ROAD_TODO",
    tasks,
  } as const);
const addTodo = (task: Task) =>
  ({
    type: "ADD_TODO",
    task,
  } as const);
const deleteTodo = (id: number) =>
  ({
    type: "DELETE_TODO",
    id,
  } as const);

// roadTodo, addTodo, deleteTodo という関数の戻り値をタイプに指定する
export type Action =
  | ReturnType<typeof roadTodo>
  | ReturnType<typeof addTodo>
  | ReturnType<typeof deleteTodo>;

export type ContextType = {
  state: Task[];
  // dispatch は action を引数にとる 関数だが、戻り値はない（void）
  // （dispatchでの処理結果は、reducerによって state 経由で再レンダリングされる？？？？？？）
  dispatch: (action: Action) => void;
};

export type RoadTask = () => {
  tasks: Task[];
  roadTask: () => Promise<void>;
  isLoading: boolean;
  error: string;
};
