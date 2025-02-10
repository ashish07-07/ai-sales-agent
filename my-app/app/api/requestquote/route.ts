

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/db";
import nodemailer from "nodemailer";



interface Details {
  itemname: string;
  size: string;
  quantity:number;
  email: string;
  customization: string;
}

// export async function POST(req: NextRequest) {
//   const body: Details = await req.json();
//   console.log(body);

//   try {
//     // Store data in database
//     await prisma.quote.create({
//       data: {
//         itemname: body.itemname,
//         size: body.size,
//         quantity: body.quantity,
//         email: body.email,
//         customization: body.customization,
//       },
//     });

//     // ✅ Check if environment variables are loaded
//     if (!process.env.SMTP_SERVER_USERNAME || !process.env.PASSWORD_APP) {
//       throw new Error("Missing SMTP credentials in environment variables.");
//     }

//     // Setup Nodemailer Transporter
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.SMTP_SERVER_USERNAME,
//         pass: process.env.PASSWORD_APP,
//       },
//     });

//     // ✅ Define send() before calling it
//     async function send() {
//       console.log("Inside the email send function");

//       await transporter.sendMail({
//         from: process.env.SMTP_SERVER_USERNAME,
//         to: body.email,
//         subject: "Thank you for contacting about your customized t-shirts",
//         text: `Hello, 
// Thank you for contacting us! Here are the details you provided:

// Item Name: ${body.itemname}
// Size: ${body.size}
// Quantity: ${body.quantity}
// Customization: ${body.customization}

// Our sales team will review your order and contact you shortly.

// If you have any questions, feel free to reply to this email.

// Best Regards,  
// Aspiring Full Stack Developer`,
//       });

//       console.log("Email sent successfully!");
//     }

//     await send(); // ✅ Now calling it after it's defined

//     return NextResponse.json(
//       {
//         message: "Item added to database, and email sent successfully",
//       },
//       {
//         status: 200,
//       }
//     );
//   } catch (e: any) {
//  // ✅ Log error details

//     return NextResponse.json(
//       {
//         message: "Error during request quote",
//         error: e.message, // Show error details
//       },
//       {
//         status: 500,
//       }
//     );
//   }
// }

export async function POST(req: NextRequest) {
    try {

      const body: Details = await req.json();
      console.log("hello buddy")
      console.log(body)
  
      // Database operation (keep this first)
    //   await prisma.quote.create({ /* ... */ });
    await prisma.quote.create({
              data: {
                itemname: body.itemname,
                size: body.size,
                quantity:typeof body.quantity === "string" ? parseInt(body.quantity) : body.quantity,
                email: body.email,
                customization: body.customization,
              },
            });
  
      // Auth verification
      if (!process.env.SMTP_SERVER_USERNAME || !process.env.PASSWORD_APP) {
        throw new Error("SMTP credentials missing");
      }
  
      // Updated transporter config
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.SMTP_SERVER_USERNAME,
          pass: process.env.PASSWORD_APP,
        },
        tls: { rejectUnauthorized: false }
      });
  
      // Send email
      await transporter.sendMail({
        from: `"Custom T-Shirt Team" <${process.env.SMTP_SERVER_USERNAME}>`, // Proper format
        to: body.email,
        subject: "Thank you for your t-shirt inquiry",
        text: `Hello ${body.email.split('@')[0]},
        
  We've received your request for:
        
  • Item: ${body.itemname}
  • Size: ${body.size}
  • Quantity: ${body.quantity}
  • Customization: ${body.customization}
  
  Our team will contact you within 24 hours.
        
  Best regards,
  Custom T-Shirt Team`
      });
  
      return NextResponse.json(
        { message: "Request processed successfully" },
        { status: 200 }
      );
  
    } catch (error) {
    //   console.error("Full Error:", e); // Check server logs
    
    if (error instanceof Error){
        console.log("Error: ", error.stack)
    }
      return NextResponse.json(
        {
          message: "Processing failed",
        
        
        },
        { status: 500 }
      );
    }
  }