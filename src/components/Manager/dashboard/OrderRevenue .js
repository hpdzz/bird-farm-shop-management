import React, { useState, useEffect } from 'react';
import { Typography, Paper } from '@mui/material';

const OrderRevenue = ({ timeRange }) => {
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://birdsellingapi-001-site1.ctempurl.com/api/Order/GetAll');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        const orders = data.data; // Extract the array of orders from the response

        // Filter orders based on the selected time range and orderStatus
        const filteredOrders = orders.filter((order) => {
          const orderDate = new Date(order.order_date);
          const currentDate = new Date();

          const isCorrectTimeRange =
            (timeRange === 'day' &&
              orderDate.getDate() === currentDate.getDate() &&
              orderDate.getMonth() === currentDate.getMonth() &&
              orderDate.getFullYear() === currentDate.getFullYear()) ||
            (timeRange === 'week' &&
              orderDate >= getWeekStartDate(currentDate) &&
              orderDate <= getWeekEndDate(currentDate)) ||
            (timeRange === 'month' &&
              orderDate.getMonth() === currentDate.getMonth() &&
              orderDate.getFullYear() === currentDate.getFullYear());

          return isCorrectTimeRange && order.orderStatus === 4;
        });

        // Calculate total revenue for the filtered orders
        const total = filteredOrders.reduce((acc, order) => acc + parseFloat(order.orderTotal), 0);
        setTotalRevenue(total);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [timeRange]);

  const getWeekStartDate = (date) => {
    const startDate = new Date(date);
    startDate.setDate(date.getDate() - date.getDay());
    return startDate;
  };

  const getWeekEndDate = (date) => {
    const endDate = new Date(date);
    endDate.setDate(date.getDate() - date.getDay() + 6);
    return endDate;
  };

  return (
    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h6" gutterBottom>
        Total Order Revenue ({timeRange})
      </Typography>
      <Typography variant="h4">
        ${totalRevenue.toFixed(2)}
      </Typography>
    </Paper>
  );
};

export default OrderRevenue;
