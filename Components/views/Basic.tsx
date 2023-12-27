import React from "react";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

import getChartColorsArray from "../../Components/Common/ChartsDynamicColor";

const Basic = ({ dataColors, active_vms }: any) => {
  var BasicColors = getChartColorsArray(dataColors);
  const series = [
    {
      data: [380, 430, 450, 475, 550, 584, 780, 1100, 1220, 1365],
    },
  ];

  const options = {
    chart: {
      toolbar: {
        show: !1,
      },
    },
    plotOptions: {
      bar: {
        horizontal: !0,
      },
    },
    dataLabels: {
      enabled: !1,
    },
    colors: BasicColors,
    grid: {
      borderColor: "#f1f1f1",
    },
    xaxis: {
      categories: active_vms,
    },
  };

  return (
    <React.Fragment>
      <ReactApexChart
        dir="ltr"
        className="apex-charts"
        options={options}
        series={series}
        type="bar"
        height={350}
      />
    </React.Fragment>
  );
};

export default Basic;
