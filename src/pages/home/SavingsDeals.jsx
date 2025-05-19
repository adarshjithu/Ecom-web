import ProductCard from "@/components/ui/ProductCard";

const SavingsDeals = () => {
  return (
    <div>
      <span className="text-2xl font-medium">Super Saving Deals</span>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-4">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  );
};

export default SavingsDeals;
