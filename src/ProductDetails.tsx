import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  Clock3,
  Headphones,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductCard from "./components/ProductCard";
import { useCart } from "./context/CartContext";
import { products } from "./data/products";

export default function ProductDetails() {
  const { slug } = useParams();
  const product = products.find((item) => item.slug === slug);
  const { addToCart } = useCart();
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const Icon = product?.icon;

  useEffect(() => {
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const ogTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]');
    const ogDescription = document.querySelector<HTMLMetaElement>('meta[property="og:description"]');
    const previousDescription = description?.content;
    const previousOgTitle = ogTitle?.content;
    const previousOgDescription = ogDescription?.content;
    if (product) {
      document.title = `${product.name} — TopSmmBoost`;
      if (description) description.content = `${product.name}: ${product.description} Demonstration listing with editable sample details from TopSmmBoost.`;
      if (ogTitle) ogTitle.content = document.title;
      if (ogDescription) ogDescription.content = product.description;
    }
    return () => {
      document.title = "TopSmmBoost — Digital, made simpler";
      if (description && previousDescription) description.content = previousDescription;
      if (ogTitle && previousOgTitle) ogTitle.content = previousOgTitle;
      if (ogDescription && previousOgDescription) ogDescription.content = previousOgDescription;
    };
  }, [product]);

  if (!product || !Icon) {
    return <main className="not-found"><div className="eyebrow">PRODUCT NOT FOUND</div><h1>This pick isn't here.</h1><p>We couldn't find that product. Explore the collection to see what's available.</p><Link className="button button-primary" to="/"><ArrowLeft size={16} /> Back to home</Link></main>;
  }

  const contactText = encodeURIComponent(`Hi! I'm interested in ${product.name} (sample listing). Could you share the current details?`);
  const related = products.filter((item) => item.slug !== product.slug && item.category === product.category).slice(0, 3);

  return (
    <motion.main className="detail-page" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
      <div className="container">
        <div className="breadcrumbs"><Link to="/">Home</Link><ChevronRight size={13} /><a href="/#products">Products</a><ChevronRight size={13} /><span>{product.name}</span></div>
        <div className="detail-layout">
          <div className="detail-gallery">
            <div className={`detail-main-art product-art-${product.color} preview-${activeImage}`}><div className="detail-art-grid"></div><span className="detail-art-kicker">{product.category} / DIGITAL COLLECTION</span><Icon size={74} strokeWidth={1.2} /><strong>{product.name}</strong><span className="detail-art-caption">{["A little more clarity for what comes next.", "Thoughtful details, ready to make your own.", "A practical fit for your next step."][activeImage]}</span></div>
            <div className="detail-thumbnails">{[0, 1, 2].map((image) => <button key={image} className={activeImage === image ? "thumb-active" : ""} onClick={() => setActiveImage(image)} aria-label={`Select product preview ${image + 1}`}><Icon size={22} /><span>Preview 0{image + 1}</span></button>)}</div>
          </div>
          <div className="detail-copy">
            <div className="eyebrow"><span className="eyebrow-dot"></span>{product.category}</div>
            <h1>{product.name}</h1>
            <div className="detail-sample-notice"><Sparkles size={14} /> Demonstration listing — editable sample details</div>
            <p className="detail-lede">{product.longDescription}</p>
            <div className="detail-price-row"><span className="detail-price">${product.price.toFixed(2)}</span>{product.oldPrice && <del>${product.oldPrice.toFixed(2)}</del>}<span className="sample-price-label">SAMPLE PRICE</span></div>
            <p className="detail-tax-note">Illustrative price only. Confirm current pricing and availability before ordering.</p>
            <div className="package-box"><div><span className="package-radio"></span><span><b>{product.package}</b><small>Single digital product or service</small></span></div><strong>${product.price.toFixed(2)}</strong></div>
            <div className="detail-buy-row"><div className="quantity-control"><button aria-label="Decrease quantity" onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus size={14} /></button><span>{quantity}</span><button aria-label="Increase quantity" onClick={() => setQuantity(quantity + 1)}><Plus size={14} /></button></div><button className="button button-primary detail-add" onClick={() => { for (let i = 0; i < quantity; i += 1) addToCart(product); }}>Buy now <ShoppingBag size={17} /></button></div>
            <a className="button button-outline detail-contact" href={`https://t.me/LitonAli60?text=${contactText}`} target="_blank" rel="noreferrer">Ask about this product <ArrowUpRight size={15} /></a>
            <div className="detail-reassurance"><span><ShieldCheck size={15} /> Confirm details before ordering</span><span><Headphones size={15} /> Friendly support available</span></div>
          </div>
        </div>
        <div className="detail-extras">
          <div className="detail-description"><div className="eyebrow"><span className="eyebrow-dot"></span> THE DETAILS</div><h2>A little more about<br /><span className="serif-accent">this one.</span></h2><p>{product.longDescription}</p><h3>What’s included</h3><ul>{product.features.map((feature) => <li key={feature}><Check size={16} />{feature}</li>)}</ul><div className="delivery-box"><Clock3 size={18} /><div><b>Delivery & support</b><p>{product.delivery}</p></div></div></div>
          <div className="detail-faq"><div className="eyebrow"><span className="eyebrow-dot"></span> BEFORE YOU ORDER</div><h3>Good to know</h3><div><b>Is this product right for me?</b><p>Reach out and tell us what you’re looking for. We’ll gladly help confirm whether it’s a good fit.</p></div><div><b>When will I receive it?</b><p>{product.delivery}</p></div><div><b>What does this sample price mean?</b><p>This is editable demo content, not a confirmed offer. Please contact us for current terms.</p></div></div>
        </div>
        {related.length > 0 && <section className="related-products"><div className="related-heading"><div><div className="eyebrow"><span className="eyebrow-dot"></span> KEEP EXPLORING</div><h2>You might also <span className="serif-accent">like.</span></h2></div><Link className="text-link" to="/#products">Browse everything <ArrowRight size={15} /></Link></div><div className="product-grid related-grid">{related.map((item, index) => <ProductCard key={item.slug} product={item} index={index} />)}</div></section>}
      </div>
    </motion.main>
  );
}
