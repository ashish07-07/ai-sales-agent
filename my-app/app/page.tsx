// "use client"
// import React from 'react';
// import { useState, useEffect } from 'react';
// import { ArrowRight, CheckCircle, Sparkles, Shield, Zap, Globe, Database, Code } from 'lucide-react';

// const LandingPage = () => {
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     setIsVisible(true);
//   }, []);

//   const features = [
//     {
//       icon: <Globe className="w-6 h-6" />,
//       title: "Global Scale",
//       description: "Deploy worldwide with zero latency through our edge network"
//     },
//     {
//       icon: <Database className="w-6 h-6" />,
//       title: "Smart Storage",
//       description: "Intelligent data management with automatic optimization"
//     },
//     {
//       icon: <Code className="w-6 h-6" />,
//       title: "Developer First",
//       description: "Comprehensive APIs and SDKs for seamless integration"
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-black text-white">
//       {/* Navigation */}
//       <nav className="fixed w-full bg-black/50 backdrop-blur-xl border-b border-gray-800 z-50">
//         <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
//           <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
//      {/* Go to Agent for sales        */}
//           </div>
//           <button className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 transition-all duration-300 text-white font-medium">
//             Sign In
//           </button>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <div className="relative pt-32 pb-20 px-6 overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-black/20" />
//         <div className="absolute inset-0">
//           <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(168,85,247,0.1),rgba(0,0,0,0))]" />
//         </div>
        
//         <div className="max-w-7xl mx-auto relative">
//           <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
//             <div className="inline-block mb-4 px-4 py-1 rounded-full bg-gray-800/50 backdrop-blur-sm border border-gray-700">
//               <span className="bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
//                 Welcome to the future
//               </span>
//             </div>
            
//             <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-white text-transparent bg-clip-text">
//               AI Sales Agent
//             </h1>
            
//             <p className="text-xl text-gray-400 mb-8 max-w-2xl">
//             Boost your sales with our AI-powered sales agent! 🚀 It engages customers, analyzes feedback, and provides real-time insights to enhance conversions.
//             </p>
            
//             <div className="flex gap-4">
//               <button className="group px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 transition-all duration-300 font-semibold flex items-center gap-2">
//                 See the Product
//                 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//               </button>
//               {/* <button className="px-8 py-4 rounded-full border border-gray-700 hover:border-purple-500 text-gray-300 hover:text-white transition-colors duration-300 font-semibold">
//                 Learn More
//               </button> */}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Features Section */}
//       <div className="py-20 relative">
//         <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-black to-black" />
//         <div className="max-w-7xl mx-auto px-6 relative">
//           <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
//             Revolutionary Features
//           </h2>
          
//           <div className="grid md:grid-cols-3 gap-8">
//             {features.map((feature, index) => (
//               <div 
//                 key={index}
//                 className={`group p-8 rounded-2xl bg-gradient-to-b from-gray-900 to-black border border-gray-800 hover:border-purple-500 transition-all duration-500 ${
//                   isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
//                 }`}
//                 style={{ transitionDelay: `${index * 200}ms` }}
//               >
//                 <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform duration-300">
//                   {feature.icon}
//                 </div>
//                 <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-white to-gray-300 text-transparent bg-clip-text">
//                   {feature.title}
//                 </h3>
//                 <p className="text-gray-400">{feature.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* CTA Section */}
//       <div className="py-20 px-6">
//         <div className="max-w-7xl mx-auto relative">
//           <div className="p-12 rounded-3xl bg-gradient-to-r from-purple-900/50 to-pink-900/50 border border-gray-800 backdrop-blur-xl text-center">
//             <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-3xl blur-3xl" />
//             <div className="relative">
//               <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 text-transparent bg-clip-text">
//                 Ready to Transform Your Business?
//               </h2>
//               <p className="text-lg mb-8 text-gray-400">Join the next generation of digital innovation</p>
//               <button className="px-8 py-4 rounded-full bg-white text-black hover:bg-gray-100 transition-colors duration-300 font-semibold group">
//                 Start Free Trial
//                 <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LandingPage;

