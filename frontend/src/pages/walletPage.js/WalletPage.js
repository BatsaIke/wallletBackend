import React from 'react';
import './WalletPage.css';
import { Line } from 'react-chartjs-2';
import { enUS } from 'date-fns/locale';
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';

const WalletPage = ({ user, loading }) => {
  const totalBalance = user?.balance?.tokenValue || 0;
  const payments = user.payments;
  Chart.register(...registerables);

  const chartData = {
    labels: payments.map((payment) => payment.timestamp), // Use timestamps as labels
    datasets: [
      {
        label: 'Recent Amounts',
        data: payments.map((payment) => payment.amount),
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'time', // Use time scale for x-axis
        time: {
          unit: 'day', // Adjust the time unit as needed (day, month, year, etc.)
          displayFormats: {
            day: 'MMM d', // Use lowercase 'd' for day of the month
          },
        },
        adapters: {
          date: {
            locale: enUS,
          },
        },
      },
      y: {
        beginAtZero: true,
      },
    },
    maintainAspectRatio: true,
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
    },
    layout: {
      padding: {
        bottom: 20, // Add bottom margin of 20 pixels
      },
    },
  };
  const tooltipOptions = {
    callbacks: {
      title: function (tooltipItem) {
        return 'Date: ' + new Date(tooltipItem[0].label).toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
      },
      label: function (tooltipItem) {
        return 'Amount: ₵' + tooltipItem.formattedValue;
      },
    },
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    bodyColor: 'rgba(0, 0, 0, 0.8)',
    titleColor: 'rgba(0, 0, 0, 0.8)',
    bodySpacing: 10,
    padding: 10,
    cornerRadius: 5,
  };

  return (
    <div className="wallet-page-container">
      {loading ? (
        <p>Balance Loading...</p>
      ) : (
        <>
          <h1>Your Wallet Balance</h1>
          <span className="wallet-icon">&#128176;</span>
          <span className="wallet-balance">{totalBalance}.000Tks</span>
          <div style={{ width: '80%', marginTop: '20px', alignItems: 'center', marginBottom: '100px' }}>
          <Line data={chartData} options={options} plugins={[{ tooltip: tooltipOptions }]} />
          </div>
        </>
      )}
    </div>
  );
};

export default WalletPage;
