import { render, screen, fireEvent } from '@testing-library/react';
import 'jest-styled-components';

import { Button } from './index';

describe('<Button />', () => {
  const text = 'Button Test';

  it('renders component correctly', () => {
    const { container } = render(<Button label={text} />);

    const label = screen.getByText(text);
    expect(label).toBeInTheDocument();

    const parent = label.parentElement;
    expect(parent).toHaveStyleRule('background-color', '#304ffe');
    expect(parent).toHaveStyleRule('background-color', '#1e40ff', {
      modifier: ':hover',
    });

    expect(container).toMatchSnapshot();
  });

  it('changes backgroundColor and hoverColor props', () => {
    const backgroundColor = '#ff1744';
    const hoverColor = '#f01440';
    render(
      <Button
        label={text}
        backgroundColor={backgroundColor}
        hoverColor={hoverColor}
      />,
    );

    const parent = screen.getByText(text).parentElement;
    expect(parent).toHaveStyleRule('background-color', backgroundColor);
    expect(parent).toHaveStyleRule('background-color', hoverColor, {
      modifier: ':hover',
    });
  });

  it('clicks the button', () => {
    const handleClick = jest.fn();
    render(<Button label={text} onClick={handleClick} />);

    const label = screen.getByText(text);
    expect(handleClick).toHaveBeenCalledTimes(0);
    fireEvent.click(label);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
