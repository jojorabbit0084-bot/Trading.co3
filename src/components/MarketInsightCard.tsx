'use client';

import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Gauge } from 'lucide-react';

interface MarketData {
  nifty: {
    value: string;
    change: number;
  };
  bankNifty: {
    value: string;
    change: number;
  };
  volatility: string;
}

const getMarketData = async (): Promise<MarketData> => {
  // Placeholder for real-time API call
  // In a real application, this would fetch data from a market data API.
  // For now, we'll simulate dynamic data.
  const niftyChange = parseFloat((Math.random() * 3 - 1.5).toFixed(2)); // -1.5% to +1.5%
  const bankNiftyChange = parseFloat((Math.random() * 2 - 1).toFixed(2)); // -1% to +1%
  const volatilityOptions = ['Low', 'Moderate', 'High'];
  const randomVolatility = volatilityOptions[Math.floor(Math.random() * volatilityOptions.length)];

  return {
    nifty: {
      value: (19500 + niftyChange * 100).toFixed(2), // Simulate NIFTY value
      change: niftyChange,
    },
    bankNifty: {
      value: (44000 + bankNiftyChange * 100).toFixed(2), // Simulate BANKNIFTY value
      change: bankNiftyChange,
    },
    volatility: randomVolatility,
  };
};

const MarketInsightCard: React.FC = () => {
  const [marketData, setMarketData] = useState<MarketData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getMarketData();
      setMarketData(data);
    } catch (err) {
      setError('Failed to fetch market data.');
      console.error('Error fetching market data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data initially
    const interval = setInterval(fetchData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 animate-pulse">
        <h4 className="text-lg font-semibold text-white mb-3">📈 Today's Market Insight</h4>
        <p className="text-gray-400 text-sm">Loading real-time data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-danger/10 backdrop-blur-sm p-6 rounded-xl border border-danger/20">
        <h4 className="text-lg font-semibold text-danger mb-3">Market Data Error</h4>
        <p className="text-danger-200 text-sm">{error}</p>
      </div>
    );
  }

  if (!marketData) {
    return null; // Should not happen if loading and error are handled
  }

  const getNiftyColor = marketData.nifty.change >= 0 ? 'text-success' : 'text-danger';
  const getBankNiftyColor = marketData.bankNifty.change >= 0 ? 'text-success' : 'text-danger';

  return (
    <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
      <h4 className="text-lg font-semibold text-white mb-3">📈 Today's Market Insight</h4>
      <p className="text-gray-200 text-sm mb-2">
        Market movements are dynamic. Stay updated with real-time insights!
      </p>
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center space-x-2">
            {marketData.nifty.change >= 0 ? (
              <TrendingUp className={`w-4 h-4 ${getNiftyColor}`} />
            ) : (
              <TrendingDown className={`w-4 h-4 ${getNiftyColor}`} />
                        )}
            <span className={`${getNiftyColor}`}>NIFTY:</span>
          </span>
          <span className={`${getNiftyColor} font-semibold`}>
            {marketData.nifty.value} ({marketData.nifty.change > 0 ? '+' : ''}{marketData.nifty.change}%)
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center space-x-2">
            {marketData.bankNifty.change >= 0 ? (
              <TrendingUp className={`w-4 h-4 ${getBankNiftyColor}`} />
            ) : (
              <TrendingDown className={`w-4 h-4 ${getBankNiftyColor}`} />
            )}
            <span className={`${getBankNiftyColor}`}>BANKNIFTY:</span>
          </span>
          <span className={`${getBankNiftyColor} font-semibold`}>
            {marketData.bankNifty.value} ({marketData.bankNifty.change > 0 ? '+' : ''}{marketData.bankNifty.change}%)
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center space-x-2">
            <Gauge className="w-4 h-4 text-primary-400" />
            <span className="text-gray-300">Volatility:</span>
          </span>
          <span className="text-primary-300 font-semibold">{marketData.volatility}</span>
        </div>
      </div>
    </div>
  );
};

export default MarketInsightCard;
