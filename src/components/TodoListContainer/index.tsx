import { useContext } from 'react';
import styled from 'styled-components';

import { TodoItem } from 'components/TodoItem';
import { TodoListContext } from 'contexts';

const Container = styled.div`
  min-width: 350px;
  height: 400px;
  overflow-y: scroll;
  border: 1px solid #bdbdbd;
  margin-bottom: 20px;
`;

export const TodoListContainer = () => {
  const { todoList, deleteTodo } = useContext(TodoListContext);

  return (
    <Container data-testid="todoList">
      {todoList.map((item, index) => (
        <TodoItem key={item} label={item} onDelete={() => deleteTodo(index)} />
      ))}
    </Container>
  );
};
