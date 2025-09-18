import React, { useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const UpdatedBreedForm = ({ setIsModalOpen, Breed }) => {
  const [formData, setFormData] = useState({
    name: Breed?.name || "",
    description: Breed?.description || "",
    life: {
      min: Breed?.life?.min || "",
      max: Breed?.life?.max || "",
    },
    male_weight: {
      min: Breed?.male_weight?.min || "",
      max: Breed?.male_weight?.max || "",
    },
    female_weight: {
      min: Breed?.female_weight?.min || "",
      max: Breed?.female_weight?.max || "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (
      name.includes("life") ||
      name.includes("male_weight") ||
      name.includes("female_weight")
    ) {
      const [group, field] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [group]: {
          ...prev[group],
          [field]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };
  const mutation = useMutation({
    mutationFn: async () => {
      await axios.patch(
        `http://127.0.0.1:3000/api/v1/dogs/breed/${Breed._id}`,
        formData
      );
    },
    onSuccess: () => {
      window.setTimeout(() => {
        location.assign("/");
      }, 1500);
      alert("Updated successfully");
    },
    onError: (error) => {
      alert("something went wrong");

      console.log(error);
    },
  });
  const handleUpdate = async (e) => {
    e.preventDefault();
    // Use formData for update
    mutation.mutate(formData);
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center backdrop-blur-md bg-opacity-30">
      <form
        className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg"
        onSubmit={handleUpdate}>
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Update Breed
        </h1>
        <div className="flex flex-col gap-6">
          {/* name and description */}
          <div className="flex gap-4 flex-col md:flex-row">
            <div className="flex flex-col flex-1">
              <label
                htmlFor="breed-name"
                className="mb-1 text-sm font-medium text-gray-700">
                Breed Name
              </label>
              <input
                id="breed-name"
                name="name"
                type="text"
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col flex-1">
              <label
                htmlFor="breed-description"
                className="mb-1 text-sm font-medium text-gray-700">
                Description
              </label>
              <input
                id="breed-description"
                name="description"
                type="text"
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
          </div>
          {/* Life */}
          <div>
            <h2 className="text-xl font-semibold mb-2 text-gray-700">
              Life Span
            </h2>
            <div className="flex gap-4">
              <div className="flex flex-col flex-1">
                <label htmlFor="life-min" className="mb-1 text-sm">
                  Min
                </label>
                <input
                  id="life-min"
                  name="life.min"
                  type="number"
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={formData.life.min}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col flex-1">
                <label htmlFor="life-max" className="mb-1 text-sm">
                  Max
                </label>
                <input
                  id="life-max"
                  name="life.max"
                  type="number"
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={formData.life.max}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          {/* Male Weight */}
          <div>
            <h2 className="text-xl font-semibold mb-2 text-gray-700">
              Male Weight
            </h2>
            <div className="flex gap-4">
              <div className="flex flex-col flex-1">
                <label htmlFor="male-weight-min" className="mb-1 text-sm">
                  Min
                </label>
                <input
                  id="male-weight-min"
                  name="male_weight.min"
                  type="number"
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={formData.male_weight.min}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col flex-1">
                <label htmlFor="male-weight-max" className="mb-1 text-sm">
                  Max
                </label>
                <input
                  id="male-weight-max"
                  name="male_weight.max"
                  type="number"
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={formData.male_weight.max}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          {/* Female Weight */}
          <div>
            <h2 className="text-xl font-semibold mb-2 text-gray-700">
              Female Weight
            </h2>
            <div className="flex gap-4">
              <div className="flex flex-col flex-1">
                <label htmlFor="female-weight-min" className="mb-1 text-sm">
                  Min
                </label>
                <input
                  id="female-weight-min"
                  name="female_weight.min"
                  type="number"
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={formData.female_weight.min}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col flex-1">
                <label htmlFor="female-weight-max" className="mb-1 text-sm">
                  Max
                </label>
                <input
                  id="female-weight-max"
                  name="female_weight.max"
                  type="number"
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={formData.female_weight.max}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2 mt-8">
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold cursor-pointer">
            Update
          </button>
          <button
            type="button"
            className="w-full py-3 bg-red-600 text-white rounded-lg font-semibold cursor-pointer"
            onClick={() => setIsModalOpen(false)}>
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatedBreedForm;
