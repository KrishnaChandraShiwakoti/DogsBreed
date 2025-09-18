import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Dogsinfo from "../components/Dogsinfo";
import UpdatedBreedForm from "../components/UpdatedBreedForm";
const SingleBreed = () => {
  const { name } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBreed, setSelectedBreed] = useState(null);

  const { data, isLoading } = useQuery({
    queryKey: [name],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://127.0.0.1:3000/api/v1/dogs/breed/${name}`
      );
      return data.data[0];
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return await axios.delete(
        `http://127.0.0.1:3000/api/v1/dogs/breed/${id}`
      );
    },
    onSuccess: () => {
      window.setTimeout(() => {
        location.assign("/");
      }, 1500);
      alert("Deleted successfully");
    },
    onError: (error) => {
      alert("something went wrong");

      console.log(error);
    },
  });
  const handleUpdate = (row) => {
    setSelectedBreed(row);
    setIsModalOpen(true);
  };
  return (
    <div className="w-6/12 mx-auto">
      {isLoading ? (
        "Loading"
      ) : (
        <>
          {isModalOpen && (
            <UpdatedBreedForm
              setIsModalOpen={setIsModalOpen}
              Breed={selectedBreed}
            />
          )}
          <Dogsinfo data={data} />
          <div className="flex gap-2 mt-8">
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold cursor-pointer"
              onClick={() => handleUpdate(data)}>
              Update
            </button>
            <button
              type="button"
              className="w-full py-3 bg-red-600 text-white rounded-lg font-semibold cursor-pointer"
              onClick={() => deleteMutation.mutate(data._id)}>
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SingleBreed;
