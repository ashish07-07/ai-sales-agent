import {HfInference} from '@huggingface/inference'
import { streamText } from 'ai'
import prisma from '@/app/db'
import { NextRequest, NextResponse } from 'next/server'

interface Feedback{
    rating:number | null ,
    feedback:string| null
}

const HF= new HfInference(process.env.HUGGINGFACE_API_KEY)

export async function POST(req:NextRequest,res:NextResponse)
{
    const feedbackdata:any= await prisma.feedback.findMany()

    try 

    {
        const feedbackdata= await prisma.feedback.findMany()
        
       
        const sanitizeddata= feedbackdata.map(function(val:Feedback)
    {
          return {

            rating:val.rating,
            feedback:val.feedback

          }
    })

    const response= await HF.textClassification(
        {
           
            model:"nlptown/bert-base-multilingual-uncased-sentiment",
            inputs:sanitizeddata.map(val => val.feedback || "")

        }
    )

    console.log(response)

    return NextResponse.json(
        {
            response
        },
        {
            status:200
        }
    )
        

    }

    catch (error)
    {
               
    if (error instanceof Error){
        console.log("Error: ", error.stack)
    }

    return NextResponse.json(
        {
            error:"no"
        },
        {
            status:400
        }
    )
    }

}