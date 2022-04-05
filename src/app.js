import React, { useState, useEffect, useContext } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  useLocation,
  useParams
} from "react-router-dom";

const TodoContext = React.createContext();

function useTodoApi() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: "Todo de prueba",
      checked: false,
      createAt: new Date(),
      updateAt: new Date(),
      completeAt: new Date()
    }
  ]);

  // TODO: Recuperar los todos en un efecto del local storage

  return {
    todos,
    getTodo(id) {
      return todos.find(todo => todo.id === Number(id));
    },
    updateTodo(id, title) {
      setTodos([
        ...todos.map(todo => {
          if (todo.id === id) {
            return {
              ...todo,
              title,
              updateAt: new Date()
            };
          }
          return todo;
        })
      ]);
    },
    addTodo(title) {
      setTodos([
        ...todos,
        {
          id: todos.length + 1,
          title,
          checked: false,
          createAt: new Date(),
          updateAt: new Date(),
          completeAt: new Date()
        }
      ]);
      // TODO: Guardar en local storage
    },
    complete(id) {
      setTodos([
        ...todos.map(todo => {
          if (todo.id === id) {
            return {
              ...todo,
              checked: true,
              completeAt: new Date()
            };
          }
          return todo;
        })
      ]);
    },
    uncomplete(id) {
      setTodos([
        ...todos.map(todo => {
          if (todo.id === id) {
            return {
              ...todo,
              checked: false,
              completeAt: new Date()
            };
          }
          return todo;
        })
      ]);
    }
  };
}

function TodoProvider(props) {
  const todoApi = useTodoApi();

  return (
    <TodoContext.Provider value={todoApi}>
      {props.children}
    </TodoContext.Provider>
  );
}

function TodoItem(props) {
  const [currentChecked, setCurrentChecked] = useState(props.checked || false);

  useEffect(() => {
    if (props.onChecked) {
      props.onChecked(currentChecked);
    }
  }, [currentChecked]);

  return (
    <div>
      <input
        id={props.id}
        type="checkbox"
        checked={currentChecked}
        onChange={event => {
          setCurrentChecked(event.target.checked);
        }}
      />
      <div>
        <div>
          <label
            htmlFor={props.id}
            style={{
              textDecoration: props.checked ? "line-through" : "initial"
            }}
          >
            {props.title}
          </label>
        </div>
        <div>
          <div>
            <span>Creado el {props.createAt.toLocaleString()}</span>
          </div>
          <div>
            <span>Ediatado el {props.updateAt.toLocaleString()}</span>
          </div>
          <div>
            <span>Completado el {props.completeAt.toLocaleString()}</span>
          </div>
        </div>
      </div>
      <div>
        <div>
          <Link to={`/todo/${props.id}`}>ver detalles</Link>
        </div>
        <div>
          <Link
            to={{
              pathname: `/todo/${props.id}/edit`,
              state: {
                id: props.id,
                title: props.title
              }
            }}
          >
            editar
          </Link>
        </div>
      </div>
    </div>
  );
}

function TodoList() {
  const todoApi = useContext(TodoContext);

  if (todoApi.todos.length === 0) {
    return <span>No hay TODOS</span>;
  }

  return todoApi.todos.map(todo => {
    return (
      <TodoItem
        key={todo.id}
        id={todo.id}
        title={todo.title}
        checked={todo.checked}
        createAt={todo.createAt}
        updateAt={todo.updateAt}
        completeAt={todo.completeAt}
        onChecked={complete => {
          if (complete) {
            todoApi.complete(todo.id);
          } else {
            todoApi.uncomplete(todo.id);
          }
        }}
      />
    );
  });
}

function Home() {
  const history = useHistory();

  return (
    <div>
      <div>
        <button onClick={() => history.push("/todos/add")}>Agregar Todo</button>
      </div>
      <div>
        <TodoList />
      </div>
    </div>
  );
}

function TodoAdd() {
  const todoApi = useContext(TodoContext);

  const history = useHistory();

  const [currentTitle, setCurrentTitle] = useState("");

  return (
    <div>
      <input
        placeholder="Escribe algo por hacer..."
        value={currentTitle}
        onChange={event => setCurrentTitle(event.target.value)}
      />
      <button
        onClick={() => {
          if (!currentTitle.trim()) {
            alert("No has escrito nada :/");
            return;
          }

          todoApi.addTodo(currentTitle);

          history.goBack();
        }}
      >
        Agregar
      </button>
      <button onClick={() => history.goBack()}>Cancelar</button>
    </div>
  );
}

function TodoView() {
  const todoApi = useContext(TodoContext);

  const history = useHistory();
  const params = useParams();

  const todo = todoApi.getTodo(params.id);

  if (!todo) {
    return (
      <div>
        <code style={{ color: "red" }}>
          El TODO con id {params.id} no existe :(
        </code>
        <hr />
        <button onClick={() => history.replace("/")}>Ir a Inicio</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Detalles del TODO {todo.id} </h1>
      <hr />
      <TodoItem
        key={todo.id}
        id={todo.id}
        title={todo.title}
        checked={todo.checked}
        createAt={todo.createAt}
        updateAt={todo.updateAt}
        completeAt={todo.completeAt}
        onChecked={complete => {
          if (complete) {
            todoApi.complete(todo.id);
          } else {
            todoApi.uncomplete(todo.id);
          }
        }}
      />
      <hr />
      <button onClick={() => history.replace("/")}>Ir a Inicio</button>
    </div>
  );
}

function TodoEdit() {
  const todoApi = useContext(TodoContext);

  const history = useHistory();
  const location = useLocation();

  const [currentTitle, setCurrentTitle] = useState("");

  useEffect(() => {
    setCurrentTitle(location.state.title);
  }, [location.state]);

  return (
    <div>
      <span>State: {JSON.stringify(location.state || null)}</span>
      <hr />
      <input
        placeholder="Escribe algo por hacer..."
        value={currentTitle}
        onChange={event => setCurrentTitle(event.target.value)}
      />
      <button
        onClick={() => {
          if (!currentTitle.trim()) {
            alert("No has escrito nada :/");
            return;
          }

          todoApi.updateTodo(location.state.id, currentTitle);

          history.goBack();
        }}
      >
        Guardar
      </button>
      <button onClick={() => history.goBack()}>Cancelar</button>
    </div>
  );
}

export default function App() {
  return (
    <TodoProvider>
      <div>
        <h1>Proyecto - Todo Routes</h1>
        <div style={{ border: "1px solid red" }}>
          <Router>
            <Switch>
              <Route path="/todo/:id/edit">
                <TodoEdit />
              </Route>
              <Route path="/todo/:id">
                <TodoView />
              </Route>
              <Route path="/todos/add">
                <TodoAdd />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </Router>
        </div>
      </div>
    </TodoProvider>
  );
}
