import { render, screen, fireEvent } from '@testing-library/react';
import 'jest-styled-components';

import { TodoListProvider } from 'contexts';
import { TodoListContainer } from './index';

describe('<TodoList />', () => {
  it('renders component correctly', () => {
    const { container } = render(
      <TodoListProvider>
        <TodoListContainer />
      </TodoListProvider>,
    );

    const todoList = screen.getByTestId('todoList');
    expect(todoList).toBeInTheDocument();
    expect(todoList.firstChild).toBeNull();

    expect(container).toMatchSnapshot();
  });

  const array = ['Todo 1', 'Todo 2', 'Todo 3'];

  it('shows todo list', () => {
    localStorage.setItem('todoList', JSON.stringify(array));

    render(
      <TodoListProvider>
        <TodoListContainer />
      </TodoListProvider>,
    );

    expect(screen.getByText(array[0])).toBeInTheDocument();
    expect(screen.getByText(array[1])).toBeInTheDocument();
    expect(screen.getByText(array[2])).toBeInTheDocument();
    expect(screen.getAllByText('삭제')).toHaveLength(3);
  });

  it('deletes todo item', () => {
    localStorage.setItem('todoList', JSON.stringify(array));

    render(
      <TodoListProvider>
        <TodoListContainer />
      </TodoListProvider>,
    );

    const todoItem = screen.getByText(array[1]);
    expect(todoItem).toBeInTheDocument();
    const button = todoItem.nextElementSibling as HTMLElement;
    fireEvent.click(button);
    expect(todoItem).not.toBeInTheDocument();
    expect(
      JSON.parse(localStorage.getItem('todoList') as string),
    ).not.toContain(array[1]);
  });
});