// "use client"
// import React from 'react';
// import { useState, useEffect } from 'react';
// import { ArrowRight, CheckCircle, Sparkles, Shield, Zap, Globe, Database, Code } from 'lucide-react';

// const LandingPage = () => {
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     setIsVisible(true);
//   }, []);

//   const features = [
//     {
//       icon: <Globe className="w-6 h-6" />,
//       title: "Global Scale",
//       description: "Deploy worldwide with zero latency through our edge network"
//     },
//     {
//       icon: <Database className="w-6 h-6" />,
//       title: "Smart Storage",
//       description: "Intelligent data management with automatic optimization"
//     },
//     {
//       icon: <Code className="w-6 h-6" />,
//       title: "Developer First",
//       description: "Comprehensive APIs and SDKs for seamless integration"
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white text-gray-900">
//       {/* Navigation */}
//       <nav className="fixed w-full bg-white/50 backdrop-blur-xl border-b border-sky-100 z-50">
//         <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
//           <div className="text-2xl font-bold bg-gradient-to-r from-sky-500 to-blue-600 text-transparent bg-clip-text">
//             Go to Agent for sales
//           </div>
//           <button className="px-6 py-2 rounded-full bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 transition-all duration-300 text-white font-medium">
//             Sign In
//           </button>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <div className="relative pt-32 pb-20 px-6 overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-b from-sky-100/50 to-transparent" />
//         <div className="absolute inset-0">
//           <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(56,189,248,0.1),rgba(255,255,255,0))]" />
//         </div>
        
//         <div className="max-w-7xl mx-auto relative">
//           <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
//             <div className="inline-block mb-4 px-4 py-1 rounded-full bg-sky-100/80 backdrop-blur-sm border border-sky-200">
//               <span className="bg-gradient-to-r from-sky-500 to-blue-600 text-transparent bg-clip-text">
//                 Welcome to the future
//               </span>
//             </div>
            
//             <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-sky-800 to-gray-900 text-transparent bg-clip-text">
//               AI Sales Agent
//             </h1>
            
//             <p className="text-xl text-gray-600 mb-8 max-w-2xl">
//               Boost your sales with our AI-powered sales agent! 🚀 It engages customers, analyzes feedback, and provides real-time insights to enhance conversions.
//             </p>
            
//             <div className="flex gap-4">
//               <button className="group px-8 py-4 rounded-full bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 transition-all duration-300 font-semibold flex items-center gap-2 text-white">
//                 See the Product
//                 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Features Section */}
//       <div className="py-20 relative">
//         <div className="absolute inset-0 bg-gradient-to-b from-sky-50/80 via-white to-white" />
//         <div className="max-w-7xl mx-auto px-6 relative">
//           <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-sky-500 to-blue-600 text-transparent bg-clip-text">
//             Revolutionary Features
//           </h2>
          
