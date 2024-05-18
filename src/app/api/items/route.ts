import clientPromise from "@/lib/db/mongo";
import { Item } from "@/lib/db/schemas/item";
import { ObjectId } from "mongodb";
import { type NextRequest } from "next/server";

export async function DELETE(request: NextRequest) {
  const client = await clientPromise;
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("id");
  try {
    const result = await client?.db("site").collection("items").deleteOne({ _id: new ObjectId(query!) });
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error("Error deleting item:", error);
    return new Response("Error deleting item", { status: 500 });
  }
}

export const GET = async (req: Request) => {
  try {
    const client = await clientPromise;
    const items = await client?.db("site").collection("items").find({}).toArray();
    return new Response(JSON.stringify(items), { status: 200 });
  } catch (error) {
    console.error("Error fetching items:", error);
    return new Response("Error fetching items", { status: 500 });
  }
};

export const POST = async (req: Request) => {
  try {
    const client = await clientPromise;
    const newItem: Item = await req.json();
    const result = await client?.db("site").collection("items").insertOne(newItem);
    return new Response(JSON.stringify({ message: "Item inserted successfully", item: result.ops[0] }), { status: 201 });
  } catch (error) {
    console.error("Error inserting item:", error);
    return new Response("Error inserting item", { status: 500 });
  }
};
