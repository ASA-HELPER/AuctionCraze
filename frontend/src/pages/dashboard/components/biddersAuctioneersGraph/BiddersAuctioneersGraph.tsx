import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { monthLabels } from "../../../../constants/common-constants";
import dashboardCopy from "../../dashboard.copy";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement
);

const BiddersAuctioneersGraph = () => {
  const { totalAuctioneers, totalBidders } = useSelector(
    (state: RootState) => state.admin
  );

  const data = {
    labels: monthLabels,
    datasets: [
      {
        label: dashboardCopy.chartLabels.bidders,
        data: totalBidders,
        borderColor: dashboardCopy.chartColors.bidders,
        fill: false,
      },
      {
        label: dashboardCopy.chartLabels.auctioneers,
        data: totalAuctioneers,
        borderColor: dashboardCopy.chartColors.auctioneers,
        fill: false,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        max: 50,
        ticks: {
          callback: function (value: any) {
            return value.toLocaleString();
          },
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: dashboardCopy.chartLabels.title,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default BiddersAuctioneersGraph;
