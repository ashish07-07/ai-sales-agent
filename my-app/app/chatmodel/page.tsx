
'use client';

import React, { useState } from 'react';
import { useChat } from 'ai/react';
import { Star, X, ChevronLeft, Send } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export default function AnimatedChat() {
  const router = useRouter();
  const [showFeedback, setShowFeedback] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');
  const session = useSession();
  const useremail = session.data?.user?.email ||"bkashishh077@gmail.com";
  const username = session.data?.user?.name;

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    initialMessages: [
      {
        id: 'welcome',
        role: 'assistant',
        content: "Hello! I'm your AI sales assistant. How can I help you find the perfect product today?"
      }
    ]
  });

  const handleCloseFeedback = () => {
    setShowFeedback(false);
    setRating(0);
    setFeedbackText('');
  };

  const handleSubmitFeedback = async () => {
    try {
      const response = await axios.post('/api/feedback', {
        rating,
        feedbackText,
        email: useremail
      });

      handleCloseFeedback();
      
      // Show success notification
      toast.success('Thank you for your feedback!', {
        duration: 2000,
        position: 'top-center',
        style: {
          background: '#4B0082',
          color: '#ffffff',
          border: '1px solid #FF69B4',
        },
      });

      // Wait for the toast to be visible before redirecting
      setTimeout(() => {
        router.push('/seeallproduct');
      }, 2000);

    } catch (error) {
      toast.error('Failed to submit feedback. You need to signin for making the feedback.', {
        position: 'top-center',
        style: {
          background: '#ff0000',
          color: '#ffffff',
        }
      });
    }
  };

  const handleBackToProducts = () => {
    router.push('/seeallproduct');
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-red-950 via-pink-900 to-red-900 animate-gradient-x">
      {/* Add Toaster component here */}
      <Toaster />

      <div className="max-w-2xl mx-auto p-4">
        {/* Animated background bubbles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="bubble animate-float-slow"></div>
          <div className="bubble animate-float-medium"></div>
          <div className="bubble animate-float-fast"></div>
        </div>

        {/* Close button - Updated for mobile visibility */}
        <button
          onClick={() => setShowFeedback(true)}
          className="fixed top-4 right-4 p-2 rounded-full bg-red-800/50 hover:bg-red-700/50 transition-transform hover:rotate-90 duration-300 text-white z-50 sm:absolute"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Chat container with slide animation */}
        <div className={`transition-all duration-300 transform ${showFeedback ? 'scale-95 opacity-60' : 'scale-100 opacity-100'}`}>
          <div className="bg-red-950/30 backdrop-blur-sm rounded-lg p-4 h-[500px] overflow-y-auto mb-4 shadow-lg text-white">
            {messages.map(message => (
              <div
                key={message.id}
                className={`mb-4 p-3 rounded-lg animate-slide-in ${
                  message.role === 'user'
                    ? 'bg-pink-800/80 text-yellow-300 ml-auto max-w-[80%]'
                    : 'bg-red-900/50 text-white shadow-sm max-w-[80%]'
                }`}
              >
                {message.content}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              className="flex-1 p-2 border border-red-800/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600 bg-red-950/30 backdrop-blur-sm text-white placeholder-gray-400"
              name="prompt"
              value={input}
              onChange={handleInputChange}
              placeholder="Ask about our products..."
              disabled={isLoading}
            />
            <button
              className="bg-pink-800 text-white px-4 py-2 rounded-lg hover:bg-pink-700 disabled:opacity-50 transform hover:scale-105 transition-transform"
              type="submit"
              disabled={isLoading || !input.trim()}
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>

        {/* Enhanced Feedback overlay with animation */}
        {showFeedback && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in">
            <div className="bg-red-950/90 p-6 rounded-lg shadow-xl animate-scale-in text-white max-w-md w-full mx-4">
              <h3 className="text-xl font-bold mb-4">Share your experience</h3>
              <div className="flex gap-2 mb-6 justify-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className="transform hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'
                      }`}
                    />
                  </button>
                ))}
              </div>
              <div className="mb-6">
                <textarea
                  className="w-full p-3 rounded-lg bg-red-900/50 border border-red-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-600"
                  placeholder="Tell us about your experience (optional)"
                  rows={4}
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                />
              </div>
              <div className="flex gap-2 justify-between">
                <button
                  onClick={handleBackToProducts}
                  className="flex items-center gap-2 px-4 py-2 bg-pink-800 text-white rounded-lg hover:bg-pink-700 transform hover:scale-105 transition-transform"
                >
                  <ChevronLeft className="w-4 h-4" />
                  See All Products
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={handleCloseFeedback}
                    className="px-4 py-2 bg-red-800/50 text-white rounded-lg hover:bg-red-700/50 transform hover:scale-105 transition-transform"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmitFeedback}
                    className="px-4 py-2 bg-pink-800 text-white rounded-lg hover:bg-pink-700 transform hover:scale-105 transition-transform disabled:opacity-50"
                    disabled={!rating}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-gradient-x {
          background-size: 400% 400%;
          animation: gradient-x 15s ease infinite;
        }

        .bubble {
          position: absolute;
          background: radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%);
          border-radius: 50%;
        }

        .animate-float-slow {
          width: 150px;
          height: 150px;
          left: 10%;
          animation: float 8s ease-in-out infinite;
        }

        .animate-float-medium {
          width: 100px;
          height: 100px;
          right: 15%;
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-fast {
          width: 75px;
          height: 75px;
          left: 50%;
          animation: float 4s ease-in-out infinite;
        }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }

        .animate-slide-in {
          animation: slideIn 0.3s ease-out;
        }

        @keyframes slideIn {
          from { transform: translateX(-10px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .animate-scale-in {
          animation: scaleIn 0.3s ease-out;
        }

        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}