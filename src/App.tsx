import { AnimatePresence, motion, type Variants } from "framer-motion";
import {
  ArrowDown,
  ArrowDownUp,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  CreditCard,
  ExternalLink,
  Headphones,
  Heart,
  LayoutGrid,
  Mail,
  Menu,
  MessageCircle,
  Minus,
  Plus,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  WandSparkles,
  X,
  Zap,
} from "lucide-react";
import {
  lazy,
  Suspense,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { Link, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import ProductCard from "./components/ProductCard";
import { CartContext, useCart, type CartLine } from "./context/CartContext";
import { categories, products, type Category, type Product } from "./data/products";

const ProductDetails = lazy(() => import("./ProductDetails"));

const reveal: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

function App() {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const addToCart = (product: Product) => {
    setCart((current) => {
      const existing = current.find((line) => line.product.slug === product.slug);
      return existing
        ? current.map((line) =>
            line.product.slug === product.slug ? { ...line, quantity: line.quantity + 1 } : line,
          )
        : [...current, { product, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const cartValue = useMemo(
    () => ({ addToCart, cart, setCart, openCart: () => setCartOpen(true) }),
    [cart],
  );

  return (
    <CartContext.Provider value={cartValue}>
      <ScrollToTop />
      <Header onSearch={setSearchQuery} openCart={() => setCartOpen(true)} cartCount={cart.reduce((sum, line) => sum + line.quantity, 0)} />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home searchQuery={searchQuery} onSearch={setSearchQuery} />} />
          <Route path="/products/:slug" element={<Suspense fallback={<PageLoading />}><ProductDetails /></Suspense>} />
          <Route path="/privacy" element={<PolicyPage kind="Privacy" />} />
          <Route path="/terms" element={<PolicyPage kind="Terms" />} />
          <Route path="/refund" element={<PolicyPage kind="Refund" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
      <Footer />
      <a
        className="whatsapp-float"
        href="https://wa.me/8801580621597"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with us on WhatsApp"
      >
        <MessageCircle size={23} strokeWidth={2.2} />
      </a>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </CartContext.Provider>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
}

function Header({
  onSearch,
  openCart,
  cartCount,
}: {
  onSearch: (query: string) => void;
  openCart: () => void;
  cartCount: number;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 18);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const submitSearch = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(query);
    setSearchOpen(false);
    setMenuOpen(false);
    if (location.pathname !== "/") navigate("/#products");
    else document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="announcement">
        <Sparkles size={14} />
        <span>A little more clarity for your next big idea.</span>
        <a href="/#products">Explore the collection <ArrowRight size={13} /></a>
      </div>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="container header-inner">
          <Link to="/" className="brand" aria-label="TopSmmBoost home">
            <span className="brand-mark"><span></span><span></span><span></span><span></span></span>
            <span>TopSmm<span className="brand-accent">Boost</span><small>Digital, made simpler</small></span>
          </Link>
          <nav className={`main-nav ${menuOpen ? "nav-open" : ""}`} aria-label="Main navigation">
            <a className={location.pathname === "/" ? "nav-active" : ""} href="/#home" onClick={() => setMenuOpen(false)}>Home</a>
            <a href="/#products" onClick={() => setMenuOpen(false)}>All Products</a>
            <a href="/?category=Social%20Media#products" onClick={() => setMenuOpen(false)}>Social Media</a>
            <div className="nav-dropdown">
              <a href="/#categories" onClick={() => setMenuOpen(false)}>Digital Services <ChevronDown size={14} /></a>
              <div className="dropdown-panel">
                {categories.slice(1).map((category) => (
                  <a key={category.name} href={`/?category=${encodeURIComponent(category.name)}#products`} onClick={() => setMenuOpen(false)}>
                    <category.icon size={16} /> {category.name}
                  </a>
                ))}
              </div>
            </div>
            <a href="/#about" onClick={() => setMenuOpen(false)}>About Us</a>
            <a href="/#contact" onClick={() => setMenuOpen(false)}>Contact</a>
            {menuOpen && <a className="mobile-menu-link" href="/#faq" onClick={() => setMenuOpen(false)}>FAQs</a>}
          </nav>
          <div className="header-actions">
            <button className={`icon-button search-trigger ${searchOpen ? "active" : ""}`} aria-label="Search products" onClick={() => setSearchOpen((open) => !open)}>
              {searchOpen ? <X size={19} /> : <Search size={19} />}
            </button>
            <button className="icon-button cart-trigger" aria-label={`Open cart, ${cartCount} items`} onClick={openCart}>
              <ShoppingBag size={19} />
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </button>
            <a className="button button-small header-cta" href="/#products">Browse products <ArrowUpRight size={15} /></a>
            <button className="icon-button menu-toggle" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen((open) => !open)}>
              {menuOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {searchOpen && (
            <motion.form
              className="search-panel"
              onSubmit={submitSearch}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              <Search size={19} />
              <input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search digital tools and services..." aria-label="Search products" />
              <button type="submit" className="button button-small">Search</button>
            </motion.form>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}

function Home({ searchQuery, onSearch }: { searchQuery: string; onSearch: (query: string) => void }) {
  const location = useLocation();
  const [categoryFilter, setCategoryFilter] = useState("All categories");
  const [sortBy, setSortBy] = useState("featured");
  const [maxPrice, setMaxPrice] = useState("all");
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState("Featured");

  useEffect(() => {
    const requestedCategory = new URLSearchParams(location.search).get("category");
    if (requestedCategory && categories.some((category) => category.name === requestedCategory)) {
      setCategoryFilter(requestedCategory);
    } else {
      setCategoryFilter("All categories");
    }
  }, [location.search]);

  const filteredProducts = useMemo(() => {
    let result = [...products];
    if (categoryFilter !== "All categories") result = result.filter((product) => product.category === categoryFilter);
    if (searchQuery.trim()) {
      const needle = searchQuery.toLowerCase();
      result = result.filter((product) => `${product.name} ${product.description} ${product.category}`.toLowerCase().includes(needle));
    }
    if (maxPrice !== "all") result = result.filter((product) => product.price <= Number(maxPrice));
    if (sortBy === "price-low") result.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-high") result.sort((a, b) => b.price - a.price);
    else if (sortBy === "latest") result.sort((a, b) => Number(b.latest) - Number(a.latest));
    else if (sortBy === "popular") result.sort((a, b) => Number(b.featured) - Number(a.featured));
    else result.sort((a, b) => Number(b.featured) - Number(a.featured));
    return result;
  }, [categoryFilter, maxPrice, searchQuery, sortBy]);

  const tabProducts = searchQuery.trim()
    ? filteredProducts
    : activeTab === "Latest"
    ? filteredProducts.filter((product) => product.latest)
    : activeTab === "Best sellers"
      ? filteredProducts.filter((product) => product.featured)
    : activeTab === "Special offers"
      ? filteredProducts.filter((product) => product.oldPrice)
      : filteredProducts;

  const selectCategory = (category: Category) => {
    setCategoryFilter(category);
    setActiveTab("Featured");
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.main initial="hidden" animate="show" exit={{ opacity: 0, y: 12 }}>
      <section className="hero-section" id="home">
        <div className="hero-grid-pattern"></div>
        <div className="container hero-layout">
          <motion.div className="hero-copy" variants={reveal}>
            <div className="eyebrow"><span className="eyebrow-dot"></span> A better way to grow online</div>
            <h1>Your Trusted Partner<br />for <span className="text-gradient">Premium Digital<br />Solutions</span></h1>
            <p className="hero-lede">Discover quality digital products and professional services with reliable support, competitive pricing, and a seamless shopping experience.</p>
            <div className="hero-actions">
              <a href="#products" className="button button-primary">Explore products <ArrowRight size={17} /></a>
              <a href="#contact" className="button button-quiet"><span className="play-icon"><ArrowRight size={13} /></span> Contact Us</a>
            </div>
            <div className="hero-proof"><span className="proof-mark"><Sparkles size={16} /></span><div><b>Thoughtful tools. Friendly support.</b><p>A good place to find your next step.</p></div></div>
          </motion.div>
          <motion.div className="hero-art" variants={reveal}>
            <div className="hero-art-glow"></div>
            <div className="art-orbit orbit-one"></div><div className="art-orbit orbit-two"></div>
            <div className="hero-dashboard">
              <div className="dashboard-top"><div className="mini-brand"><span className="brand-mark mini"><span></span><span></span><span></span><span></span></span> your workspace</div><div className="dashboard-dots"><i></i><i></i><i></i></div></div>
              <div className="dashboard-heading"><div><span className="tiny-label">YOUR NEXT CHAPTER</span><h3>Ideas into action.</h3></div><div className="dash-badge"><WandSparkles size={16} /></div></div>
              <div className="dashboard-chart"><div className="chart-labels"><span>MAKE</span><span>PLAN</span><span>GROW</span></div><div className="chart-bars"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div><div className="chart-line"></div><div className="chart-spot"></div></div>
              <div className="dashboard-bottom"><div className="dashboard-task"><span className="task-check"><Check size={12} /></span><span>Build your brand</span><span className="task-tag">IN PROGRESS</span></div><div className="dashboard-task"><span className="task-check muted"><Check size={12} /></span><span>Plan your content</span><span className="task-tag light-tag">UP NEXT</span></div></div>
            </div>
            <motion.div className="float-card float-card-top" animate={{ y: [0, -8, 0], rotate: [0, 1, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
              <span className="float-icon purple"><Sparkles size={17} /></span><span><b>Ideas, meet action</b><small>Your toolkit is ready</small></span><ArrowUpRight size={16} className="float-arrow" />
            </motion.div>
            <motion.div className="float-card float-card-bottom" animate={{ y: [0, 7, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}>
              <span className="float-icon green"><BadgeCheck size={18} /></span><span><b>A little more clarity</b><small>One step at a time</small></span>
            </motion.div>
            <div className="hero-sparkle sparkle-a">✳</div><div className="hero-sparkle sparkle-b">✦</div>
          </motion.div>
        </div>
        <div className="container hero-bottom">
          <div className="hero-bottom-note"><span className="scroll-cue"><ArrowDown size={15} /></span> Scroll to explore</div>
          <div className="hero-promise"><span><ShieldCheck size={15} /> Clear, honest information</span><span><Zap size={15} /> A smoother way to order</span><span><Heart size={15} /> Human support when you need it</span></div>
        </div>
      </section>

      <section className="category-section section-pad" id="categories">
        <div className="container">
          <SectionHeading kicker="GOOD THINGS, ORGANIZED" title={<>A little something for<br /><span className="serif-accent">every next step.</span></>} description="Explore a collection of practical digital tools and services, thoughtfully grouped to make finding your thing feel easy." />
          <div className="category-grid">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.button className={`category-card category-${index + 1}`} key={category.name} onClick={() => selectCategory(category.name)} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                  <div className="category-icon"><Icon size={20} /></div>
                  <span className="category-count">{String(products.filter((p) => p.category === category.name).length).padStart(2, "0")} PICKS</span>
                  <h3>{category.name}</h3>
                  <p>{category.description}</p>
                  <span className="category-arrow"><ArrowUpRight size={17} /></span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="product-section section-pad" id="products">
        <div className="container">
          <div className="product-header">
            <SectionHeading kicker="THE GOOD STUFF" title={<>Tools for your<br /><span className="serif-accent">next big thing.</span></>} description="Useful little helpers, creative resources, and friendly services to help you move forward." />
            <a href="#contact" className="text-link">Need a recommendation? <ArrowRight size={15} /></a>
          </div>
          <div className="catalog-notice"><Sparkles size={15} /><span><b>Preview catalog:</b> Product details and prices are editable sample content, provided for demonstration.</span></div>
          <div className="catalog-toolbar">
            <div className="catalog-tabs" role="tablist" aria-label="Product collection">
              {["Featured", "Best sellers", "Latest", "Special offers"].map((tab) => <button key={tab} role="tab" aria-selected={activeTab === tab} className={activeTab === tab ? "tab-active" : ""} onClick={() => setActiveTab(tab)}>{tab}{tab === "Special offers" && <span className="tab-spark">✦</span>}</button>)}
            </div>
            <div className="filter-row">
              <label className="select-wrap"><LayoutGrid size={15} /><select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)} aria-label="Filter by category"><option>All categories</option>{categories.map((category) => <option key={category.name}>{category.name}</option>)}</select><ChevronDown size={14} /></label>
              <label className="select-wrap price-select"><CreditCard size={15} /><select value={maxPrice} onChange={(event) => setMaxPrice(event.target.value)} aria-label="Filter by maximum price"><option value="all">Any price</option><option value="15">Under $15</option><option value="25">Under $25</option><option value="40">Under $40</option><option value="50">Under $50</option></select><ChevronDown size={14} /></label>
              <label className="select-wrap sort-select"><ArrowDownUp size={15} /><select value={sortBy} onChange={(event) => setSortBy(event.target.value)} aria-label="Sort products"><option value="featured">Sort: Featured</option><option value="popular">Popularity</option><option value="latest">Latest</option><option value="price-low">Price: Low to High</option><option value="price-high">Price: High to Low</option></select><ChevronDown size={14} /></label>
            </div>
          </div>
          {searchQuery && <div className="search-results-note">Showing results for <b>“{searchQuery}”</b> <button onClick={() => onSearch("")}>Clear search <X size={13} /></button></div>}
          <motion.div className="product-grid" layout>
            <AnimatePresence mode="popLayout">
              {tabProducts.map((product, index) => <ProductCard key={product.slug} product={product} index={index} />)}
            </AnimatePresence>
          </motion.div>
          {tabProducts.length === 0 && <div className="empty-results"><Search size={25} /><h3>No matching products just yet</h3><p>Try a different search or loosen your filters.</p><button className="button button-outline" onClick={() => { onSearch(""); setCategoryFilter("All categories"); setMaxPrice("all"); }}>Clear filters</button></div>}
          <div className="catalog-bottom"><span>Showing <b>{tabProducts.length}</b> of {products.length} demo products</span><a href="#contact">Looking for something else? <ArrowRight size={14} /></a></div>
        </div>
      </section>

      <section className="why-section section-pad">
        <div className="container">
          <SectionHeading kicker="A BETTER KIND OF MARKETPLACE" title={<>Why Choose<br /><span className="serif-accent">TopSmmBoost?</span></>} description="We believe finding the right digital solution should feel simple, clear, and genuinely helpful." centered />
          <div className="value-grid">
            <ValueCard icon={BadgeCheck} title="Quality-minded selection" description="Practical resources and services, with clear details to help you decide." />
            <ValueCard icon={CreditCard} title="Transparent pricing" description="Sample prices are clearly marked; confirm current pricing before ordering." />
            <ValueCard icon={Zap} title="Clear delivery expectations" description="We agree on delivery timing with you before an order is placed." />
            <ValueCard icon={Headphones} title="Friendly customer support" description="Reach out when you have a question. We're happy to help." />
            <ValueCard icon={ShieldCheck} title="Careful order handling" description="Orders and conversations are treated with consideration." />
            <ValueCard icon={Heart} title="Customer-first service" description="Friendly guidance to help you choose what fits your needs." />
          </div>
        </div>
      </section>

      <section className="provider-section section-pad" id="about">
        <div className="container provider-layout">
          <motion.div className="provider-art" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={reveal}>
            <div className="provider-blob"></div>
            <div className="provider-window">
              <div className="window-bar"><span></span><span></span><span></span><b>your-next-step.co</b><ExternalLink size={12} /></div>
              <div className="window-content"><span className="window-kicker">A SPACE TO GROW</span><h3>Make room<br />for what's next.</h3><p>Thoughtful tools for the things you want to do.</p><div className="window-button">Explore the collection <ArrowRight size={13} /></div><div className="window-shapes"><span></span><span></span><span></span></div></div>
            </div>
            <div className="provider-sticker"><span className="sticker-star">✳</span><span>Small steps.<br /><b>Good things.</b></span></div>
            <div className="provider-note"><span className="note-icon"><Sparkles size={15} /></span><span><b>Made with intention</b><small>Every detail matters</small></span></div>
          </motion.div>
          <motion.div className="provider-copy" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }} variants={reveal}>
            <div className="eyebrow"><span className="eyebrow-dot"></span> Get to Know TopSmmBoost</div>
            <h2>Your Trusted Digital<br /><span className="serif-accent">Solutions Provider.</span></h2>
            <p>TopSmmBoost is an independent digital marketplace focused on providing quality digital solutions and a smooth customer experience. Our goal is to make discovering and purchasing digital services simple, convenient, and reliable.</p>
            <p className="provider-mission">Our mission is to make digital discovery simpler; our vision is a welcoming marketplace built on clarity, care, and honest communication.</p>
            <div className="provider-points"><span><Check size={15} /> Quality-focused offerings and transparent pricing</span><span><Check size={15} /> Professional support, clear communication, easy ordering</span><span><Check size={15} /> Customer-first approach at every step</span></div>
            <a href="#contact" className="button button-primary">Get to know us <ArrowRight size={16} /></a>
            <span className="editable-note">Brand story and service details are ready for your final review.</span>
          </motion.div>
        </div>
      </section>

      <section className="stats-section">
        <div className="container stats-inner">
          <div className="stats-title"><div className="eyebrow"><span className="eyebrow-dot"></span> A QUICK LOOK AROUND</div><p>Catalog overview, built from editable demo content.</p></div>
          <div className="stats-grid">
            <StatCard value={categories.length} label="Curated categories" />
            <StatCard value={products.length} label="Demo product listings" />
            <StatCard value={3} label="Ways to get in touch" />
          </div>
        </div>
      </section>

      <section className="steps-section section-pad">
        <div className="container">
          <SectionHeading kicker="A FEW SIMPLE STEPS" title={<>From “that's interesting”<br />to <span className="serif-accent">“let's do this.”</span></>} description="We've kept the process easy, so you can focus on the part that matters." centered />
          <div className="steps-grid">
            <StepCard number="01" icon={Search} title="Explore your options" description="Browse the collection and find a tool or service that feels right." />
            <StepCard number="02" icon={Heart} title="Choose what fits" description="Review the details and ask us anything before you decide." />
            <StepCard number="03" icon={MessageCircle} title="Get in touch" description="Send an inquiry to confirm the package and ordering details." />
            <StepCard number="04" icon={Sparkles} title="Make it happen" description="Once everything is agreed, we’ll help you take the next step." />
          </div>
        </div>
      </section>

      <section className="testimonial-section section-pad">
        <div className="container testimonial-layout">
          <div className="testimonial-intro"><div className="eyebrow"><span className="eyebrow-dot"></span> KIND WORDS, COMING SOON</div><h2>Good things are<br />better <span className="serif-accent">shared.</span></h2><p>We care about the experience as much as the result. Customer stories will appear here with permission.</p><div className="testimonial-controls"><button aria-label="Previous testimonial" disabled><ChevronLeft size={18} /></button><button aria-label="Next testimonial" disabled><ChevronRight size={18} /></button><span>— / —</span></div></div>
          <div className="testimonial-card"><div className="quote-mark">“</div><div className="testimonial-placeholder"><div className="placeholder-avatar"><Heart size={20} /></div><div><b>Your story could be here.</b><span>We only publish feedback with customer permission.</span></div></div><div className="testimonial-card-bottom"><span className="placeholder-stars"><Star /><Star /><Star /><Star /><Star /></span><span className="placeholder-label">CUSTOMER FEEDBACK PLACEHOLDER</span></div></div>
        </div>
      </section>

      <section className="faq-section section-pad" id="faq">
        <div className="container faq-layout">
          <div className="faq-intro"><div className="eyebrow"><span className="eyebrow-dot"></span> GOOD TO KNOW</div><h2>A few things<br />you might <span className="serif-accent">wonder.</span></h2><p>Still have a question? We're just a message away.</p><a className="text-link" href="#contact">Ask us directly <ArrowRight size={15} /></a><div className="faq-art"><div className="faq-art-circle"><CircleHelp size={42} /></div><span className="faq-art-spark">✦</span><span className="faq-art-dots">· · · · ·</span></div></div>
          <div className="faq-list">
            {[
              ["How can I purchase a product?", "Start by sending us an inquiry through Telegram or email. We'll confirm the current package, price, and delivery details with you before you decide."],
              ["What payment methods are available?", "Payment options are confirmed directly during your inquiry, before an order is placed."],
              ["How long does delivery take?", "Delivery timing depends on the selected product or service. We'll share an estimated timeline before you order."],
              ["How can I contact customer support?", "Message us on Telegram at @LitonAli60 or email mamunali88991@gmail.com. You can also reach us through WhatsApp using the chat icon."],
              ["What if I experience a problem?", "Please contact us with your order details. We'll review the issue with you and discuss the available next steps."],
              ["Do you provide after-sales support?", "Support details depend on the product or service. Please ask us about the support included before ordering."],
            ].map(([question, answer], index) => (
              <div className={`faq-item ${activeFaq === index ? "faq-open" : ""}`} key={question}>
                <button aria-expanded={activeFaq === index} onClick={() => setActiveFaq(activeFaq === index ? null : index)}><span className="faq-number">0{index + 1}</span><span>{question}</span><span className="faq-toggle">{activeFaq === index ? <Minus size={16} /> : <Plus size={16} />}</span></button>
                <AnimatePresence initial={false}>{activeFaq === index && <motion.div className="faq-answer" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}><p>{answer}</p></motion.div>}</AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-section section-pad" id="contact">
        <div className="container">
          <div className="contact-card">
            <div className="contact-orb orb-one"></div><div className="contact-orb orb-two"></div>
            <div className="contact-content"><div className="eyebrow light-eyebrow"><span className="eyebrow-dot"></span> LET'S TALK ABOUT IT</div><h2>Good things start<br />with a <span>hello.</span></h2><p>Have a question, an idea, or just want a little guidance? We're listening.</p><div className="contact-links"><a href="https://t.me/LitonAli60" target="_blank" rel="noreferrer"><span className="contact-icon telegram-icon">✈</span><span><small>TELEGRAM</small><b>@LitonAli60</b></span><ArrowUpRight size={16} /></a><a href="mailto:mamunali88991@gmail.com"><span className="contact-icon"><Mail size={18} /></span><span><small>EMAIL</small><b>mamunali88991@gmail.com</b></span><ArrowUpRight size={16} /></a><a className="contact-whatsapp-icon" href="https://wa.me/8801580621597" target="_blank" rel="noreferrer" aria-label="Open WhatsApp chat"><span className="contact-icon"><MessageCircle size={19} /></span></a></div></div>
            <div className="contact-visual" aria-hidden="true"><div className="contact-visual-ring ring-a"></div><div className="contact-visual-ring ring-b"></div><div className="contact-visual-center"><span className="brand-mark big-mark"><span></span><span></span><span></span><span></span></span><span>Let's make<br />something <i>good.</i></span></div><span className="contact-mini-card"><Sparkles size={15} /> Your next step</span><span className="contact-tiny-star">✦</span></div>
          </div>
        </div>
      </section>
    </motion.main>
  );
}

function SectionHeading({ kicker, title, description, centered = false }: { kicker: string; title: ReactNode; description: string; centered?: boolean }) {
  return <div className={`section-heading ${centered ? "heading-centered" : ""}`}><div className="eyebrow"><span className="eyebrow-dot"></span>{kicker}</div><h2>{title}</h2><p>{description}</p></div>;
}

function ValueCard({ icon: Icon, title, description }: { icon: typeof BadgeCheck; title: string; description: string }) {
  return <motion.div className="value-card" whileHover={{ y: -4 }}><span className="value-icon"><Icon size={19} /></span><h3>{title}</h3><p>{description}</p></motion.div>;
}

function StatCard({ value, label }: { value: number; label: string }) {
  return <motion.div className="stat-card" initial={{ opacity: 0, y: 9 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.6 }}><strong>{String(value).padStart(2, "0")}</strong><span>{label}</span></motion.div>;
}

function StepCard({ number, icon: Icon, title, description }: { number: string; icon: typeof Search; title: string; description: string }) {
  return <div className="step-card"><span className="step-number">{number}</span><span className="step-icon"><Icon size={20} /></span><h3>{title}</h3><p>{description}</p><span className="step-arrow"><ArrowRight size={15} /></span></div>;
}

function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { cart, setCart } = useCart();
  const total = cart.reduce((sum, line) => sum + line.product.price * line.quantity, 0);
  const orderMessage = encodeURIComponent(`Hello! I'd like to ask about these sample catalog items:\n${cart.map((line) => `- ${line.product.name} x${line.quantity} (sample price $${line.product.price.toFixed(2)})`).join("\n")}\nPlease confirm current pricing and availability.`);
  const updateQuantity = (slug: string, delta: number) => {
    setCart((current) => current.map((line) => line.product.slug === slug ? { ...line, quantity: line.quantity + delta } : line).filter((line) => line.quantity > 0));
  };

  return (
    <AnimatePresence>
      {open && <>
        <motion.button className="drawer-backdrop" aria-label="Close cart" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
        <motion.aside className="cart-drawer" role="dialog" aria-modal="true" aria-label="Your cart" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 30, stiffness: 280 }}>
          <div className="drawer-header"><div><span className="eyebrow"><span className="eyebrow-dot"></span> YOUR SELECTION</span><h2>Your cart <span>({cart.reduce((sum, line) => sum + line.quantity, 0)})</span></h2></div><button className="icon-button" aria-label="Close cart" onClick={onClose}><X size={20} /></button></div>
          {cart.length === 0 ? <div className="cart-empty"><span className="cart-empty-icon"><ShoppingBag size={29} /></span><h3>Your cart is taking a breather.</h3><p>Explore the collection and add something that catches your eye.</p><button className="button button-primary" onClick={onClose}>Explore products <ArrowRight size={15} /></button></div> : <>
            <p className="cart-demo-note">Sample catalog items — please confirm final details with us.</p>
            <div className="cart-lines">{cart.map(({ product, quantity }) => { const Icon = product.icon; return <div className="cart-line" key={product.slug}><span className={`cart-line-art product-art-${product.color}`}><Icon size={21} /></span><div className="cart-line-copy"><Link to={`/products/${product.slug}`} onClick={onClose}>{product.name}</Link><span>${product.price.toFixed(2)} sample price</span><div className="mini-quantity"><button aria-label={`Remove one ${product.name}`} onClick={() => updateQuantity(product.slug, -1)}><Minus size={12} /></button><span>{quantity}</span><button aria-label={`Add one ${product.name}`} onClick={() => updateQuantity(product.slug, 1)}><Plus size={12} /></button></div></div><strong>${(product.price * quantity).toFixed(2)}</strong></div>; })}</div>
            <div className="cart-total"><span>Estimated sample total</span><strong>${total.toFixed(2)}</strong></div><a className="button button-primary cart-checkout" href={`https://t.me/LitonAli60?text=${orderMessage}`} target="_blank" rel="noreferrer" onClick={onClose}>Continue on Telegram <ArrowUpRight size={16} /></a><p className="cart-footnote">No payment is collected here. We'll confirm the actual details with you first.</p>
          </>}
        </motion.aside>
      </>}
    </AnimatePresence>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand-col"><Link to="/" className="brand footer-brand"><span className="brand-mark"><span></span><span></span><span></span><span></span></span><span>TopSmm<span className="brand-accent">Boost</span><small>Digital, made simpler</small></span></Link><p>Thoughtful digital tools and creative services for your next big idea.</p><div className="footer-socials"><a href="https://t.me/LitonAli60" aria-label="Telegram" target="_blank" rel="noreferrer"><span>✈</span></a><a href="mailto:mamunali88991@gmail.com" aria-label="Email"><Mail size={16} /></a><a href="https://wa.me/8801580621597" aria-label="WhatsApp" target="_blank" rel="noreferrer"><MessageCircle size={16} /></a></div></div>
          <div className="footer-column"><h3>Explore</h3><a href="/#home">Home</a><a href="/#about">About us</a><a href="/#products">All products</a><a href="/#contact">Contact</a><a href="/#faq">FAQs</a></div>
          <div className="footer-column"><h3>Collections</h3>{categories.map((category) => <a key={category.name} href={`/?category=${encodeURIComponent(category.name)}#products`}>{category.name}</a>)}</div>
          <div className="footer-column footer-contact"><h3>Say hello</h3><a href="https://t.me/LitonAli60" target="_blank" rel="noreferrer"><span className="footer-contact-icon">✈</span>@LitonAli60</a><a href="mailto:mamunali88991@gmail.com"><Mail size={15} />mamunali88991@gmail.com</a><a className="footer-whatsapp-icon" href="https://wa.me/8801580621597" target="_blank" rel="noreferrer" aria-label="WhatsApp"><MessageCircle size={16} /></a></div>
        </div>
        <div className="footer-bottom"><span>© 2026 TopSmmBoost. Made for your next big thing.</span><div><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link><Link to="/refund">Refund policy</Link></div><span className="footer-made">A little more human, by design. <Heart size={13} /></span></div>
      </div>
    </footer>
  );
}

function NotFound() {
  return <main className="not-found"><div className="not-found-icon"><Search size={28} /></div><div className="eyebrow"><span className="eyebrow-dot"></span> PAGE NOT FOUND</div><h1>Well, this is<br /><span className="serif-accent">a little awkward.</span></h1><p>We couldn't find the page you're looking for. It may have moved, or the link might be taking a little break.</p><Link className="button button-primary" to="/">Back to the good stuff <ArrowLeft size={16} /></Link></main>;
}

function PageLoading() {
  return <main className="page-loading" aria-live="polite"><span className="loading-spinner"></span><p>Preparing your product details…</p></main>;
}

function PolicyPage({ kind }: { kind: "Privacy" | "Terms" | "Refund" }) {
  useEffect(() => {
    document.title = `${kind} Policy — TopSmmBoost`;
    return () => { document.title = "TopSmmBoost — Digital, made simpler"; };
  }, [kind]);

  const [title, description] = {
    Privacy: ["Privacy policy", "This page is a draft placeholder. Add the final privacy notice describing what information TopSmmBoost collects, why it is used, how it is protected, and how customers can make a privacy request."],
    Terms: ["Terms & conditions", "This page is a draft placeholder. Add the final terms covering ordering, payment, product delivery, acceptable use, support, and applicable legal requirements before publishing."],
    Refund: ["Refund policy", "This page is a draft placeholder. Add clear, product-appropriate refund and cancellation terms, including how customers can contact you to resolve an order issue."],
  }[kind];

  return <main className="policy-page"><div className="container"><div className="breadcrumbs"><Link to="/">Home</Link><ChevronRight size={13} /><span>{kind}</span></div><div className="eyebrow"><span className="eyebrow-dot"></span> IMPORTANT INFORMATION</div><h1>{title}</h1><p>{description}</p><div className="policy-draft"><CircleHelp size={18} /><span>This editable draft is not legal advice. Review and replace it with a policy that reflects your actual business and applicable laws.</span></div><Link to="/" className="button button-primary"><ArrowLeft size={15} /> Back to home</Link></div></main>;
}

export default App;
