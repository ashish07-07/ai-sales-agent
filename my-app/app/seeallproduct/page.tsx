// "use client"
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Image from 'next/image';
// import { MessageCircle, ShoppingBag, X } from 'lucide-react';
// import { useRouter } from 'next/navigation';


// const CustomAlert = ({ children, onClose }: { children: React.ReactNode; onClose?: () => void }) => (
//   <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative shadow-lg">
//     <span className="block sm:inline">{children}</span>
//     {onClose && (
//       <button 
//         onClick={onClose}
//         className="absolute top-0 right-0 px-4 py-3"
//       >
//         <X className="h-4 w-4" />
//       </button>
//     )}
//   </div>
// );

// const ProductAndChat = () => {
//   const router = useRouter();
//   const [activeTab, setActiveTab] = useState('products');
//   const [productdata, setproductdata] = useState<any>([]);
//   const [showChat, setShowChat] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState<any>(null);
//   const [showNotification, setShowNotification] = useState(false);

//   useEffect(() => {
//     async function Getalldetails() {
//       try {
//         const productdetails = await axios.get("/api/getproducts");
//         setproductdata(productdetails.data.products);
//       } catch (e) {
//         console.error("Error fetching products", e);
//       }
//     }
//     Getalldetails();
//   }, []);

//   const handleChatRequest = (product: any) => {
//     router.push('/chatmodel')
//     // setSelectedProduct(product);
//     // setShowNotification(true);
//     // setTimeout(() => setShowNotification(false), 3000);
//   };

//   const handleSeeMore = (product: any) => {

//     sessionStorage.setItem('selectedProduct', JSON.stringify({
//       itemName: product.itemName,
//       description: product.description,
//       cost: product.cost,
//       stock: product.stock,
//       imageLink: product.imageLink,
//       sizes: product.sizes
//     }));
    
 
//     router.push('/seedetail');
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
//       {/* Rest of the component remains the same... */}
//       {/* Navigation Tabs */}
//       <div className="bg-gradient-to-r from-blue-600 to-purple-600 shadow">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="flex space-x-8">
//             <button
//               onClick={() => setActiveTab('products')}
//               className={`flex items-center px-4 py-3 text-sm font-medium border-b-2 ${
//                 activeTab === 'products'
//                   ? 'border-white text-white'
//                   : 'border-transparent text-blue-100 hover:text-white'
//               }`}
//             >
//               <ShoppingBag className="w-5 h-5 mr-2" />
//               Products
//             </button>
//             {/* <button
//               onClick={() => setActiveTab('chat')}
//               className={`flex items-center px-4 py-3 text-sm font-medium border-b-2 ${
//                 activeTab === 'chat'
//                   ? 'border-white text-white'
//                   : 'border-transparent text-blue-100 hover:text-white'
//               }`}
//             >
//               <MessageCircle className="w-5 h-5 mr-2" />
//               Chat Support
//             </button> */}
//             <button onClick={function()
//               {
//                   router.push('/chatmodel')
//               }
//             }></button>
//           </div>
//         </div>
//       </div>

//       {/* Custom Notification */}
//       {showNotification && (
//         <div className="fixed top-4 right-4 z-50">
//           <CustomAlert onClose={() => setShowNotification(false)}>
//             Our agent will contact you shortly about {selectedProduct?.itemName}
//           </CustomAlert>
//         </div>
//       )}

//       {/* Content Area */}
//       <div className="max-w-7xl mx-auto px-4 py-6">
//         {activeTab === 'products' ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {productdata.map((val:any, index:any) => (
//               <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
//                 <div className="relative h-64 w-full">
//                   <Image
//                     src={val.imageLink}
//                     alt={val.itemName}
//                     layout="fill"
//                     objectFit="cover"
//                     className="transition-transform hover:scale-105"
//                   />
//                 </div>
//                 <div className="p-6 bg-gradient-to-b from-white to-blue-50">
//                   <h2 className="text-2xl font-semibold text-gray-800 mb-2">{val.itemName}</h2>
//                   <p className="text-gray-600 mb-4 line-clamp-2">{val.description}</p>
//                   <div className="flex justify-between items-center mb-4">
//                     <span className="text-2xl font-bold text-blue-600">₹{val.cost}</span>
//                     <span className="text-lg font-medium text-gray-700 bg-blue-100 px-3 py-1 rounded-full">
//                       Stock: {val.stock}
//                     </span>
//                   </div>
//                   <div className="mb-4">
//                     <p className="text-lg font-medium text-gray-700 mb-2">Available sizes:</p>
//                     <div className="flex flex-wrap gap-2">
//                       {val.sizes.map((size:any, idx:any) => (
//                         <span key={idx} className="px-4 py-2 text-sm bg-purple-100 text-purple-700 rounded-full font-medium">
//                           {size}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                   <div className="flex gap-2">
//                     <button 
//                       onClick={() => handleSeeMore(val)}
//                       className="flex-1 bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors font-medium"
//                     >
//                       See More Info
//                     </button>
//                     <button 
//                       onClick={() => handleChatRequest(val)}
//                       className="px-4 bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700 transition-colors"
//                     >
//                       <MessageCircle className="w-5 h-5" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
//             <div className="text-center">
//               <MessageCircle className="w-16 h-16 text-purple-500 mx-auto mb-4" />
//               <h2 className="text-2xl font-semibold text-gray-800 mb-2">Chat Support</h2>
//               <p className="text-gray-600 mb-6">
//                 Have questions about our products? Our support team is here to help!
//               </p>
//               <div className="bg-purple-50 p-6 rounded-lg">
//                 <p className="text-lg text-purple-700">Chat functionality coming soon...</p>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductAndChat;

