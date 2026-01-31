import { useEffect, useMemo, useState } from "react";
import { fetchProducts } from "../services/api";
import { useSearch } from "../context/SearchContext";
import CategoryBar from "../components/CategoryBar";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";

export default function Home() {
  // DATA STATE
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // UI STATE
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");

  // GLOBAL SEARCH (FROM NAVBAR)
  const { search } = useSearch();

  // FETCH PRODUCTS
  useEffect(() => {
    fetchProducts()
      .then(data => setProducts(data))
      .finally(() => setLoading(false));
  }, []);

  // DERIVE CATEGORIES (FOR CATEGORY BAR)
  const categories = useMemo(() => {
    return ["all", ...new Set(products.map(p => p.category))];
  }, [products]);

  // FILTER + SEARCH + SORT PRODUCTS
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // CATEGORY FILTER
    if (category !== "all") {
      list = list.filter(p => p.category === category);
    }

    // SEARCH FILTER
    if (search.trim()) {
      const term = search.toLowerCase();
      list = list.filter(p =>
        p.title.toLowerCase().includes(term)
      );
    }

    // SORTING
    if (sort === "low") {
      list.sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      list.sort((a, b) => b.price - a.price);
    }

    return list;
  }, [products, category, search, sort]);

  if (loading) return <Loader />;

  return (
    <>
      {/* HERO SECTION */}
      <section className="mb-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
          Discover Quality Products
        </h1>
        <p className="text-blue-100 max-w-2xl">
          Browse categories, search instantly, and shop with confidence.
        </p>
      </section>

      {/* CATEGORY NAVIGATION (FLIPKART STYLE) */}
      <CategoryBar
        categories={categories}
        active={category}
        onChange={setCategory}
      />

      {/* SORT CONTROL */}
      <div className="bg-white rounded-xl shadow-sm p-4 my-6 flex justify-end">
        <select
          className="border rounded-lg px-4 py-2 text-sm sm:text-base cursor-pointer"
          value={sort}
          onChange={e => setSort(e.target.value)}
        >
          <option value="default">Sort By</option>
          <option value="low">Price: Low → High</option>
          <option value="high">Price: High → Low</option>
        </select>
      </div>

      {/* PRODUCTS GRID */}
      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500">
          No products found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </>
  );
}
