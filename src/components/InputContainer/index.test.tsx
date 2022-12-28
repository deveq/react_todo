import { render, screen, fireEvent } from '@testing-library/react';
import { TodoListProvider } from 'contexts';
import 'jest-styled-components';

import { InputContainer } from './index';

/*
const [todo, setTodo] = useState('');
const { addTodo } = useContext(TodoListContext);
*/

describe('<InputContainer />', () => {
  const placeholder = '할 일을 입력해 주세요';
  it('renders component correctly', () => {
    const { container } = render(<InputContainer />);

    const input = screen.getByPlaceholderText(placeholder);
    expect(input).toBeInTheDocument();
    const button = screen.getByText('추가');
    expect(button).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('empties data after adding data', () => {
    render(<InputContainer />);

    const input = screen.getByPlaceholderText(placeholder) as HTMLInputElement;
    const button = screen.getByText('추가');

    expect(input.value).toBe('');

    fireEvent.change(input, {
      target: {
        value: 'study react 1',
      },
    });
    expect(input.value).toBe('study react 1');

    fireEvent.click(button);

    expect(input.value).toBe('');
  });

  it('adds input data to localStorage via Context', () => {
    render(
      <TodoListProvider>
        <InputContainer />
      </TodoListProvider>,
    );

    const input = screen.getByPlaceholderText(placeholder) as HTMLInputElement;
    const button = screen.getByText('추가');

    expect(localStorage.getItem('todoList')).toBeNull();

    fireEvent.change(input, {
      target: {
        value: 'study react 1',
      },
    });
    fireEvent.click(button);

    expect(localStorage.getItem('todoList')).toBe('["study react 1"]');
  });
});
