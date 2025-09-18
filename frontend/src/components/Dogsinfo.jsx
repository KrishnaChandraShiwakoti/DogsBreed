import React from "react";

const Dogsinfo = ({ data }) => {
  return (
    <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="mb-3 text-2xl font-bold text-blue-600">{data?.name}</h2>
      <p className="text-base text-gray-700 mb-4">{data?.description}</p>
      <div className="flex justify-between mb-2">
        <span>
          <strong>Life Span:</strong> {data?.life?.min} - {data?.life?.max}{" "}
          years
        </span>
      </div>
      <div className="flex justify-between mb-2">
        <span>
          <strong>Male Weight:</strong> {data?.male_weight?.min} -{" "}
          {data?.male_weight?.max} kg
        </span>
      </div>
      <div className="flex justify-between">
        <span>
          <strong>Female Weight:</strong> {data?.female_weight?.min} -{" "}
          {data?.female_weight?.max} kg
        </span>
      </div>
    </div>
  );
};

export default Dogsinfo;
