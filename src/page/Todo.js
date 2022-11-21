import { useState, useEffect } from "react";
import axios from "axios";
import "./todo.scss";
// import { Container } from "react-bootstrap";

// 圖檔
import img3 from "../img/計票登入頁面-01.jpg";

import img4 from "../img/計票登入頁面-05.jpg";

import img5 from "../img/計票登入頁面-06.jpg";



function Todo() {
  const [inputValue, setInputValue] = useState("");

  const [todos, setTodos] = useState([]);

  const [inputChange, setInputChange] = useState("");

  const [success, setSuccess] = useState();

  const [dd, setDd] = useState();

  useEffect(() => {
    let getTodo = async () => {
      try {
        let res = await axios.get("http://localhost:3001/api/todo");
        setTodos(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getTodo();
  }, [success, dd]);

  const addTodo = (id) => {
    const newTodo = {
      id: Number(new Date()),
      text: inputValue,
      change: false,
    };
    const newTodos = [newTodo, ...todos];
    setTodos(newTodos);
    setInputValue("");

    async function goTodo(e) {
      try {
        let res = await axios.post(
          "http://localhost:3001/api/todo/insert",
          newTodos[0]
        );

        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    goTodo();
  };

  // 用在某個id項目，切換change屬性true/false
  const toggleTodoEditing = (id) => {
    const newTodos = todos.map((v, i) => {
      if (v.id === id) return { ...v, change: !v.change };
      //這裡要設定其它項目 change:false，同時間只有一個被編輯
      return { ...v, change: false };
    });

    setTodos(newTodos);
  };

  // 用在某個id項目改變為某值用，儲存新的值用
  const updateTodo = (id, objectValue) => {
    const newTodos = todos.map((v, i) => {
      if (v.id === id) return { ...v, ...objectValue };
      console.log("objectValue", v);
      return { ...v };
    });

    setTodos(newTodos);
    console.log("id", id);
    async function upTodo(e) {
      try {
        let res = await axios.patch("http://localhost:3001/api/change", id);
        console.log(res.data);
        setSuccess(false);
      } catch (err) {
        console.log(err);
      }
    }
    upTodo();
  };

  const deleteTodo = (id) => {
    const newTodos = todos.filter((v, i) => {
      return v.id !== id;
    });
    console.log("id", id);
    setTodos(newTodos);
    async function dd(e) {
      try {
        let res = await axios.delete(`http://localhost:3001/api/delete`, {
          data: id,
        });
        console.log("編輯", res.data);
        setDd(false);
      } catch (err) {
        console.log(err);
      }
    }
    dd();
  };

  return (
    <div>
      {/* <img
        className="img img-fluid"
        src={require(`../img/計票登入頁面-01.jpg`)}
        alt={img3}
      /> */}
         {/* <img
        className="img img-fluid"
        src={require(`../img/計票登入頁面-05.jpg`)}
        alt={img4}
      /> */}
           {/* <img
        className="img img-fluid"
        src={require(`../img/計票登入頁面-06.jpg`)}
        alt={img5}
      /> */}
      <h1 className="mt-5">Todo待辨事項</h1>
      <input
        type="text"
        value={inputValue}
        className="a"
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
      />
      <button onClick={addTodo}>增加</button>
      <ul>
        {todos.map((v, i) => {
          return (
            <>
              <div key={v.id} className="del">
                {v.change ? (
                  <input
                    type="text"
                    value={inputChange}
                    placeholder="輸入內容"
                    className="a"
                    onChange={(e) => {
                      setInputChange(e.target.value);
                    }}
                  />
                ) : (
                  <li className="a" key={v.id}>
                    {v.text}
                  </li>
                )}
                {v.change ? (
                  <button
                    onClick={(e) => {
                      toggleTodoEditing(v.id);
                      updateTodo({
                        id: v.id,
                        text: inputChange,
                        change: false,
                      });
                      setSuccess(true);
                    }}
                  >
                    確定
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      toggleTodoEditing(v.id);
                      setInputChange(v.text);
                    }}
                  >
                    修改
                  </button>
                )}

                <button
                  onClick={() => {
                    deleteTodo({ id: v.id });
                    setDd(true)
                  }}
                >
                  刪除
                </button>
              </div>
            </>
          );
        })}
      </ul>
    </div>
  );
}

export default Todo;
