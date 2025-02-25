
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


export async function POST(req: NextRequest) {
    try {

      const body: Details = await req.json();
      console.log("hello buddy")
      console.log(body)

    await prisma.quote.create({
              data: {
                itemname: body.itemname,
                size: body.size,
                quantity:typeof body.quantity === "string" ? parseInt(body.quantity) : body.quantity,
                email: body.email,
                customization: body.customization,
              },
            });
  

      if (!process.env.SMTP_SERVER_USERNAME || !process.env.PASSWORD_APP) {
        throw new Error("SMTP credentials missing");
      }
  

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
  
 
      await transporter.sendMail({
        from: `"Custom T-Shirt Team" <${process.env.SMTP_SERVER_USERNAME}>`, // Proper format
        to: body.email,
        subject: "Thank you for your t-shirt enquiry",
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