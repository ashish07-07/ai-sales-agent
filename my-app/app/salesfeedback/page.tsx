
"use client"
import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowLeft } from 'lucide-react';

const COLORS = {
  '1 star':  '#FF0000',  // Red for very negative
  '2 stars': '#F59E0B', // Orange for negative
  '3 stars': '#FCD34D', // Yellow for neutral
  '4 stars': '#10B981', // Green for positive
  '5 stars': '#059669'  // Dark green for very positive
};

export default function SentimentDashboard() {
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/analyze', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data || !data.response) {
          throw new Error('Invalid data format received');
        }

        // Process the sentiment analysis results
        const sentimentCounts = data.response.reduce((acc, curr) => {
          const label = `${curr.label.split(' ')[0]} stars`;
          acc[label] = (acc[label] || 0) + 1;
          return acc;
        }, {});

        // Transform the data for the pie chart
        const transformedData = Object.entries(sentimentCounts).map(([name, count]) => ({
          name,
          value: (count as number)
        }));

        setChartData(transformedData);
        setError(null);
      } catch (err) {
        console.error('Error details:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={handleBack}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Dashboard</span>
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">
              Feedback Sentiment Analysis
            </h1>
          </div>
          <div className="p-6">
            {isLoading ? (
              <div className="h-96 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
              </div>
            ) : error ? (
              <div className="h-96 flex items-center justify-center">
                <div className="text-red-500 text-center">
                  <p className="font-medium">Error loading sentiment data</p>
                  <p className="text-sm mt-2">{error}</p>
                </div>
              </div>
            ) : (
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        // <Cell
                        //   key={`cell-${index}`}
                        //   fill={COLORS[entry.name]}
                        //   className="hover:opacity-80 transition-opacity"
                        // />
                        <Cell
                        key={`cell-${index}`}
                        fill={COLORS[entry.name] || "#FF0000"} // Use default red if undefined
                        className="hover:opacity-80 transition-opacity"
                      />
                      ))}
                    </Pie>
                    <Tooltip
                      content={({ payload }) => {
                        if (payload && payload.length) {
                          return (
                            <div className="bg-white p-2 shadow rounded border">
                              <p className="text-sm font-medium">
                                {payload[0].name}: {payload[0].value} feedback(s)
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend
                      layout="horizontal"
                      verticalAlign="bottom"
                      align="center"
                      className="text-sm"
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}