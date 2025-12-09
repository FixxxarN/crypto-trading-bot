import express from 'express';

const app = express();
const port = process.env.port || 3000;

app.get('/', (_, res) => {
	res.send('Hello, world!');
});

const server = app.listen(port, () => {
	console.log(`Listening on port: ${port}`);
});

export { server };
