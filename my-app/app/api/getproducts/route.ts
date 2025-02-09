import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/db";

export async function GET(req:NextRequest,res:NextResponse)
{
try 
{
    const details= await prisma.itemDetails.findMany()

    return Response.json(
        {
            products:details
        },
        {
            status:200
        }
    )
}

catch (e:any)
{    
    console.log(e)
    return Response.json(
        {
            message:"Error while fetching the data"
        },
        {
            status:400
        }
    )
  
}
 



  
}