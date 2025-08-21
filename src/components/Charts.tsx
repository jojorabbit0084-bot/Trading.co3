'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const portfolioData = [
  { name: 'Jan', value: 100000 },
  { name: 'Feb', value: 105000 },
  { name: 'Mar', value: 110000 },
  { name: 'Apr', value: 115000 },
  { name: 'May', value: 120000 },
  { name: 'Jun', value: 125000 },
];

const allocationData = [
  { name: 'TCS', value: 400 },
  { name: 'RELIANCE', value: 300 },
  { name: 'INFY', value: 300 },
];

const COLORS = ['#001f3f', '#2ECC40', '#FFDC00'];

export function PortfolioChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={portfolioData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#001f3f" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function AllocationChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={allocationData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {allocationData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
