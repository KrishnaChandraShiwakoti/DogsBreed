const mongoose = require("mongoose");
const dotenv = require("dotenv");
const axios = require("axios");

const Dog = require("../models/dogs");

dotenv.config({ path: "./config.env" });
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful!"));

const importData = async () => {
  try {
    let i = 1; // make this mutable
    let hasNextPage = true;

    do {
      const { data } = await axios.get(
        `https://dogapi.dog/api/v2/breeds?page[number]=${i}`
      );
      const reformedData = data.data.map((dog) => {
        const {
          name,
          description,
          life,
          male_weight,
          female_weight,
          hypoallergenic,
        } = dog.attributes;
        return {
          name: name,
          description,
          life,
          male_weight,
          female_weight,
          hypoallergenic,
        };
      });
      Dog.create(reformedData);
      // check if there’s a next page
      hasNextPage = !!data.links?.next;
      i++;
    } while (hasNextPage);
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

if (process.argv[2] === "--import") importData();

console.log(process.argv);
