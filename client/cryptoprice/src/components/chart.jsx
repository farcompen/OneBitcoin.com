import Chart from "react-apexcharts"

const ChartComponent = ({values})=>{

    const chartsConfig = {
        chart: {
          toolbar: {
            show: false,
          },
        },
        title: {
          show: "",
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          axisTicks: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
          labels: {
            show: false,
          },
        },
        yaxis: {
          labels: {
            show: false,
          },
        },
        grid: {
          show: true,
          borderColor: "#EEEEEE",
          strokeDashArray: 5,
          xaxis: {
            lines: {
              show: false,
            },
           
          },
          padding: {
            top: 5,
            right: 20,
          },
        },
        fill: {
          opacity: 0.8,
        },
        tooltip: {
          theme: "light",
        },
      };

    const priceChart = {
        type: "area",
        height: 100,
        width:100,
        series: [
          {
           
            data:values}
        ],
        options: {
          ...chartsConfig,
          colors: ["#388e3c"],
          stroke: {
            lineCap: "round",
            width: 2,
          },
          fill: {
            opacity: 0,
            type: "outline",
          },
          xaxis: {
            ...chartsConfig.xaxis
        
          },
        },
      };
return(
    <>
    <Chart {...priceChart}/>
    </>
)
}

export default ChartComponent