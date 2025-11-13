import ProductCard from "./ProductCard";

export default function ProductsGrid({ products }) {
  return (
    <div className="grid mr-5 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={(id) => console.log("Add to cart:", id)}
          onToggleFavorite={(id) => console.log("Toggle favorite:", id)}
        />
      ))}
    </div>
  );
}