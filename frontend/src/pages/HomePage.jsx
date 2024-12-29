import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "@/store/product";
import { Trash2 } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid transparent",
  background: "black",
  borderRadius: "5px",
  color: "white",
  boxShadow: 24,
  p: 4,
};

export default function HomePage() {
  const [selectedProduct, setSelectedProduct] = useState(null); // Store the product being edited
  const [updatedProduct, setUpdatedProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const { fetchProducts, products, deleteProduct, updateProduct } =
    useProductStore();

  const handleOpen = (product) => {
    setSelectedProduct(product); // Set the selected product
    setUpdatedProduct({
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  const handleClose = () => {
    setSelectedProduct(null); // Clear the selected product
    setUpdatedProduct({ name: "", price: "", image: "" });
  };

  /*const handleUpdate = async (id, updatedProduct) => {
    if (!updatedProduct.name || !updatedProduct.price || !updatedProduct.image) {
      toast.error("Please fill all fields");
      return;
    }

    const { success, message } = await updateProduct(id, updatedProduct);
    if (success) {
      toast.success(message);
      handleClose(); // Close the modal
    } else {
      toast.error("Failed to update product");
    }
  };*/

  const handleUpdate = async (id, updatedProduct) => {
    if (
      !updatedProduct.name ||
      !updatedProduct.price ||
      !updatedProduct.image
    ) {
      toast.error("Please fill all fields");
      return;
    }

    const { success, message } = await updateProduct(id, updatedProduct);
    if (success) {
      toast.success(message);
      handleClose(); // Close the modal
    } else {
      toast.error("Failed to update product");
    }
  };

  async function handleDelete(id) {
    const { success, message } = await deleteProduct(id);
    if (!success) {
      toast.error("Error deleting product");
    } else {
      toast.success(message);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className=" flex flex-col gap-10 items-center mt-10">
      <h1 className="text-4xl text-zinc-300 text-center font-bold">
        Product List
      </h1>
      {products.length > 0 ? (
        <div className=" flex flex-wrap justify-center gap-5">
          {products.map((product) => (
            <div key={product._id}>
              <div className=" bg-slate-900 p-5 rounded-[5px] flex flex-col items-center gap-2">
                <img
                  className=" w-[200px] h-[200px] object-cover rounded-[5px]"
                  src={product.image}
                  alt={product.name}
                />
                <p className=" pt-2 text-white font-bold">{product.name}</p>
                <p className=" text-white font-bold">${product.price}</p>

                <div className="flex flex-row pt-2 self-center gap-1">
                  <button
                    onClick={() => handleDelete(product._id)}
                    className=" border border-transparent bg-black rounded-[5px] cursor-pointer px-4 py-2"
                  >
                    <Trash2 color="#ffffff" />
                  </button>
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

                  <button
                    onClick={() => handleOpen(product)}
                    className="text-white font-bold outline-none border border-transparent bg-sky-950 rounded-[5px] cursor-pointer px-4 py-2"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="font-bold text-2xl text-white">
          No products found 🥲,{" "}
          <Link className="text-blue-900 hover:underline" to={"/create"}>
            Create Products
          </Link>{" "}
        </p>
      )}

      {/* Modal */}
      {selectedProduct && (
        <Modal
          open={!!selectedProduct} // Open only when a product is selected
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdate(selectedProduct._id, updatedProduct);
              }}
              className=" flex flex-col gap-5 items-center"
            >
              <input
                className=" w-[300px] h-[40px] border border-transparent bg-slate-900 rounded-[5px] px-2"
                type="text"
                name="name"
                value={updatedProduct.name}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    name: e.target.value,
                  })
                }
                placeholder="Product Name"
              />
              <input
                className=" w-[300px] h-[40px] border border-transparent bg-slate-900 rounded-[5px] px-2"
                type="text"
                name="price"
                value={updatedProduct.price}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    price: e.target.value,
                  })
                }
                placeholder="Product Price"
              />
              <input
                className=" w-[300px] h-[40px] border border-transparent bg-slate-900 rounded-[5px] px-2"
                type="text"
                name="image"
                value={updatedProduct.image}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    image: e.target.value,
                  })
                }
                placeholder="Product Image"
              />
              <button
                className=" w-[300px] h-[40px] border border-transparent bg-sky-950 rounded-[5px] cursor-pointer px-4 py-2"
                type="submit"
              >
                Update Product
              </button>
            </form>
          </Box>
        </Modal>
      )}
    </div>
  );
}
