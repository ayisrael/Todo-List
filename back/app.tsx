const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const { Client } = require('pg');
const dotenv = require('dotenv');
const cors = require('cors')
dotenv.config();

const schema = buildSchema(`
 type Task {
 id: Int
 name: String
 iscompleted: Boolean
 }

 type Query {
 tasks: [Task]
 }

 type Mutation {
 addTask(name: String): Task
 deleteTask(id: Int): Boolean
 toggleTask(id: Int): Task
 }
`);

const connectDb = async () => {
 try {
 const client = new Client({
 user: process.env.DB_USER,
 host: process.env.DB_HOST,
 database: process.env.DB_DATABASE,
 password: process.env.DB_PASSWORD,
 port: process.env.DB_PORT,
 });

 await client.connect();
 return client;
 } catch (error) {
 console.log(error);
 }
};

const root = {
 tasks: async () => {
 const client = await connectDb();
 const res = await client.query('SELECT * FROM task');
 client.end();
 return res.rows;
 },

 addTask: async ({ name }) => {
 const client = await connectDb();
 const res = await client.query('INSERT INTO task (name) VALUES ($1) RETURNING *', [name]);
 client.end();
 return res.rows[0];
 },

 deleteTask: async ({ id }) => {
 const client = await connectDb();
 const res = await client.query('DELETE FROM task WHERE id = $1', [id]);
 client.end();
 return res.rowCount > 0; // Return true if any rows were deleted
 },

 toggleTask: async ({ id }) => {
 const client = await connectDb();
 const taskRes = await client.query('SELECT * FROM task WHERE id = $1', [id]);
 if (taskRes.rowCount === 0) {
 throw new Error('Task not found');
 }

 const task = taskRes.rows[0];
 const updatedIsCompleted = !task.iscompleted;

 const res = await client.query('UPDATE task SET iscompleted = $1 WHERE id = $2 RETURNING *', [
 updatedIsCompleted,
 id,
 ]);
 client.end();
 return res.rows[0];
 },
};


const app = express();
app.use(cors());
app.use(
 '/graphql',
 graphqlHTTP({
 schema: schema,
 rootValue: root,
 graphiql: true,
 })
);




app.listen(3000, () => {
 console.log('GraphQL server is running on http://localhost:3000/graphql');
});