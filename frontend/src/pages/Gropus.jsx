import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const Gropus = () => {
  const { data } = useQuery({
    queryKey: ["groups"],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://127.0.0.1:3000/api/v1/dogs/groups`
      );
      return data.data;
    },
  });

  const navigate = useNavigate();

  return (
    <main className="w-full max-w-6xl mx-auto px-2 py-6">
      {data &&
        data.map((group) => (
          <section key={group.group} className="mb-10">
            <h2 className="text-xl font-bold mb-4 text-blue-700">
              Group {group.group}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {group.elements.map((breed) => (
                <div
                  className="p-4 border-2 rounded-2xl shadow-2xl hover:cursor-pointer hover:border-0 hover:shadow-2xs"
                  onClick={() => navigate(`/${breed.name}`)}>
                  <h1>{breed.name}</h1>
                  {/* // <Dogsinfo key={breed._id} data={breed} /> */}
                </div>
              ))}
            </div>
          </section>
        ))}
    </main>
  );
};

export default Gropus;
