import styled from 'styled-components';

interface Props {
  readonly value?: string;
  readonly placeholder?: string;
  readonly onChange?: (text: string) => void;
}

const InputBox = styled.input`
  font-size: 16px;
  padding: 10px 10px;
  border-radius: 8px;
  border: 1px solid #bdbdbd;
  outline: none;
`;

export const Input = ({ placeholder, onChange, value }: Props) => {
  return (
    <InputBox
      placeholder={placeholder}
      onChange={(event) => {
        if (typeof onChange === 'function') {
          onChange(event.target.value);
        }
      }}
      value={value}
    />
  );
};
