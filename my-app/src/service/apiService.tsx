import {  HttpLink, ApolloClient, InMemoryCache } from "@apollo/client";
import { gql } from "@apollo/client";

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql/"
})

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

export const GET_TASKS = gql`
  query {
    tasks {
      id
      name
      iscompleted
    }
  }
`;


export const ADD_TASK = gql`
  mutation AddTask($name: String!) {
    addTask(name: $name) {
      id
      name
      iscompleted
    }
  }
`;

export const DELETE_TASK = gql`
  mutation DeleteTask($id: Int!) {
    deleteTask(id: $id)
  }
`;

export const TOGGLE_TASK = gql`
  mutation ToggleTask($id: Int!) {
    toggleTask(id: $id) {
      id
      name
      iscompleted
    }
  }
`;
