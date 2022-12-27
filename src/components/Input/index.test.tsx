import { render, screen, fireEvent } from '@testing-library/react';
import 'jest-styled-components';
import { Input } from './index';

describe('<Input />', () => {
  // 정상적으로 렌더링 되었는지 테스트
  it('renders component correctly', () => {
    const text = 'default value';
    const { container } = render(<Input value={text} />);

    const input = screen.getByDisplayValue(text);
    expect(input).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  // placeholder가 정상적으로 렌더링되었는지 테스트
  it('renders placeholder correctly', () => {
    const text = 'default placeholder';
    render(<Input placeholder={text} />);

    // placeholder로 요소를 가져온다
    const input = screen.getByPlaceholderText(text);
    expect(input).toBeInTheDocument();
  });

  it('changes the data', () => {
    const text = 'default placeholder';
    render(<Input placeholder={text} />);

    // value를 체크하기 위해 inputElement로 캐스팅
    const input = screen.getByPlaceholderText(text) as HTMLInputElement;

    // value를 study react로 변경하는 이벤트를 발생시킨다
    fireEvent.change(input, {
      target: {
        value: 'study react',
      },
    });

    expect(input.value).toBe('study react');
  });
});
