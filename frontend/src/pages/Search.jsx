import React, { useState } from "react";
import axios from "axios";
import SearchBox from "../components/SearchBox";
import { useQuery } from "@tanstack/react-query";

const Search = () => {
  const [breed, setBreed] = useState({});
  const [name, setName] = useState("");
  const onSearch = async () => {
    console.log("running");
    if (name == "") return;
    const { data } = await axios.get(
      `http://127.0.0.1:3000/api/v1/dogs/breed/${name}`
    );
    return data.data[0];
  };
  const { data, isFetched } = useQuery({
    queryKey: [name],
    queryFn: onSearch,
  });

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-gray-50 rounded-xl shadow-lg">
      <SearchBox onSearch={setName} />
      {data && data.name ? (
        <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="mb-3 text-2xl font-bold text-blue-600">{data.name}</h2>
          <p className="text-base text-gray-700 mb-4">{data.description}</p>
          <div className="flex justify-between mb-2">
            <span>
              <strong>Life Span:</strong> {data.life?.min} - {data.life?.max}{" "}
              years
            </span>
          </div>
          <div className="flex justify-between mb-2">
            <span>
              <strong>Male Weight:</strong> {data.male_weight?.min} -{" "}
              {data.male_weight?.max} kg
            </span>
          </div>
          <div className="flex justify-between">
            <span>
              <strong>Female Weight:</strong> {data.female_weight?.min} -{" "}
              {data.female_weight?.max} kg
            </span>
          </div>
        </div>
      ) : (
        isFetched && (
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
