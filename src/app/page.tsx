"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { Item } from "@/lib/db/schemas/item";
import { UploadButton } from "~/utils/uploadthing";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [data, setData] = useState<Item[]>([]);
  const [url, setUrl] = useState<string>("");
  const addToCart = (item: Item) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart.push(item);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Item added to cart!");
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/items");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchData();
  }, []);

  console.log(data);

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-black text-white p-4">
        <h1 className="text-3xl font-bold text-center">E-Commerce Shop</h1>
      </header>
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            setUrl(res[0].url);
            console.log("Files: ", res);
            alert("Upload Completed");
          }}
          onUploadError={(error: Error) => {
            alert(`ERROR! ${error.message}`);
          }}
        />
        {url && <img src={url} alt="Uploaded" className="my-4 mx-auto" width={500} height={500} />}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.map((item) => (
            <Link key={item._id} href={`/items/${item._id}`} className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
                {item.image && <img src={item.image} alt={item.name} className="w-full h-48 object-cover mb-4 rounded" />}
                <h2 className="text-lg font-bold">{item.name}</h2>
                <p className="text-gray-700">{item.description}</p>
                <p className="text-gray-900 font-semibold mt-2">${item.price.toFixed(2)}</p>
                <div className="mt-2 flex flex-wrap">
                  {item.categories.map((category) => (
                    <span key={category} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                      {category}
                    </span>
                  ))}
                </div>
                <button
        onClick={() => addToCart(item)}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add to Cart
      </button>
            </Link>
          ))}
        </div>
      </main>
      <footer className="bg-black text-white p-4 text-center">
        <p>&copy; 2024 E-Commerce Shop. All rights reserved.</p>
      </footer>
    </div>
  );
}
