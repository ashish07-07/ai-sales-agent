import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/db";

export  async function POST(req:NextRequest,res:Response)
{  

    try 
    {
        const body= await req.json();
        console.log(body);
    
        await prisma.feedback.create(
            {
                data:
                {
                    email:body.email,
                    feedback:body.feedbackText,
                    rating:parseInt(body.rating)
    
                }
            }
        )

        return NextResponse.json(
            {
                message:"Added the feedback to database"
            },
            {
                status:200
            }
        )
    }

    catch (e:any)
    {
        
        return NextResponse.json(
            {
                message:"error cereating the feedabck"
            },
            {
                status:400
            }
            
        )
    }
   


}