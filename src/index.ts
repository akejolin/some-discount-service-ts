import app from './app';

const PORT:number = Number(process.env.PORT) || 3000;

app.listen(PORT);
console.log(`I AM LISTENING to ${PORT}`)


export default app;