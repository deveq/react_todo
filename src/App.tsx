import { useState } from 'react';
import styled from 'styled-components';
import { InputContainer, TodoListContainer } from 'components';
import { TodoListProvider } from 'contexts';

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

function App() {
  return (
    <TodoListProvider>
      <Container>
        <Contents>
          <TodoListContainer />
          <InputContainer />
        </Contents>
      </Container>
    </TodoListProvider>
  );
}

export default App;
