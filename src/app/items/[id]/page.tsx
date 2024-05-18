"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Item } from "@/lib/db/schemas/item";

export default function ItemPage({ params }: { params: { id: string; }}) {
  const [data, setData] = useState<Item | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const id = params.id;

  useEffect(() => {
    const fetchItem = async () => {
      if (id) {
        setIsLoading(true);
        try {
          const response = await axios.get(`/api/items/${id}`);
          if (response.status === 200) {
            setData(response.data);
          } else {
            setError(true);
          }
        } catch (error) {
          console.error("Error fetching item:", error);
          setError(true);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchItem();
  }, [id]);

  const addToCart = (item: Item) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart.push(item);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Item added to cart!");
  };

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: Item not found</div>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded shadow">
      <h1 className="text-3xl font-bold mb-6">{data?.name}</h1>
      {data?.image && <img src={data.image} alt={data.name} className="w-full h-64 object-cover mb-4 rounded" />}
      <p className="text-gray-700 mb-4">{data?.description}</p>
      <p className="text-gray-900 font-semibold text-2xl mb-4">${data?.price.toFixed(2)}</p>
      <div className="mt-4 flex flex-wrap">
        {data?.categories.map((category) => (
          <span key={category} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
            {category}
          </span>
        ))}
      </div>
      <button
        onClick={() => data && addToCart(data)}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add to Cart
      </button>
    </div>
  );
}
