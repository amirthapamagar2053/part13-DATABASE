const express = require("express");
const app = express();

const { PORT } = require("./util/config");
const { connectToDatabase } = require("./util/db");

const notesRouter = require("./controllers/noteRouter");
const userRouter = require("./controllers/userRouter");
const loginRouter = require("./controllers/loginRouter");

app.use(express.json());

app.use("/api/notes", notesRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
// USING THE SEQUALIZE COMMMAND FOR CONNECTING TO THE DATABASE AND GETTING THE CONTENTS FROM THE DATABASE

// const main = async () => {
//   try {
//     await sequelize.authenticate()
//     console.log('Connection has been established successfully.')
//     const notes = await sequelize.query("SELECT * FROM notes", { type: QueryTypes.SELECT })
//     console.log(notes)
//     sequelize.close()
//   } catch (error) {
//     console.error('Unable to connect to the database:', error)
//   }
// }

// main()
