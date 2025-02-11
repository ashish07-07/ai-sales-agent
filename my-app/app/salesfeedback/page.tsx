// 'use client';

// import { useEffect, useState } from 'react';
// import SentimentPieChart from '../components/SentimentPieChart';

// export default function Home() {
//   const [chartData, setChartData] = useState<any[]>([]);

//   useEffect(() => {
//     // Fetch data from your API
//     fetch('/api/analyze')
//       .then((res) => res.json())
//       .then((data) => {
//         // Transform the data for the chart
//         const transformedData = data.response.map((item: any) => ({
//           name: item.label,
//           value: parseFloat((item.score * 100).toFixed(2)), // Convert score to percentage
//         }));
//         setChartData(transformedData);
//       });
//   }, []);

//   return (
//     <div>
//       <h1>Sentiment Analysis Results</h1>
//       <SentimentPieChart data={chartData} />
//     </div>
//   );
// }
// "use client"
// import React, { useEffect, useState } from 'react';
// import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
// import { ArrowLeft } from 'lucide-react';

// const COLORS = {
//   Positive: '#10B981',
//   Neutral: '#6366F1',
//   Negative: '#EF4444',
//   Mixed: '#F59E0B',
//   Extreme: '#7C3AED'
// };

// export default function SentimentDashboard() {
//   const [chartData, setChartData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     // Actual API call
//     fetch('/api/analyze')
//       .then((res) => res.json())
//       .then((data) => {
//         const transformedData = data.response.map((item) => ({
//           name: item.label,
//           value: parseFloat((item.score * 100).toFixed(2)),
//         }));
//         setChartData(transformedData);
//         setIsLoading(false);
//       })
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//         setIsLoading(false);
//       });
//   }, []);

//   const handleBack = () => {
//     window.history.back();
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       <div className="max-w-6xl mx-auto">
//         <button
//           onClick={handleBack}
//           className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
//         >
//           <ArrowLeft size={20} />
//           <span>Back to Dashboard</span>
//         </button>

//         <div className="bg-white rounded-lg shadow-lg overflow-hidden">
//           <div className="p-6 border-b border-gray-200">
//             <h1 className="text-2xl font-bold text-gray-900">
//               Sentiment Analysis Results
//             </h1>
//           </div>
//           <div className="p-6">
//             {isLoading ? (
//               <div className="h-96 flex items-center justify-center">
//                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
//               </div>
//             ) : (
//               <div className="h-96">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <PieChart>
//                     <Pie
//                       data={chartData}
//                       cx="50%"
//                       cy="50%"
//                       innerRadius={60}
//                       outerRadius={120}
//                       paddingAngle={5}
//                       dataKey="value"
//                     >
//                       {chartData.map((entry, index) => (
//                         <Cell
//                           key={`cell-${index}`}
//                           fill={COLORS[entry.name]}
//                           className="hover:opacity-80 transition-opacity"
//                         />
//                       ))}
//                     </Pie>
//                     <Tooltip
//                       content={({ payload }) => {
//                         if (payload && payload.length) {
//                           return (
//                             <div className="bg-white p-2 shadow rounded border">
//                               <p className="text-sm font-medium">
//                                 {payload[0].name}: {payload[0].value}%
//                               </p>
//                             </div>
//                           );
//                         }
//                         return null;
//                       }}
//                     />
//                     <Legend
//                       layout="horizontal"
//                       verticalAlign="bottom"
//                       align="center"
//                       className="text-sm"
//                     />
//                   </PieChart>
//                 </ResponsiveContainer>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// "use client";
// import React, { useEffect, useState } from "react";
// import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";
// import { ArrowLeft } from "lucide-react";

// const COLORS:any= {
//   "5 stars": "#10B981",
//   "4 stars": "#6366F1",
//   "3 stars": "#F59E0B",
//   "2 stars": "#EF4444",
//   "1 star": "#7C3AED"
// };

// export default function SentimentDashboard() {
//   const [chartData, setChartData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetch("/api/analyze")
//       .then((res) => {
//         if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
//         return res.text(); // Read as text first
//       })
//       .then((text) => {
//         if (!text) throw new Error("Empty response from API");
//         return JSON.parse(text);
//       })
//       .then((data) => {
//         if (!data.response || !Array.isArray(data.response)) {
//           throw new Error("Invalid API response format");
//         }

//         const transformedData = data.response.map((item) => ({
//           name: item.label,
//           value: parseFloat((item.score * 100).toFixed(2))
//         }));

//         setChartData(transformedData);
//         setIsLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching data:", err);
//         setError(err.message);
//         setIsLoading(false);
//       });
//   }, []);

//   const handleBack = () => {
//     window.history.back();
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       <div className="max-w-6xl mx-auto">
//         <button
//           onClick={handleBack}
//           className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
//         >
//           <ArrowLeft size={20} />
//           <span>Back to Dashboard</span>
//         </button>

