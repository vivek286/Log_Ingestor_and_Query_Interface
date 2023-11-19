import { Client } from "@elastic/elasticsearch";
import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
export async function GET(){
        const client = new Client({
                node: 'https://883fdcdd450d4baf8ba602d2d553c7fc.us-central1.gcp.cloud.es.io:443',
                auth: {
                    apiKey: "MkpKTjRZc0JCbDcyRHdmd3dTU1E6T1JCRDd2bXlTTkdDUXdDS3pIZl9pZw=="
                }
              });
       
        // const data=All_logs;
        const resp = await client.info();
        return NextResponse.json(resp);
}