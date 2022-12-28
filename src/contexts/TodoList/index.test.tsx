import { useContext } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TodoListProvider, TodoListContext } from './index';

beforeEach(() => {
  localStorage.clear();
});

describe('TodoList Context', () => {
  it('renders component correctly', () => {
    const text = 'Child Component';
    const ChildComponent = () => {
      return <div>{text}</div>;
    };

    render(
      <TodoListProvider>
        <ChildComponent />
      </TodoListProvider>,
    );

    const childComponent = screen.getByText(text);
    expect(childComponent).toBeInTheDocument();
    expect(localStorage.getItem('todoList')).toBeNull();
  });

  it('loads localStorage data and sets it to State', () => {
    const array = ['Todo1', 'Todo2', 'Todo3'];
    localStorage.setItem('todoList', JSON.stringify(array));

    const ChildComponent = () => {
      const { todoList } = useContext(TodoListContext);
      return (
        <div>
          {todoList.map((item) => (
            <div key={item}>{item}</div>
          ))}
        </div>
      );
    };

    const { container } = render(
      <TodoListProvider>
        <ChildComponent />
      </TodoListProvider>,
    );

    expect(screen.getByText(array[0])).toBeInTheDocument();
    expect(screen.getByText(array[1])).toBeInTheDocument();
    expect(screen.getByText(array[2])).toBeInTheDocument();
    // expect(container).toMatchSnapshot();
  });

  it('uses addTodo function', () => {
    const text1 = 'study react 1';

    const ChildComponent = () => {
      const { todoList, addTodo } = useContext(TodoListContext);

      return (
        <div>
          <div onClick={() => addTodo(text1)}>Add Todo</div>
          <div>
            {todoList.map((todo) => (
              <div key={todo}>{todo}</div>
            ))}
          </div>
        </div>
      );
    };

    render(
      <TodoListProvider>
        <ChildComponent />
      </TodoListProvider>,
    );

    expect(localStorage.getItem('todoList')).toBeNull();
    const button = screen.getByText('Add Todo');
    fireEvent.click(button);
    expect(screen.getByText(text1)).toBeInTheDocument();
    expect(localStorage.getItem('todoList')).toBe('["study react 1"]');
  });

  it('uses deleteTodo function', () => {
    const array = ['Todo1', 'Todo2', 'Todo3'];
    localStorage.setItem('todoList', JSON.stringify(array));

    const ChildComponent = () => {
      const { todoList, deleteTodo } = useContext(TodoListContext);
      return (
        <div>
          {todoList.map((todo, index) => {
            return (
              <div key={todo} onClick={() => deleteTodo(index)}>
                {todo}
              </div>
            );
          })}
        </div>
      );
    };

    render(
      <TodoListProvider>
        <ChildComponent />
      </TodoListProvider>,
    );

    const todoItem = screen.getByText(array[1]);
    expect(todoItem).toBeInTheDocument();
    fireEvent.click(todoItem);
    expect(todoItem).not.toBeInTheDocument();
    expect(
      JSON.parse(localStorage.getItem('todoList') as string),
    ).not.toContain(array[1]);
  });
});
