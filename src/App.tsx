import { useState } from 'react';
import styled from 'styled-components';
import { Button, Input, TodoItem } from 'components';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column; ;
`;

const Contents = styled.div`
  display: flex;
  background-color: #ffffff;
  flex-direction: column;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
`;

const InputContainer = styled.div`
  display: flex;
`;

const TodoListContainer = styled.div`
  min-width: 350px;
  height: 400px;
  overflow-y: scroll;
  border: 1px solid #bdbdbd;
  margin-bottom: 20px;
`;

function App() {
  const [todo, setTodo] = useState('');
  const [todoList, setTodoList] = useState<string[]>([]);

  const addTodo = (): void => {
    if (todo) {
      setTodoList([...todoList, todo]);
      setTodo('');
    }
  };

  const deleteTodo = (index: number): void => {
    const list = [...todoList];
    list.splice(index, 1);
    setTodoList(list);
  };

  return (
    <Container>
      <Contents>
        <TodoListContainer>
          {/* <TodoItem label="추가된 할 일" onDelete={() => alert('삭제')} /> */}
          {todoList.map((item, index) => (
            <TodoItem
              key={item}
              label={item}
              onDelete={() => deleteTodo(index)}
            />
          ))}
        </TodoListContainer>
        <InputContainer>
          <Input
            placeholder="할 일을 입력해 주세요"
            value={todo}
            onChange={(text) => setTodo(text)}
          />
          <Button label="추가" onClick={addTodo} />
        </InputContainer>
      </Contents>
    </Container>
  );
}

export default App;
