import ProductListingComponent from "@/components/ProductListingComponent";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
      <ProductListingComponent />
  );
}
