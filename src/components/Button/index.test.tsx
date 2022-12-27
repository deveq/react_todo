import { render, screen, fireEvent } from '@testing-library/react';
// jest-styled-components를 import하면 toHaveStyleRule을 사용할 수 있다.
import 'jest-styled-components';

import { Button } from './index';

describe('<Button />', () => {
  const text = 'Button Test';

  it('renders component correctly', () => {
    const { container } = render(<Button label={text} />);

    const label = screen.getByText(text);
    expect(label).toBeInTheDocument();

    const parent = label.parentElement;
    // bgcolor가 올바른 값으로 렌더링 되었는지 확인한다
    expect(parent).toHaveStyleRule('background-color', '#304ffe');
    // hover시의 bgcolor가 올바른 값으로 렌더링 되었는지 확인한다.
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
    // 테스트에 사용할 모의함수를 만든다
    const handleClick = jest.fn();

    // 모의함수를 props로 넘긴 후 렌더링
    render(<Button label={text} onClick={handleClick} />);

    // 렌더링된 버튼을 찾는다
    const label = screen.getByText(text);

    // 아직 모의함수가 실행된적 없음을 확인
    expect(handleClick).toHaveBeenCalledTimes(0);

    // 모의함수를 받은 Button에 click이벤트를 발동시킨다
    fireEvent.click(label);

    // 컴포넌트의 모의함수가 1번 실행된것이 맞는지 확인한다.
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
