import React, { useEffect, useState } from "react";

const Custom_Filter: React.FC<any> = ({ value, data, setFilteredData }) => {
  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);

  useEffect(() => {
    const filteredData = data.filter(
      (item: any) =>
        JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !==
        -1
    );
    setFilteredData(filteredData);
  }, [filterText]);

  return (
    <div>
      <input
        style={{
          padding: "8px",
          fontSize: "14px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          width: "200px",
        }}
        value={filterText}
        placeholder="Search"
        onChange={(e) => setFilterText(e.target.value)}
      />
    </div>
  );
};

export default Custom_Filter;
