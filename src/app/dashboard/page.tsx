"use client";
import axios from 'axios';
import { useState } from 'react';
import { Item } from '@/lib/db/schemas/item';
import { UploadButton } from "~/utils/uploadthing";

export default function Page() {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(0);
  const [categories, setCategories] = useState<string[]>([]);
  const [price, setPrice] = useState<number>(0);
  const [image, setImage] = useState<string>('');
  const [id, setId] = useState<string>('');

  const handleDelete = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const resp = await axios.delete(`/api/items/?id=${id}`);
      console.log(resp.status);
    } catch (err) {
      console.log(err);
    }
  };

  const handleNewItem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newItem: Item = { name, description, quantity, categories, price, image };

    try {
      await axios.post('/api/items', newItem);
      setName('');
      setDescription('');
      setQuantity(0);
      setCategories([]);
      setPrice(0);
      setImage('');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-8 rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Add New Item</h2>
      <form onSubmit={handleDelete} className="mb-6">
        <input
          className="border rounded p-2 w-full mb-2"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="ID"
        />
        <button type="submit" className="p-2 bg-red-500 text-white rounded w-full">Delete</button>
      </form>
      <form onSubmit={handleNewItem} className="space-y-4">
        <label htmlFor="name" className="block font-semibold">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border rounded p-2 w-full"
        />

        <label htmlFor="description" className="block font-semibold">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="border rounded p-2 w-full"
        />

        <label htmlFor="quantity" className="block font-semibold">Quantity:</label>
        <input
          type="number"
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          required
          className="border rounded p-2 w-full"
        />

        <label htmlFor="categories" className="block font-semibold">Categories (comma separated):</label>
        <input
          type="text"
          id="categories"
          value={categories.join(', ')}
          onChange={(e) => setCategories(e.target.value.split(', '))}
          required
          className="border rounded p-2 w-full"
        />

        <label htmlFor="price" className="block font-semibold">Price:</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          required
          className="border rounded p-2 w-full"
        />

        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            setImage(res[0].url);
            console.log("Files: ", res);
            alert("Upload Completed");
          }}
          onUploadError={(error: Error) => {
            alert(`ERROR! ${error.message}`);
          }}
        />

        <button type="submit" className="mt-4 p-2 bg-blue-500 text-white rounded w-full">Create Item</button>
      </form>
      {image && <img src={image} alt="preview" className="mt-4 mx-auto" width={200} height={200} />}
    </div>
  );
}
