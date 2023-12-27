import React, { useEffect, useState } from "react";

const Custom_Filter: React.FC<any> = ({ value, data, setFilteredData }) => {
  const [filterText, setFilterText] = React.useState("");
  const [dataaaaa, setDatta] = useState<any>([]);
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
  const filteredItems = (value: any) => {
    setFilterText(value);
    setFilteredData(
      data.filter(
        (item: any) =>
          JSON.stringify(item)
            .toLowerCase()
            .indexOf(filterText.toLowerCase()) !== -1
      )
    );
  };

  // console.log(dataaaaa);
  return (
    <div>
      <input
        style={{
          padding: "8px", // Adjust padding as needed
          fontSize: "14px", // Adjust font size as needed
          borderRadius: "5px", // Add border radius for a rounded look
          border: "1px solid #ccc", // Add border for a neat appearance
          width: "200px", // Set the desired width for the input field
        }}
        value={filterText}
        placeholder="Search"
        onChange={(e) => filteredItems(e.target.value)}
      />
    </div>
  );
};

export default Custom_Filter;
