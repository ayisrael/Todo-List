import { ApolloProvider } from "@apollo/client";
import './App.css';
import TodoList from './comps/todoList';
import { apolloClient } from './service/apiService';



function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <TodoList/>
    </ApolloProvider>
  );
}

export default App;
