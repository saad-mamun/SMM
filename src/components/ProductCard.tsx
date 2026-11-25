import { motion } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import type { Product } from "../data/products";

export default function ProductCard({ product, index }: { product: Product; index: number }) {
  const { addToCart } = useCart();
  const Icon = product.icon;

  return (
    <motion.article className="product-card" layout initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.35, delay: index * 0.04 }} whileHover={{ y: -6 }}>
      <Link to={`/products/${product.slug}`} className={`product-art product-art-${product.color}`} aria-label={`View details: ${product.name}`}>
        <span className="product-art-kicker">{product.category}</span>
        <span className="product-art-glyph"><Icon size={31} strokeWidth={1.5} /></span>
        <span className="product-art-orb orb-1"></span><span className="product-art-orb orb-2"></span>
        <span className="product-art-title">{product.name}</span>
        {product.oldPrice && <span className="discount-tag">DEMO OFFER</span>}
      </Link>
      <div className="product-info">
        <div className="product-category-line"><span>{product.category}</span><span className="product-new">{product.latest ? "NEW" : "CURATED"}</span></div>
        <Link to={`/products/${product.slug}`} className="product-name"><h3>{product.name}</h3><ArrowUpRight size={16} /></Link>
        <p>{product.description}</p>
        <div className="product-card-bottom"><div className="product-price"><span className="price-label">SAMPLE PRICE</span><strong>${product.price.toFixed(2)}</strong>{product.oldPrice && <del>${product.oldPrice.toFixed(2)}</del>}</div><button className="add-cart-button" aria-label={`Buy ${product.name} now`} onClick={() => addToCart(product)}><span>Buy now</span><Plus size={14} /></button></div>
      </div>
    </motion.article>
  );
}
