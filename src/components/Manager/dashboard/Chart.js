import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
} from 'recharts';
import Title from './Title';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

export default function Chart() {
  const theme = useTheme();
  const [data, setData] = useState([]);
  const [selectedTimeRange, setSelectedTimeRange] = useState('day');

  useEffect(() => {
    // Make the HTTP request to fetch all data
    axios.get('http://birdsellingapi-001-site1.ctempurl.com/api/Order/GetAll')
      .then((response) => {
        // Filter data based on the selected time range
        const filteredData = filterDataByTimeRange(response.data.data, selectedTimeRange);

        // Group data by time range
        const groupedData = groupDataByTimeRange(filteredData, selectedTimeRange);

        setData(
          Object.keys(groupedData).map((time) =>
            createData(time, groupedData[time].length)
          )
        );
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [selectedTimeRange]);

  const filterDataByTimeRange = (data, timeRange) => {
    // Implement logic to filter data based on the selected time range
    // For simplicity, let's assume the data is already filtered on the server-side
    return data;
  };

  const groupDataByTimeRange = (data, timeRange) => {
    // Implement logic to group data by day, week, month, etc.
    // You may want to use a library like date-fns for this purpose
    // For simplicity, let's assume the data is already grouped by the selected time range
    return data.reduce((result, item) => {
      const timeKey = getTimeKey(item.order_date, timeRange);
      result[timeKey] = result[timeKey] || [];
      result[timeKey].push(item);
      return result;
    }, {});
  };

  const getTimeKey = (dateString, timeRange) => {
    const date = new Date(dateString);
    switch (timeRange) {
      case 'day':
        return date.toLocaleDateString();
      case 'week':
        // Implement logic to get the week key
        // You may want to use a library like date-fns for this purpose
        return 'Week ' + getWeekNumber(date);
      case 'month':
        return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      default:
        return '';
    }
  };

  const getWeekNumber = (date) => {
    // Implement logic to get the week number
    // You may want to use a library like date-fns for this purpose
    return 1;
  };

  const handleTimeRangeChange = (event) => {
    const value = event.target.value;
    setSelectedTimeRange(value);
  };
  return (
    <React.Fragment>
      <Title>{`Order DashBoard`}</Title>
      <Select value={selectedTimeRange} onChange={handleTimeRangeChange}>
        <MenuItem value="day">Day</MenuItem>
        <MenuItem value="week">Week</MenuItem>
        <MenuItem value="month">Month</MenuItem>
      </Select>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="time"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
            tickFormatter={(value) => Math.round(value)} // Display only integers
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: 'middle',
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Orders
            </Label>
          </YAxis>
          <Bar
            dataKey="amount"
            fill={theme.palette.primary.main}
          />
        </BarChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
