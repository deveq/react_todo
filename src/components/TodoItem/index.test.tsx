import { render, screen, fireEvent } from '@testing-library/react';
import 'jest-styled-components';

import { TodoItem } from './index';

describe('<TodoItem />', () => {
  const text = 'default value';

  it('renders component correctly', () => {
    const { container } = render(<TodoItem label={text} />);

    const todoItem = screen.getByText(text);
    expect(todoItem).toBeInTheDocument();

    const deleteButton = screen.getByText('삭제');
    expect(deleteButton).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('clicks the delete button', () => {
    const handleClick = jest.fn();

    render(<TodoItem label={text} onDelete={handleClick} />);

    const button = screen.getByText('삭제');

    expect(handleClick).toHaveBeenCalledTimes(0);

    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
