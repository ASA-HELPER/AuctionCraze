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
import { Bar } from "react-chartjs-2";
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

const PaymentGraph = () => {
  const { monthlyRevenue } = useSelector((state: RootState) => state.admin);

  const data = {
    labels: monthLabels,
    datasets: [
      {
        label: dashboardCopy.chartLabels.payment,
        data: monthlyRevenue,
        backgroundColor: dashboardCopy.chartColors.bidders,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        max: 5000,
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
        text: dashboardCopy.chartLabels.paymentTitle,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default PaymentGraph;
