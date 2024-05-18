import clientPromise from "@/lib/db/mongo";
import { ObjectId } from "mongodb";

export const GET = async (req: Request, context: any) => {
  const { params } = context;
  const id = params.id;
  const client = await clientPromise;
  
  try {
    const item = await client?.db("site").collection("items").findOne({ "_id": new ObjectId(id) });
    if (item) {
      return Response.json(item);
    } else {
      return new Response("Item not found", { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching item:", error);
    return new Response("Error fetching item", { status: 500 });
  }
};
