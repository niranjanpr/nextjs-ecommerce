import prisma from "@/lib/db/prisma";
import { redirect } from "next/navigation";
import FormSubmitButton  from "../../components/FormSubmitButton";
export const metadata = {
  title: "Add Product - Flowmazon",
};

async function addProduct(formData: FormData) {
  "use server";

  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const imageUrl = formData.get("imageURL")?.toString();
  const price = Number(formData.get("price") || 0);

  if (!name || !description || !imageUrl || !price) {
    throw Error("Missing required fields");
  }

  await prisma.product.create({
    data: { name, description, imageUrl, price },
  });

  redirect("/");
}
export default function AddProductPage() {
  return (
    <div>
      <h1 className="mb-3 text-lg font-bold">Add Product</h1>
      <form action={addProduct}>
        <input
          required
          name="name"
          placeholder="Name"
          className="input-bordered input mb-3 w-full"
        />
        <textarea
          name="description"
          placeholder="Description"
          required
          className="textarea-bordered textarea mb-3 w-full"
        />
        <input
          required
          name="imageURL"
          placeholder="Image URL"
          type="url"
          className="input-bordered mb-3 w-full"
        />
        <input
          required
          name="price"
          placeholder="Price"
          type="number"
          className="input-bordered mb-3 w-full"
        />
        <FormSubmitButton type="submit" className="btn-block ">
          Add Product
        </FormSubmitButton>
      </form>
    </div>
  );
}
