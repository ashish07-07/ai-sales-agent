"use client"
import { useSession } from "next-auth/react";
import { useState } from "react";
import axios from "axios";

export default function ProductForm() {
  const session = useSession();
  const [itemDetails, setItemDetails] = useState({
    itemname: "",
    description: "",
    imagelink: "",
    cost: 0,
    size: [],
    color: "",
    stock: 0
  });

  // Handle input changes
  async function 
  handleChange(e: any) {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setItemDetails({
        ...itemDetails,
        [name]: checked
      });
    } else if (type === "number" || type === "text") {
      setItemDetails({
        ...itemDetails,
        [name]: value
      });
    } else if (type === "select-multiple") {
      // For multiple select (sizes), save the selected options as an array
      const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
      setItemDetails({
        ...itemDetails,
        [name]: selectedOptions
      });
    }
  }

  // Handle form submission
  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      const response = await axios.post("/api/addproduct", itemDetails);
      console.log(response);
    } catch (error) {
      console.error("Error submitting product:", error);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter the item name"
          name="itemname"
          value={itemDetails.itemname}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Enter item description"
          name="description"
          value={itemDetails.description}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Enter image link"
          name="imagelink"
          value={itemDetails.imagelink}
          onChange={handleChange}
        />
        <input
          type="number"
          placeholder="Enter item cost"
          name="cost"
          value={itemDetails.cost}
          onChange={handleChange}
        />

        <label>Available Sizes</label>
        <select
          name="size"
          multiple
          value={itemDetails.size}
          onChange={handleChange}
        >
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
        </select>

        <input
          type="text"
          placeholder="Enter color"
          name="color"
          value={itemDetails.color}
          onChange={handleChange}
        />

        <input
          type="number"
          placeholder="Enter stock quantity"
          name="stock"
          value={itemDetails.stock}
          onChange={handleChange}
        />

        <button type="submit">Add the item to database</button>
      </form>
    </div>
  );
}
