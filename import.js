import mongoose from "mongoose";
import fs from "fs";

//mongodb+srv://mexiko944_db_user:b3eFGWeg9rzc2cRk@cluster0.kfc1ghu.mongodb.net/

// Подключение к Mongo
await mongoose.connect(
  "mongodb+srv://mexiko944_db_user:b3eFGWeg9rzc2cRk@cluster0.kfc1ghu.mongodb.net/cartDB/items",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
);

// Схема заявки
const itemSchema = new mongoose.Schema(
  {
    id: Number,
    nam: String,
    tel: String,
    mail: String,
    prodact: String,
    status: String,
    dateDate: String,
    dateTime: String,
  },
  { collection: "items" },
);

const Item = mongoose.model("Item", itemSchema);

// Схема для lastId
const counterSchema = new mongoose.Schema(
  {
    _id: String,
    lastId: Number,
  },
  { collection: "counters" },
);

const Counter = mongoose.model("Counter", counterSchema);

async function importData() {
  const raw = fs.readFileSync("./db.json", "utf-8");
  const data = JSON.parse(raw);

  // Очистим коллекции
  await Item.deleteMany({});
  await Counter.deleteMany({});

  // Сохраним заявки как отдельные документы
  await Item.insertMany(data.items);

  // Сохраним lastId
  await new Counter({ _id: "items", lastId: data.lastId }).save();

  console.log("✅ Данные успешно импортированы!");
  process.exit();
}

importData();
