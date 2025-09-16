import React, { useState } from "react";
import axios from "axios";
import SearchBox from "../components/SearchBox";

const Search = () => {
  const [breed, setBreed] = useState({});
  const [isSearched, setIsSearched] = useState(false);
  const onSearch = async (name) => {
    const { data } = await axios.get(
      `http://127.0.0.1:3000/api/v1/dogs/breed/${name}`
    );
    setBreed(data.data[0]);
    setIsSearched(true);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-gray-50 rounded-xl shadow-lg">
      <SearchBox onSearch={onSearch} />
      {breed && breed.name ? (
        <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="mb-3 text-2xl font-bold text-blue-600">
            {breed.name}
          </h2>
          <p className="text-base text-gray-700 mb-4">{breed.description}</p>
          <div className="flex justify-between mb-2">
            <span>
              <strong>Life Span:</strong> {breed.life?.min} - {breed.life?.max}{" "}
              years
            </span>
          </div>
          <div className="flex justify-between mb-2">
            <span>
              <strong>Male Weight:</strong> {breed.male_weight?.min} -{" "}
              {breed.male_weight?.max} kg
            </span>
          </div>
          <div className="flex justify-between">
            <span>
              <strong>Female Weight:</strong> {breed.female_weight?.min} -{" "}
              {breed.female_weight?.max} kg
            </span>
          </div>
        </div>
      ) : (
        isSearched && (
          <div className="text-red-500 my-3 font-sans font-semibold">
            {" "}
            No Breed with that name in the database
          </div>
        )
      )}
    </div>
  );
};

export default Search;