"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { MessageCircle, ShoppingBag, X, Home } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Create a utility for caching products in localStorage
const productCache = {
  saveProducts: (products:any) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cachedProducts', JSON.stringify(products));
      localStorage.setItem('productsCacheTimestamp', Date.now().toString());
    }
  },
  getProducts: () => {
    if (typeof window !== 'undefined') {
      const cachedData = localStorage.getItem('cachedProducts');
      const timestamp = localStorage.getItem('productsCacheTimestamp');
      
      // Cache expires after 1 hour (3600000 ms)
      const isExpired = timestamp && (Date.now() - parseInt(timestamp)) > 3600000;
      
      if (cachedData && !isExpired) {
        return JSON.parse(cachedData);
      }
    }
    return null;
  },
  isCacheValid: () => {
    if (typeof window !== 'undefined') {
      const timestamp = localStorage.getItem('productsCacheTimestamp');
      // Cache expires after 1 hour (3600000 ms)
      return timestamp && (Date.now() - parseInt(timestamp)) <= 3600000;
    }
    return false;
  }
};

const CustomAlert = ({ children, onClose }: { children: React.ReactNode; onClose?: () => void }) => (
  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative shadow-lg">
    <span className="block sm:inline">{children}</span>
    {onClose && (
      <button 
        onClick={onClose}
        className="absolute top-0 right-0 px-4 py-3"
      >
        <X className="h-4 w-4" />
      </button>
    )}
  </div>
);

const ProductAndChat = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('products');
  const [productdata, setproductdata] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    async function Getalldetails() {
      setLoading(true);
      try {
        // First check if we have valid cached data
        const cachedProducts = productCache.getProducts();
        
        if (cachedProducts) {
          console.log("Using cached product data");
          setproductdata(cachedProducts);
          setLoading(false);
          return;
        }
        
        // If no cache or expired, fetch from API
        console.log("Fetching fresh product data");
        const productdetails = await axios.get("/api/getproducts");
        const fetchedProducts = productdetails.data.products;
        
        // Save to cache
        productCache.saveProducts(fetchedProducts);
        setproductdata(fetchedProducts);
      } catch (e) {
        console.error("Error fetching products", e);
      } finally {
        setLoading(false);
      }
    }
    Getalldetails();
  }, []);

  const handleChatRequest = (product: any) => {
    router.push('/chatmodel');
  };

  const handleSeeMore = (product: any) => {
    sessionStorage.setItem('selectedProduct', JSON.stringify({
      itemName: product.itemName,
      description: product.description,
      cost: product.cost,
      stock: product.stock,
      imageLink: product.imageLink,
      sizes: product.sizes
    }));
    
    router.push('/seedetail');
  };

  const navigateToHome = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Home Button at the top */}
      <div className="bg-white shadow-sm p-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <button 
            onClick={navigateToHome}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
          >
            <Home className="w-5 h-5 mr-2" />
            Home
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 shadow">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('products')}
              className={`flex items-center px-4 py-3 text-sm font-medium border-b-2 ${
                activeTab === 'products'
                  ? 'border-white text-white'
                  : 'border-transparent text-blue-100 hover:text-white'
              }`}
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              Products
            </button>
            <button onClick={() => router.push('/chatmodel')} className="flex items-center px-4 py-3 text-sm font-medium border-transparent text-blue-100 hover:text-white border-b-2">
              <MessageCircle className="w-5 h-5 mr-2" />
              Chat Support
            </button>
          </div>
        </div>
      </div>

      {/* Custom Notification */}
      {showNotification && (
        <div className="fixed top-4 right-4 z-50">
          <CustomAlert onClose={() => setShowNotification(false)}>
            Our agent will contact you shortly about {selectedProduct?.itemName}
          </CustomAlert>
        </div>
      )}

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === 'products' ? (
          <>
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {productdata.map((val:any, index:any) => (
                  <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="relative h-64 w-full">
                      <Image
                        src={val.imageLink}
                        alt={val.itemName}
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform hover:scale-105"
                      />
                    </div>
                    <div className="p-6 bg-gradient-to-b from-white to-blue-50">
                      <h2 className="text-2xl font-semibold text-gray-800 mb-2">{val.itemName}</h2>
                      <p className="text-gray-600 mb-4 line-clamp-2">{val.description}</p>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-2xl font-bold text-blue-600">₹{val.cost}</span>
                        <span className="text-lg font-medium text-gray-700 bg-blue-100 px-3 py-1 rounded-full">
                          Stock: {val.stock}
                        </span>
                      </div>
                      <div className="mb-4">
                        <p className="text-lg font-medium text-gray-700 mb-2">Available sizes:</p>
                        <div className="flex flex-wrap gap-2">
                          {val.sizes.map((size:any, idx:any) => (
                            <span key={idx} className="px-4 py-2 text-sm bg-purple-100 text-purple-700 rounded-full font-medium">
                              {size}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleSeeMore(val)}
                          className="flex-1 bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors font-medium"
                        >
                          See More Info
                        </button>
                        <button 
                          onClick={() => handleChatRequest(val)}
                          className="px-4 bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700 transition-colors"
                        >
                          <MessageCircle className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
            <div className="text-center">
              <MessageCircle className="w-16 h-16 text-purple-500 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Chat Support</h2>
              <p className="text-gray-600 mb-6">
                Have questions about our products? Our support team is here to help!
              </p>
              <div className="bg-purple-50 p-6 rounded-lg">
                <p className="text-lg text-purple-700">Chat functionality coming soon...</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductAndChat;