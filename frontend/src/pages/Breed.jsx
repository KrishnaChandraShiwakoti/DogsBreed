import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import UpdatedBreedForm from "../components/UpdatedBreedForm";
import { useQuery } from "@tanstack/react-query";

const Breed = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBreed, setSelectedBreed] = useState(null);

  const { data, isLoading, refetch } = useQuery({
    queryKey: [currentPage],
    queryFn: () => fetchData(currentPage, handleDelete, handleUpdate),
  });

  const handleUpdate = (row) => {
    setSelectedBreed(row);
    setIsModalOpen(true);
  };

  const handleDelete = async (row) => {
    await axios.delete(`http://127.0.0.1:3000/api/v1/dogs/breed/${row._id}`);
    alert("well deleted a breed");
    refetch();
  };

  const customStyles = {
    rows: {
      style: {
        minHeight: "72px",
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px",
        paddingRight: "8px",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px",
        paddingRight: "8px",
      },
    },
  };

  return (
    <>
      {isLoading ? (
        <h1>Loading ...</h1>
      ) : (
        <div className="relative">
          {isModalOpen && (
            <UpdatedBreedForm
              setIsModalOpen={setIsModalOpen}
              Breed={selectedBreed}
            />
          )}
          <DataTable
            columns={data?.columns}
            data={data?.list}
            customStyles={customStyles}
          />
          <div className="absolute right-0 flex">
            <button
              className="mx-1 px-2 py-1  shadow-sm text-black border-0 rounded-sm cursor-pointer"
              disabled={isLoading}
              onClick={() => {
                if (currentPage > 1) {
                  setCurrentPage(currentPage - 1);
                  return;
                }
                alert("you cannot go lower than page one");
              }}>
              Prev
            </button>
            <p className="mx-1">
              {currentPage} of {data?.maxPage || "1"}
            </p>
            <button
              className="mx-1 px-2 py-1 text-black border-0 rounded-sm shadow-sm cursor-pointer"
              disabled={isLoading}
              onClick={() => {
                if (currentPage < data?.maxPage) {
                  setCurrentPage(currentPage + 1);
                  return;
                }
                alert("you have reached the maximum page count");
              }}>
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
};
const fetchData = async (currentPage, handleDelete, handleUpdate) => {
  const { data } = await axios.get(
    `http://127.0.0.1:3000/api/v1/dogs/breed?page=${currentPage}`
  );
  const orderedData = data.data.map((dog) => {
    const { _id, name, description, ...rest } = dog;
    return { _id, name, description, ...rest };
  });
  if (orderedData.length > 0) {
    const fixedOrder = ["_id", "name", "description"];
    const otherKeys = Object.keys(orderedData[0]).filter(
      (k) => !fixedOrder.includes(k)
    );
    const finalKeys = [...fixedOrder, ...otherKeys];

    var generatedColumns = finalKeys.map((key) => ({
      name: key === "_id" ? "ID" : key, // prettier header
      selector: (row) => {
        if (typeof row[key] === "object") {
          return Object.entries(row[key])
            .map(([k, v]) => `${k}: ${v}`)
            .join(", ");
        }
        return row[key];
      },
      width: "150px",
    }));

    // ✅ Add custom Action column at the end
    generatedColumns.push({
      name: "Action",
      cell: (row) => (
        <div>
          <button
            onClick={() => handleUpdate(row)}
            className="mr-1 px-2 py-1 bg-green-600 text-white border-0 rounded-sm cursor-pointer">
            Update
          </button>
          <button
            onClick={() => handleDelete(row)}
            className="mr-1 px-2 py-1 bg-red-600 text-white border-0 rounded-sm cursor-pointer">
            {" "}
            Delete
          </button>
        </div>
      ),
      ignoreRowClick: true,
      width: "200px",
    });
  }
  return {
    list: orderedData,
    maxPage: data.maxPage,
    columns: generatedColumns,
  };
};
export default Breed;
