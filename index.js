require("dotenv").config();
const { Sequelize, Model, DataTypes } = require("sequelize");
const express = require("express");
const app = express();

app.use(express.json());

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

class Note extends Model {}
Note.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    important: {
      type: DataTypes.BOOLEAN,
    },
    date: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "note",
  }
);

Note.sync();

app.get("/api/notes", async (req, res) => {
  const notes = await Note.findAll();
  //   console.log(notes.map((n) => n.toJSON()));
  console.log(JSON.stringify(notes, null, 2));
  res.json(notes);
});

app.get("/api/notes/:id", async (req, res) => {
  const note = await Note.findByPk(req.params.id);
  if (note) {
    console.log(note.toJSON());
    res.json(note);
  } else {
    res.status(404).end();
  }
});

app.post("/api/notes", async (req, res) => {
  try {
    console.log(req.body);
    const note = await Note.create(req.body);
    console.log("The note is", note);
    return res.json(note);
  } catch (error) {
    console.log("The error has been entered");
    return res.status(400).json({ error });
  }
});

app.put("/api/notes/:id", async (req, res) => {
  const note = await Note.findByPk(req.params.id);
  if (note) {
    note.important = req.body.important;
    await note.save();
    res.json(note);
  } else {
    res.status(404).end();
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
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
