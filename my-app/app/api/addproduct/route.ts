import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/db";
export async function POST(req:NextRequest,res:NextResponse)
{

    try 
    {
        const body= await req.json();
        console.log(body);
        const itemdetails=await prisma.itemDetails.create(
            {
                data:
                {
                       itemName:body.itemname,
                       description:body.description,
                       imageLink:body.imagelink,
                       cost:parseInt(body.cost),
                       sizes:body.size,
                       colors:body.color,
                       stock:parseInt(body.stock)
                }
            }
        )
        return Response.json(
            {
                message:"product added successfully",
                data:itemdetails
                
            },
            {
                status:201
            }
        )

    }

    catch (error)
    {
          console.error(error)
          return Response.json(
            {
                message:"Failed to add products",
                error: error instanceof Error ? error.message : error,
            },
            {
                status:400
            }
          )
    }
    
   
}
