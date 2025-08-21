'use client';

import Sidebar from '@/components/Sidebar';

export default function InvestmentsPage() {
  const investments = [
    { date: '2025-08-12', stock: 'TCS', quantity: 10, buyPrice: 3500.00, currentPrice: 3600.00, pl: 1000.00 },
    { date: '2025-08-11', stock: 'RELIANCE', quantity: 5, buyPrice: 2800.50, currentPrice: 2900.50, pl: 500.00 },
    { date: '2025-08-10', stock: 'INFY', quantity: 15, buyPrice: 1500.75, currentPrice: 1550.75, pl: 750.00 },
  ];

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-navy">My Investments</h1>
        <div className="mt-8">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">Date/Time</th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">Quantity</th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">Buy Price</th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">Current Price</th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">P/L</th>
              </tr>
            </thead>
            <tbody>
              {investments.map((investment, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{investment.date}</td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{investment.stock}</td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{investment.quantity}</td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{investment.buyPrice}</td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{investment.currentPrice}</td>
                  <td className={`px-6 py-4 whitespace-no-wrap border-b border-gray-200 ${investment.pl >= 0 ? 'text-green-500' : 'text-red-500'}`}>{investment.pl}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
