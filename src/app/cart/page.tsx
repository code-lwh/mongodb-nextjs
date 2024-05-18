"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Item } from "@/lib/db/schemas/item";

export default function CartPage() {
  const [cartItems, setCartItems] = useState<Item[]>([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(cart);
  }, []);

  const removeFromCart = (itemId: string) => {
    const updatedCart = cartItems.filter((item) => item._id !== itemId);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-black text-white p-4">
        <h1 className="text-3xl font-bold text-center">Shopping Cart</h1>
      </header>
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {cartItems.length > 0 ? (
          <>
            <div className="grid grid-cols-1 gap-6">
              {cartItems.map((item) => (
                <div key={item._id} className="bg-white p-4 rounded-lg shadow flex items-center">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded"
                      width={96}
                      height={96}
                    />
                  )}
                  <div className="ml-4 flex-1">
                    <h2 className="text-lg font-bold">{item.name}</h2>
                    <p className="text-gray-700">{item.description}</p>
                    <p className="text-gray-900 font-semibold mt-2">${item.price.toFixed(2)}</p>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 text-right">
              <h3 className="text-2xl font-bold">Total: ${totalPrice.toFixed(2)}</h3>
              <button className="mt-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
                Proceed to Checkout
              </button>
            </div>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
            <Link href="/" className="text-blue-500 hover:underline">
              Continue Shopping
            </Link>
          </div>
        )}
      </main>
      <footer className="bg-black text-white p-4 text-center">
        <p>&copy; 2024 E-Commerce Shop. All rights reserved.</p>
      </footer>
    </div>
  );
}
