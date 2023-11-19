import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
export async function GET(){
    const client=await MongoClient.connect('mongodb+srv://Vivek:TeNzP6QPWszrWcKX@cluster0.hmbhl.mongodb.net/Dytelogs?retryWrites=true&w=majority');
const db=client.db();
const collection=db.collection('logs');
    const All_logs=(await collection.find().toArray());
    const data=All_logs;
    return NextResponse.json(data)
}