import React, { useState, useEffect } from "react";
import { useFontSize } from "../context/FontSizeContext";
import "./Todo.css";
import axios from "axios";
import Weather from "../components/Weather";

interface TodoProps {
  setUserPoints: (points: number) => void;
  userPoints: number;
}

const Todo: React.FC<TodoProps> = ({ setUserPoints, userPoints }) => {
  const { fontSize, setFontSize } = useFontSize();
  const [tasks, setTasks] = useState<{ id: number; text: string; completed: boolean }[]>([]);
  const [randomTask, setRandomTask] = useState<string>("");
  const [showCompleted, setShowCompleted] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [points, setPoints] = useState<number>(0);
  const [todos, setTodos] = useState<{ comment: string; completed: boolean; point_value: number }[]>([]);
  const [newTodo, setNewTodo] = useState("");

  const userId = 1; // 仮のユーザーID

  const predefinedTasks = [
    "皿洗いをしよう", "散歩しよう", "トイレ掃除", "部屋の片付け", "買い物", "ゴミ出し",
    "コーヒーで一息", "水を飲む", "洗濯物を干す", "洗濯物をたたむ", "お花に水を上げる", "ドラマを見る",
    "電話をする", "歯磨き", "お風呂掃除", "クローゼットの整理", "日光を浴びる", "洗面台の掃除",
    "音楽を聴く", "短歌を読む", "本を読む"
  ];

  useEffect(() => {
    setRandomTask(predefinedTasks[Math.floor(Math.random() * predefinedTasks.length)]);
    const lastCompletedDate = localStorage.getItem("lastCompletedDate");
    const savedPoints = localStorage.getItem("points");
    const today = new Date().toDateString();

    if (savedPoints) {
      setPoints(Number(savedPoints));
    }

    if (lastCompletedDate !== today) {
      localStorage.setItem("lastCompletedDate", "");
    }

    fetchUserPoints();
  }, [userId]);

  const addTask = () => {
    if (randomTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: randomTask, completed: false }]);
      setRandomTask(predefinedTasks[Math.floor(Math.random() * predefinedTasks.length)]);
    }
  };

  const toggleTaskCompletion = (id: number) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));

    const today = new Date().toDateString();
    const lastCompletedDate = localStorage.getItem("lastCompletedDate");

    if (lastCompletedDate !== today) {
      const newPoints = points + 1;
      setPoints(newPoints);
      localStorage.setItem("points", newPoints.toString());
      localStorage.setItem("lastCompletedDate", today);
    }
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { comment: newTodo, completed: false, point_value: 10 }]);
      setNewTodo("");
    }
  };

  const toggleState = async (index: number) => {
    const updatedTodos = todos.map((todo, i) =>
        i === index ? { ...todo, completed: true } : todo
    );

    setTodos(updatedTodos);

    try {
      await axios.post("http://localhost:3001/todos/complete", { userId, todoId: index + 1 });
      await fetchUserPoints();
    } catch (error) {
      console.error("タスク完了エラー:", error);
    }
  };

  const fetchUserPoints = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/todos/user-points/${userId}`);
      setUserPoints(response.data.points);
    } catch (error) {
      console.error("ユーザーのポイント取得エラー:", error);
    }
  };

  return (
      <div className="todo" style={{ fontSize: `${fontSize}px` }}>
        <h1>TODOリスト</h1>
        <h2>ユーザーのポイント: {userPoints} ポイント</h2>
        <div className="home">
          <div className="settings-button" onClick={() => setShowSettings(!showSettings)}>
            &#9776;
          </div>
          <Weather />
          {showSettings && (
              <div className="settings-frame">
                <div className="settings-content">
                  <h2>設定画面</h2>
                  <div className="setting-section">
                    <label>文字の大きさ：</label>
                    <input
                        type="range"
                        min={12}
                        max={36}
                        value={fontSize}
                        onChange={(e) => setFontSize(Number(e.target.value))}
                    />
                    <span>{fontSize}px</span>
                  </div>
                  <button onClick={() => setShowSettings(false)} className="close-button">閉じる</button>
                </div>
              </div>
          )}
          <div className="targetTask">
            <div className="todayTargetTask">今日のタスク</div>
            <div className="task-container">
              <p className="todayRandomTask">{randomTask}</p>
              <button onClick={addTask}>タスク追加</button>
            </div>
          </div>
          <div className="todo">
            <table>
              <thead>
              <tr>
                <th>タスク</th>
                <th>完了</th>
                <th>削除</th>
              </tr>
              </thead>
              <tbody>
              {tasks.filter(task => !task.completed).map(task => (
                  <tr key={task.id}>
                    <td>{task.text}</td>
                    <td>
                      <button onClick={() => toggleTaskCompletion(task.id)}>完了</button>
                    </td>
                    <td>
                      <button onClick={() => deleteTask(task.id)} className="delete">削除</button>
                    </td>
                  </tr>
              ))}
              </tbody>
            </table>
            <button onClick={() => setShowCompleted(!showCompleted)}>
              {showCompleted ? "完了タスクを非表示" : "完了タスクを表示"}
            </button>
            {showCompleted && (
                <table>
                  <thead>
                  <tr>
                    <th>完了したタスク</th>
                    <th>削除</th>
                  </tr>
                  </thead>
                  <tbody>
                  {tasks.filter(task => task.completed).map(task => (
                      <tr key={task.id}>
                        <td>{task.text}</td>
                        <td>
                          <button onClick={() => deleteTask(task.id)} className="delete">削除</button>
                        </td>
                      </tr>
                  ))}
                  </tbody>
                </table>
            )}
          </div>
          <div className="points-display">
            <h2>ポイント: {points}</h2>
          </div>
        </div>
      </div>
  );
};

export default Todo;
