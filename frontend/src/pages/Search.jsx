import React, { useState } from "react";
import axios from "axios";
import SearchBox from "../components/SearchBox";
import { useQuery } from "@tanstack/react-query";
import Dogsinfo from "../components/Dogsinfo";

const Search = () => {
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
        <Dogsinfo data={data} />
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
