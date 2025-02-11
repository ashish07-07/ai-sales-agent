
"use client";

import axios from "axios";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Input } from "../components/ui/button";
import { Button } from "../components/ui/button";
import toast, { Toaster } from "react-hot-toast";

export default function RequestQuoteForm() {
  const [details, setDetails] = useState({
    itemname: "",
    size: "",
    quantity: 0,
    email: "",
    customization: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await axios.post("/api/requestquote", details);
      console.log("Response:", res.data);
      toast.success('Quote request sent successfully!', {
        style: {
          background: '#22c55e',
          color: '#fff',
        },
        duration: 3000,
      });
    } catch (error) {
      console.error("Error sending quote request:", error);
      toast.error('Failed to send request. Please try again.', {
        duration: 3000,
      });
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 p-6">
      <Toaster position="top-center" />
      <div className="max-w-2xl mx-auto">
        <Link
          href="/seeallproduct"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Products
        </Link>

        <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-xl p-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Request a Quote
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Item Name</label>
              <Input
                type="text"
                name="itemname"
                placeholder="Enter the item name"
                value={details.itemname}
                onChange={handleChange}
                className="bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Size</label>
              <Input
                type="text"
                name="size"
                placeholder="Enter the size you want"
                value={details.size}
                onChange={handleChange}
                className="bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Quantity</label>
              <Input
                type="number"
                name="quantity"
                placeholder="Enter the quantity you want"
                value={details.quantity}
                onChange={handleChange}
                className="bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-black"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email Address</label>
              <Input
                type="email"
                name="email"
                placeholder="Enter your email address"
                value={details.email}
                onChange={handleChange}
                className="bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Customization Details</label>
              <Input
                type="text"
                name="customization"
                placeholder="Enter the customization details"
                value={details.customization}
                onChange={handleChange}
                className="bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              Request Quote
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}