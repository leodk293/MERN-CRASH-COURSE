import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useProductStore } from "@/store/product";
import { ToastContainer, toast } from "react-toastify";

export default function CreatePage() {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const { createProduct } = useProductStore();

  async function handleSubmit(event) {
    event.preventDefault();
    //console.log(newProduct);
    //toast.success("Product Created Successfully");
    const { message, success } = await createProduct(newProduct);
    if(!success){
      toast.error('Error creating product');
    }
    else{
      toast.success('Product created successfully');
    }
    console.log(`Success: ${success}, Message: ${message}`);
    setNewProduct({
      name: "",
      price: "",
      image: "",
    });
  }

  return (
    <div className=" mt-10">
      <h1 className=" text-center text-white text-5xl font-extrabold">
        Create New Product
      </h1>

      <form
        className=" flex flex-col p-5 border w-auto mt-10 m-auto border-slate-300 rounded-[5px] gap-5 md:w-[40%]"
        action=""
        onSubmit={handleSubmit}
      >
        <input
          onChange={(event) =>
            setNewProduct({ ...newProduct, name: event.target.value })
          }
          className=" text-white font-bold outline-none rounded-[5px] border border-slate-300 bg-transparent px-4 py-2"
          type="text"
          placeholder="Product Name"
          name="name"
          value={newProduct.name}
        />

        <input
          onChange={(event) =>
            setNewProduct({ ...newProduct, price: event.target.value })
          }
          className=" text-white font-bold outline-none rounded-[5px] border border-slate-300 bg-transparent px-4 py-2"
          placeholder="Price"
          type="number"
          name="price"
          value={newProduct.price}
        />

        <input
          onChange={(event) =>
            setNewProduct({ ...newProduct, image: event.target.value })
          }
          className=" text-white font-bold outline-none rounded-[5px] border border-slate-300 bg-transparent px-4 py-2"
          placeholder="Image URL"
          type="text"
          name="image"
          value={newProduct.image}
        />

        <Button onClick={handleSubmit} type="submit" className=" font-semibold">
          Add Product
        </Button>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </form>
    </div>
  );
}
