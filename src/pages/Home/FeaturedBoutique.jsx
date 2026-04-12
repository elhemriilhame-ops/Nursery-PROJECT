import { ProductCard } from '@/components/shop/ProductCard';
import { useProducts } from '@/context/ProductContext';

export function FeaturedBoutique() {
  const { getFeaturedProducts, loading } = useProducts();
  const featured = getFeaturedProducts().slice(0, 4);

  if (loading) return (
    <div className="flex justify-center py-20">
      <div className="w-10 h-10 border-2 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-24">
      {featured.map((product) => (
        <ProductCard 
          key={product.id}
          {...product}
        />
      ))}
    </div>
  );
}
