import React from "react";
import { Paper, Divider, Button, List, Tabs, Tab } from "@mui/material";
import { AddField } from "./components/AddField";
import { Item } from "./components/Item";

function reducer(state, action) {
  if (action.type === "ADD_TASK") {
    return {
      ...state,
      tasks: [
        ...state.tasks,
        {
          id: Date.now() + 1,
          text: action.payload.text,
          completed: action.payload.checked,
        },
      ],
    };
  }

  if (action.type === "REMOVE_TASK") {
    return {
      ...state,
      tasks: state.tasks.filter((el) => el.id !== action.payload),
    };
  }
  return state;
}

function App() {
  const [state, dispatch] = React.useReducer(reducer, {
    tasks: [
      {
        id: 1,
        text: "Task-1",
        completed: true,
      },
    ],
  });

  const onAddTask = (text, checked) => {
    dispatch({
      type: "ADD_TASK",
      payload: {
        text,
        checked,
      },
    });
  };

  const removeTask = (id) => {
    if (window.confirm("Удалить?")) {
      dispatch({
        type: "REMOVE_TASK",
        payload: id,
      });
    }
  };

  return (
    <div className="App">
      <Paper className="wrapper">
        <Paper className="header" elevation={0}>
          <h4>Список задач</h4>
        </Paper>
        <AddField onAddTask={onAddTask} />
        <Divider />
        <Tabs value={0}>
          <Tab label="Все" />
          <Tab label="Активные" />
          <Tab label="Завершённые" />
        </Tabs>
        <Divider />
        <List>
          {state.tasks.map((el) => (
            <Item
              key={el.id}
              text={el.text}
              completed={el.completed}
              removeTask={removeTask}
              id={el.id}
            />
          ))}
        </List>
        <Divider />
        <div className="check-buttons">
          <Button>Отметить всё</Button>
          <Button>Очистить</Button>
        </div>
      </Paper>
    </div>
  );
}

export default App;
