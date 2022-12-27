import { render, screen, fireEvent } from '@testing-library/react';
import 'jest-styled-components';
import App from './App';

describe('<App />', () => {
  it('renders component correctly', () => {
    const { container } = render(<App />);

    const todoList = screen.getByTestId('todoList');
    expect(todoList).toBeInTheDocument();
    expect(todoList.firstChild).toBeNull();

    const input = screen.getByPlaceholderText('할 일을 입력해 주세요');
    expect(input).toBeInTheDocument();
    const label = screen.getByText('추가');
    expect(label).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('adds and delete Todo items', () => {
    render(<App />);

    const text1 = 'study react 1'; // 첫번째 할일
    const text2 = 'study react 2'; // 두번째 할일

    const input = screen.getByPlaceholderText('할 일을 입력해 주세요');
    const addButton = screen.getByText('추가');
    // 첫번째 할일을 추가한다
    fireEvent.change(input, {
      target: {
        value: text1,
      },
    });
    fireEvent.click(addButton);

    const todoItem = screen.getByText(text1);
    const deleteButton = screen.getByText('삭제');
    // 첫번째 할일과 삭제버튼이 정상적으로 렌더링 되었는지 확인한다
    expect(todoItem).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();

    // 추가된 할일이 1개인지 확인한다.
    const todoList = screen.getByTestId('todoList');
    expect(todoList.childElementCount).toBe(1);

    // 2번째 할일을 추가한다.
    fireEvent.change(input, {
      target: {
        value: text2,
      },
    });
    fireEvent.click(addButton);

    // 두번째 할일이 정상적으로 렌더링 되었는지 확인한다.
    const todoItem2 = screen.getByText(text2);
    expect(todoItem2).toBeInTheDocument();
    // 추가된 할일이 2개가 되었는지 확인한다.
    expect(todoList.childElementCount).toBe(2);

    // 삭제버튼을 모두 가져온 후 첫번째 할일을 삭제한다.
    const deleteButtons = screen.getAllByText('삭제');
    fireEvent.click(deleteButtons[0]);

    // 첫번째 할일 목록이 삭제되었는지 확인한다
    expect(todoItem).not.toBeInTheDocument();
    // 할일이 1개가 되었는지 확인한다.
    expect(todoList.childElementCount).toBe(1);
  });

  // 문자열이 빈 상태에서 할일이 추가되지 않도록 하는 테스트
  it('does not add empty Todo', () => {
    // addTodo에 if문이 있기때문에, true/false 조건 둘 다 테스트 해야함
    render(<App />);

    // const input = screen.getByPlaceholderText('할 일을 입력해 주세요');
    const addButton = screen.getByText('추가');
    const todoList = screen.getByTestId('todoList');
    const length = todoList.childElementCount;
    fireEvent.click(addButton);

    expect(todoList.childElementCount).toBe(length);
  });
});
