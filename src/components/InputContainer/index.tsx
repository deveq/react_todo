import styled from 'styled-components';

import { useState, useContext } from 'react';
import { Button } from 'components/Button';
import { Input } from 'components/Input';

import { TodoListContext } from 'contexts';

const Container = styled.div`
  display: flex;
`;

export const InputContainer = () => {
  const [todo, setTodo] = useState('');
  const { addTodo } = useContext(TodoListContext);
  return (
    <Container>
      <Input
        placeholder="할 일을 입력해 주세요"
        value={todo}
        onChange={setTodo}
      />
      <Button
        label="추가"
        onClick={() => {
          addTodo(todo);
          setTodo('');
        }}
      />
    </Container>
  );
};
