// "use client"

// import axios from "axios";
// import { useState } from "react"

// export default function ()

// {
//     const [details,setdetails]=useState({
//         itemname:"",
//         size:"",
//         quantity:0,
//         email:"",
//         customization:""
//     })

//      async function handlechange(e:any)
//     {
//           const {name,value}=e.target;
       

//         setdetails(
//             {
//                 ...details,
//                 [name]:value
//             }
//         )
      
//     }

//     async function handlesubmit (e:any)
//     {   
//         e.preventDefault()
//         const res=await axios.post('/api/requestquote',details)
//     }

//     return <div>
//         <form onSubmit={handlesubmit}>
//        <input type="text" name="itemname"placeholder="Enter the item nam" onChange={handlechange}/> 
//        <input  type="text" name="size" placeholder="Enter the size which u want" onChange={handlechange}/>
//        <input type="number" name="quantity" placeholder="Enter the quantity you want" onChange={handlechange}/>
//        <input type="email" name="email"placeholder="enter your emailadress" onChange={handlechange}/>
//        <input type="text" name="customization" placeholder="Enter the customization detail"onChange={handlechange}/>
//        <button  type="submit">Request Quote</button>
//        </form>
//     </div>

// }

"use client";

import axios from "axios";
import { useState } from "react";

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
      alert("Quote request sent successfully!");
    } catch (error) {
      console.error("Error sending quote request:", error);
      alert("Failed to send request. Please try again.");
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="itemname"
          placeholder="Enter the item name"
          value={details.itemname}
          onChange={handleChange}
        />
        <input
          type="text"
          name="size"
          placeholder="Enter the size you want"
          value={details.size}
          onChange={handleChange}
        />
        <input
          type="number"
          name="quantity"
          placeholder="Enter the quantity you want"
          value={details.quantity}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Enter your email address"
          value={details.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="customization"
          placeholder="Enter the customization details"
          value={details.customization}
          onChange={handleChange}
        />
        <button type="submit">Request Quote</button>
      </form>
    </div>
  );
}

