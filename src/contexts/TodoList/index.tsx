import { createContext, useState, useEffect } from 'react';

interface Context {
  readonly todoList: string[];
  readonly addTodo: (text: string) => void;
  readonly deleteTodo: (index: number) => void;
}

const TodoListContext = createContext<Context>({
  todoList: [],
  addTodo: (): void => {},
  deleteTodo: (): void => {},
});

interface Props {
  children: JSX.Element | JSX.Element[];
}

const TodoListProvider = ({ children }: Props): JSX.Element => {
  const [todoList, setTodoList] = useState<string[]>([]);

  const addTodo = (todo: string): void => {
    if (todo) {
      const newList = [...todoList, todo];
      localStorage.setItem('todoList', JSON.stringify(newList));
      setTodoList(newList);
    }
  };

  const deleteTodo = (index: number): void => {
    const newList = [...todoList];
    newList.splice(index, 1);
    localStorage.setItem('todoList', JSON.stringify(newList));
    setTodoList(newList);
  };

  useEffect(() => {
    const list = localStorage.getItem('todoList');

    if (list) {
      setTodoList(JSON.parse(list));
    }
  }, []);

  return (
    <TodoListContext.Provider
      value={{
        addTodo,
        deleteTodo,
        todoList,
      }}
    >
      {children}
    </TodoListContext.Provider>
  );
};

export { TodoListContext, TodoListProvider };
