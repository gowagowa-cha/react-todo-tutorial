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

  if (action.type === "TOOGLE_COMPLETED") {
    return {
      ...state,
      tasks: state.tasks.map((obj) =>
        obj.id === action.payload ? { ...obj, completed: !obj.completed } : obj
      ),
    };
  }

  if (action.type === "TOOGLECOMPLETED_ALL") {
    return {
      ...state,
      tasks: state.tasks.map((obj) => ({ ...obj, completed: true })),
    };
  }

  if (action.type === "CLEAR_TASK") {
    return {
      ...state,
      tasks: [],
    };
  }

  if (action.type === "CHANGE_TASK") {
    return {
      ...state,
      tasks: state.tasks.map((obj) =>
        obj.id === action.payload.id
          ? { ...obj, text: action.payload.text }
          : obj
      ),
    };
  }

  if (action.type === "SET_FILTER") {
    return {
      ...state,
      filterBy: action.payload,
    };
  }

  return state;
}

const filterIndex = {
  all: 0,
  active: 1,
  completed: 2,
};

function App() {
  const [state, dispatch] = React.useReducer(reducer, {
    filterBy: "all",
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

  const toogleCompleted = (id) => {
    dispatch({
      type: "TOOGLE_COMPLETED",
      payload: id,
    });
  };

  const completedAll = (id) => {
    dispatch({
      type: "TOOGLECOMPLETED_ALL",
      payload: id,
    });
  };

  const clearTask = () => {
    if (window.confirm("Удалить всё?")) {
      dispatch({
        type: "CLEAR_TASK",
      });
    }
  };

  const changeTask = (id) => {
    const text = window.prompt("Введите текст");
    dispatch({
      type: "CHANGE_TASK",
      payload: {
        id,
        text,
      },
    });
  };

  const setFilter = (_, newIndex) => {
    const status = Object.keys(filterIndex)[newIndex];
    dispatch({
      type: "SET_FILTER",
      payload: status,
    });
  };

  return (
    <div className="App">
      <Paper className="wrapper">
        <Paper className="header" elevation={0}>
          <h4>Список задач</h4>
        </Paper>
        <AddField onAddTask={onAddTask} />
        <Divider />
        <Tabs value={filterIndex[state.filterBy]} onChange={setFilter}>
          <Tab label="Все" />
          <Tab label="Активные" />
          <Tab label="Завершённые" />
        </Tabs>
        <Divider />
        <List>
          {state.tasks
            .filter((obj) => {
              if (state.filterBy === "all") {
                return true;
              }
              if (state.filterBy === "active") {
                return !obj.completed;
              }
              if (state.filterBy === "completed") {
                return obj.completed;
              }
            })
            .map((el) => (
              <Item
                key={el.id}
                text={el.text}
                completed={el.completed}
                removeTask={() => removeTask(el.id)}
                addCheckBox={() => toogleCompleted(el.id)}
                changeTask={() => changeTask(el.id)}
              />
            ))}
        </List>
        <Divider />
        <div className="check-buttons">
          <Button onClick={completedAll}>Отметить всё</Button>
          <Button onClick={clearTask}>Очистить</Button>
        </div>
      </Paper>
    </div>
  );
}

export default App;