//           <div className="grid md:grid-cols-3 gap-8">
//             {features.map((feature, index) => (
//               <div 
//                 key={index}
//                 className={`group p-8 rounded-2xl bg-gradient-to-b from-white to-sky-50 border border-sky-100 hover:border-sky-300 hover:shadow-lg hover:shadow-sky-100 transition-all duration-500 ${
//                   isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
//                 }`}
//                 style={{ transitionDelay: `${index * 200}ms` }}
//               >
//                 <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform duration-300">
//                   {feature.icon}
//                 </div>
//                 <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-gray-900 to-gray-700 text-transparent bg-clip-text">
//                   {feature.title}
//                 </h3>
//                 <p className="text-gray-600">{feature.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* CTA Section */}
//       <div className="py-20 px-6">
//         <div className="max-w-7xl mx-auto relative">
//           <div className="p-12 rounded-3xl bg-gradient-to-r from-sky-100/90 to-blue-100/90 border border-sky-200 backdrop-blur-xl text-center">
//             <div className="absolute inset-0 bg-gradient-to-r from-sky-300/10 to-blue-300/10 rounded-3xl blur-3xl" />
//             <div className="relative">
//               <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 text-transparent bg-clip-text">
//                 Ready to Transform Your Business?
//               </h2>
//               <p className="text-lg mb-8 text-gray-600">Join the next generation of digital innovation</p>
//               <button className="px-8 py-4 rounded-full bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 text-white transition-colors duration-300 font-semibold group">
//                 Start Free Trial
//                 <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LandingPage;
"use client"
import React from 'react';
import { useState, useEffect } from 'react';
import { ArrowRight, MessageSquareText, Palette, Mail, BarChart3 } from 'lucide-react';
import { useRouter } from 'next/navigation';
const LandingPage = () => {
  const [isVisible, setIsVisible] = useState(false);
   const router = useRouter();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: <MessageSquareText className="w-6 h-6" />,
      title: "AI Shopping Assistant",
      description: "24/7 intelligent chatbot that helps customers with product information, pricing, and shopping guidance in real-time"
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: "Product Customization",
      description: "Send customization requests directly to our sales team - modify logos, colors, designs and get instant quotes"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Direct Email Support",
      description: "Seamless communication channel for bulk orders and custom requirements, connecting you directly with our sales team"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Sentiment Analysis",
      description: "Advanced feedback analysis to understand customer satisfaction and improve our products and services"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white text-gray-900">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/50 backdrop-blur-xl border-b border-sky-100 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <div className="text-2xl font-bold bg-gradient-to-r from-sky-500 to-blue-600 text-transparent bg-clip-text">
          Helps Wholesale Businesses
          </div>
          <button  onClick={function ()
            {
                router.push('/api/auth/signin')
            }
          } className="px-6 py-2 rounded-full bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 transition-all duration-300 text-white font-medium">
            Sign In
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-sky-100/50 to-transparent" />
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(56,189,248,0.1),rgba(255,255,255,0))]" />
        </div>
        
        <div className="max-w-7xl mx-auto relative">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-block mb-4 px-4 py-1 rounded-full bg-sky-100/80 backdrop-blur-sm border border-sky-200">
              <span className="bg-gradient-to-r from-sky-500 to-blue-600 text-transparent bg-clip-text">
                Intelligent Sales Solutions
              </span>
            </div>
            
            <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-sky-800 to-gray-900 text-transparent bg-clip-text">
              AI Sales Agent
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl">
              Transform your shopping experience with our AI-powered sales assistant! Get instant product info, customize orders, and receive personalized support - all in one place.
            </p>
            
            <div className="flex gap-4">
              <button  onClick={function ()
                {
                     router.push('/seeallproduct')
                }
              }  className="group px-8 py-4 rounded-full bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 transition-all duration-300 font-semibold flex items-center gap-2 text-white">
                See the Products 
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-sky-50/80 via-white to-white" />
        <div className="max-w-7xl mx-auto px-6 relative">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-sky-500 to-blue-600 text-transparent bg-clip-text">
            Smart Shopping Features
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`group p-8 rounded-2xl bg-gradient-to-b from-white to-sky-50 border border-sky-100 hover:border-sky-300 hover:shadow-lg hover:shadow-sky-100 transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-gray-900 to-gray-700 text-transparent bg-clip-text">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-6">
        <div className="max-w-7xl mx-auto relative">
          <div className="p-12 rounded-3xl bg-gradient-to-r from-sky-100/90 to-blue-100/90 border border-sky-200 backdrop-blur-xl text-center">
            <div className="absolute inset-0 bg-gradient-to-r from-sky-300/10 to-blue-300/10 rounded-3xl blur-3xl" />
            <div className="relative">
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 text-transparent bg-clip-text">
                Ready to Revolutionize Your Sales?
              </h2>
              <p className="text-lg mb-8 text-gray-600">Experience the power of AI-driven sales assistance</p>
              <button  onClick={function ()
                {
                    router.push('/salesfeedback')
                }
              }
               className="px-8 py-4 rounded-full bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 text-white transition-colors duration-300 font-semibold group">
                Sentiment Analysed so far
                <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;