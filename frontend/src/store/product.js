import { create } from 'zustand'

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),
    createProduct: async (newProduct) => {
        if (!newProduct.name || !newProduct.price || !newProduct.image) {
            return { success: false, message: "Please fill all fields" };
        }

        const res = await fetch('/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        });
        const data = await res.json();
        set((state) => ({
            products: [...state.products, data.product]
        }));
        return { success: true, message: "Product created successfully" };
    },

    fetchProducts: async () => {
        try {
            const res = await fetch('/api/products');
            if (!res.ok) throw new Error('Failed to fetch products');
            const data = await res.json();
            set({ products: data });
        } catch (error) {
            console.error("Error in fetchProducts:", error);
        }
    },

    deleteProduct: async (id) => {
        const res = await fetch(`/api/products/${id}`, {
            method: 'DELETE'
        });
        if (!res.ok) throw new Error('Failed to delete product');
        set((state) => ({
            products: state.products.filter((product) => product._id !== id)
        }));
        return { success: true, message: "Product deleted successfully" };
    },

    updateProduct: async (id, updatedProduct) => {
        try {
            const res = await fetch(`/api/products/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedProduct),
            });
            if (!res.ok) throw new Error('Failed to update product');
            const data = await res.json();
            set((state) => ({
                products: state.products.map((product) =>
                    product._id === id ? data.product : product
                ),
            }));
            return { success: true, message: "Product updated successfully" };
        } catch (error) {
            console.error("Error updating product:", error);
            return { success: false, message: "Failed to update product" };
        }
    }

}))

