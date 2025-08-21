'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';

export default function TransactionsPage() {
  const transactions = [
    { id: 1, date: '2025-08-12', stock: 'TCS', action: 'BUY', quantity: 10, price: 3500.00 },
    { id: 2, date: '2025-08-11', stock: 'RELIANCE', action: 'SELL', quantity: 5, price: 2900.50 },
    { id: 3, date: '2025-08-10', stock: 'INFY', action: 'BUY', quantity: 15, price: 1550.75 },
    { id: 4, date: '2025-08-09', stock: 'TCS', action: 'BUY', quantity: 5, price: 3450.00 },
    { id: 5, date: '2025-08-08', stock: 'WIPRO', action: 'BUY', quantity: 20, price: 400.25 },
  ];

  const [sortBy, setSortBy] = useState('date');
  const [filterBy, setFilterBy] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTransactions = transactions
    .filter(transaction => {
      if (filterBy === 'all') return true;
      return transaction.action.toLowerCase() === filterBy;
    })
    .filter(transaction =>
      transaction.stock.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'date') return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortBy === 'price') return b.price - a.price;
      return 0;
    });

  const exportToCSV = () => {
    const csvContent = [
      ['Date', 'Stock', 'Action', 'Quantity', 'Price'],
      ...filteredTransactions.map(t => [t.date, t.stock, t.action, t.quantity, t.price])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transactions.csv';
    a.click();
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-navy">Transaction History</h1>
          <button
            onClick={exportToCSV}
            className="px-4 py-2 bg-navy text-white rounded-md hover:bg-opacity-90"
          >
            Export CSV
          </button>
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <input
            type="text"
            placeholder="Search by stock..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-navy focus:border-navy"
          />
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-navy focus:border-navy"
          >
            <option value="all">All Actions</option>
            <option value="buy">Buy Only</option>
            <option value="sell">Sell Only</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-navy focus:border-navy"
          >
            <option value="date">Sort by Date</option>
            <option value="price">Sort by Price</option>
          </select>
        </div>

        {/* Transactions Table */}
        <div className="mt-8">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">Action</th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">Quantity</th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">Total</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{transaction.date}</td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{transaction.stock}</td>
                  <td className={`px-6 py-4 whitespace-no-wrap border-b border-gray-200 ${transaction.action === 'BUY' ? 'text-green-500' : 'text-red-500'}`}>
                    {transaction.action}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{transaction.quantity}</td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{transaction.price.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{(transaction.quantity * transaction.price).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