//         <div className="bg-white rounded-lg shadow-lg overflow-hidden">
//           <div className="p-6 border-b border-gray-200">
//             <h1 className="text-2xl font-bold text-gray-900">
//               Sentiment Analysis Results
//             </h1>
//           </div>
//           <div className="p-6">
//             {isLoading ? (
//               <div className="h-96 flex items-center justify-center">
//                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
//               </div>
//             ) : error ? (
//               <div className="h-96 flex items-center justify-center text-red-500">
//                 {error}
//               </div>
//             ) : (
//               <div className="h-96">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <PieChart>
//                     <Pie
//                       data={chartData}
//                       cx="50%"
//                       cy="50%"
//                       innerRadius={60}
//                       outerRadius={120}
//                       paddingAngle={5}
//                       dataKey="value"
//                     >
//                       {chartData.map((entry, index) => (
//                         <Cell
//                           key={`cell-${index}`}
//                           fill={COLORS[entry.name] || "#8884d8"} // Default color if missing
//                           className="hover:opacity-80 transition-opacity"
//                         />
//                       ))}
//                     </Pie>
//                     <Tooltip
//                       content={({ payload }) => {
//                         if (payload && payload.length && payload[0].payload) {
//                           return (
//                             <div className="bg-white p-2 shadow rounded border">
//                               <p className="text-sm font-medium">
//                                 {payload[0].payload.name}: {payload[0].payload.value}%
//                               </p>
//                             </div>
//                           );
//                         }
//                         return null;
//                       }}
//                     />
//                     <Legend layout="horizontal" verticalAlign="bottom" align="center" className="text-sm" />
//                   </PieChart>
//                 </ResponsiveContainer>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



// 'use client';
// import React, { useEffect, useState } from 'react';
// import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
// import { ArrowLeft } from 'lucide-react';

// const COLORS = {
//   Positive: '#10B981',
//   Neutral: '#6366F1',
//   Negative: '#EF4444',
//   Mixed: '#F59E0B',
//   Extreme: '#7C3AED'
// };

// export default function SentimentDashboard() {
//   const [chartData, setChartData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('/api/analyze');
        
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
        
//         // Get the response text first to debug any issues
//         const responseText = await response.text();
        
//         // Try to parse the JSON
//         let data;
//         try {
//           data = JSON.parse(responseText);
//         } catch (e) {
//           console.error('Raw API response:', responseText);
//           throw new Error('Invalid JSON response from API');
//         }

//         if (!data || !data.response) {
//           throw new Error('Invalid data format received');
//         }

//         const transformedData = data.response.map((item) => ({
//           name: item.label,
//           value: parseFloat((item.score * 100).toFixed(2)),
//         }));

//         setChartData(transformedData);
//         setError(null);
//       } catch (err) {
//         console.error('Error details:', err);
//         setError(err.message);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleBack = () => {
//     window.history.back();
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       <div className="max-w-6xl mx-auto">
//         <button
//           onClick={handleBack}
//           className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
//         >
//           <ArrowLeft size={20} />
//           <span>Back to Dashboard</span>
//         </button>

//         <div className="bg-white rounded-lg shadow-lg overflow-hidden">
//           <div className="p-6 border-b border-gray-200">
//             <h1 className="text-2xl font-bold text-gray-900">
//               Sentiment Analysis Results
//             </h1>
//           </div>
//           <div className="p-6">
//             {isLoading ? (
//               <div className="h-96 flex items-center justify-center">
//                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
//               </div>
//             ) : error ? (
//               <div className="h-96 flex items-center justify-center">
//                 <div className="text-red-500 text-center">
//                   <p className="font-medium">Error loading data</p>
//                   <p className="text-sm mt-2">{error}</p>
//                 </div>
//               </div>
//             ) : (
//               <div className="h-96">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <PieChart>
//                     <Pie
//                       data={chartData}
//                       cx="50%"
//                       cy="50%"
//                       innerRadius={60}
//                       outerRadius={120}
//                       paddingAngle={5}
//                       dataKey="value"
//                     >
//                       {chartData.map((entry, index) => (
//                         <Cell
//                           key={`cell-${index}`}
//                           fill={COLORS[entry.name]}
//                           className="hover:opacity-80 transition-opacity"
//                         />
//                       ))}
//                     </Pie>
//                     <Tooltip
//                       content={({ payload }) => {
//                         if (payload && payload.length) {
//                           return (
//                             <div className="bg-white p-2 shadow rounded border">
//                               <p className="text-sm font-medium">
//                                 {payload[0].name}: {payload[0].value}%
//                               </p>
//                             </div>
//                           );
//                         }
//                         return null;
//                       }}
//                     />
//                     <Legend
//                       layout="horizontal"
//                       verticalAlign="bottom"
//                       align="center"
//                       className="text-sm"
//                     />
//                   </PieChart>
//                 </ResponsiveContainer>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
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