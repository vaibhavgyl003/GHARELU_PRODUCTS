import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronLeft, ChevronRight, Leaf, Heart, Globe, ArrowRight, Instagram, Facebook, Twitter, Linkedin, Users, MapPin, XCircle, ShoppingBag, Package, Plus, Minus } from 'lucide-react';
import Cart from './Cart';

// --- Color Palette Constants ---
const COLORS = {
  darkGreen: '#034225',
  goldenYellow: '#f9b000',
  cream: '#f8f5e3',
  white: '#ffffff'
};

// --- Products Data ---
const PRODUCTS = [
  {
    id: 1,
    name: "Handrolled Premium Green Tea",
    category: "Organic Tea",
    image: "/assets/Handrolled_Premium_Green_Tea.png",
    desc: "Prepared by the skilled women of the producer group residing in the Panighata Tea Garden, our green tea is a testament to true craftsmanship.",
    variants: [
      { size: "50g", price: 150, inStock: true }
    ],
    inStock: true,
    teaGarden: "Panighata Tea Estate"
  },
  {
    id: 2,
    name: "Handrolled Orthodox Rose Tea",
    category: "Organic Tea",
    image: "/assets/Handrolled_Orthodox_Rose_Tea.png",
    desc: "Hand-blended by the skilled women of the producer group residing in the Panighata Tea Garden, our Orthodox Rose Tea is a royal indulgence and a sensory masterpiece.",
    variants: [
      { size: "50g", price: 150, inStock: true }
    ],
    inStock: true,
    teaGarden: "Panighata Tea Estate"
  },
  {
    id: 3,
    name: "Dalle Chilli Paste",
    category: "Condiments",
    image: "/assets/Dalle_Chilli_Paste.png",
    desc: "Stone-ground paste made with sun-dried Dalle chillies of Peshok- perfect for adding depth to your curries or marinades.",
    variants: [
      { size: "100g", price: 100, inStock: true },
      { size: "150g", price: 160, inStock: true },
      { size: "200g", price: 220, inStock: true }
    ],
    inStock: true,
    teaGarden: "Peshok Tea Estate"
  },
  {
    id: 4,
    name: "Seasonal Fruit Jam",
    category: "Pantry Staples",
    image: "/assets/Seasonal_Fruit_Jam.png",
    desc: "Produced with painstaking care by women of Mangarjung, focusing on a clean, bright taste and a perfect set. We honor the fruit by keeping the ingredients simple and pure.",
    variants: [
      { size: "200g", price: 150, inStock: true }
    ],
    inStock: true,
    teaGarden: "Mangarjung Tea Estate"
  },
  {
    id: 5,
    name: "Raw Honey",
    category: "Pantry Staples",
    image: "/assets/Raw_Honey.png",
    desc: "Collected from the pristine forests and tea gardens of Makaibari, our Natural Honey is a pure, golden delight. Each drop captures the untouched essence of the region, offering a wholesome taste of nature's finest.",
    variants: [
      { size: "120g", price: 200, inStock: true },
      { size: "250g", price: 370, inStock: true },
      { size: "400g", price: 570, inStock: true }
    ],
    inStock: true,
    teaGarden: "Makaibari Tea Estate"
  },
  {
    id: 6,
    name: "Orchid Essence Jar Candle",
    category: "Wellness",
    image: "/assets/Orchid_Essence_Jar_Candle.png",
    desc: "Subtle and floral, this candle fills your space with the soothing scent of Himalayan Orchids.",
    variants: [
      { size: "150g", price: 170, inStock: true }
    ],
    inStock: true,
    teaGarden: "Moondakotee Tea Estate"
  },
  {
    id: 7,
    name: "Herbal Body Soap (Neem & Mugwort)",
    category: "Wellness",
    image: "/assets/Herbal_Body_Soap_(Neem_&_Mugwort).png",
    desc: "Experience the purifying power of nature with our Neem & Mugwort Herbal Body Soap. Neem's antibacterial properties combine with mugwort's soothing essence to gently cleanse and protect your skin, leaving it refreshed and balanced after every wash.",
    variants: [
      { size: "50g", price: 100, inStock: true }
    ],
    inStock: true,
    teaGarden: "Ambootia Tea Estate"
  },
  {
    id: 8,
    name: "Herbal Body Soap (Orange Peel & Honey)",
    category: "Wellness",
    image: "/assets/Herbal_Body_Soap_(Orange_Peel_&_Honey).png",
    desc: "Awaken your senses with the zesty freshness of orange peel and the nourishing touch of honey. This soap gently exfoliates while honey locks in moisture, resulting in radiant, soft skin and a naturally uplifting bathing experience.",
    variants: [
      { size: "50g", price: 100, inStock: true }
    ],
    inStock: true,
    teaGarden: "Ambootia Tea Estate"
  },
  {
    id: 9,
    name: "Herbal Body Soap (Ricewater & Rose)",
    category: "Wellness",
    image: "/assets/Herbal_Body_Soap_(Ricewater_&_Rose).png",
    desc: "Indulge in the age-old beauty secrets of ricewater and rose. This luxurious soap hydrates and brightens, while the delicate scent of rose calms your senses, leaving your skin silky-smooth and beautifully fragrant.",
    variants: [
      { size: "50g", price: 100, inStock: true }
    ],
    inStock: true,
    teaGarden: "Ambootia Tea Estate"
  },
  {
    id: 10,
    name: "Herbal Body Soap (Beetroot & Honey)",
    category: "Wellness",
    image: "/assets/Herbal_Body_Soap_(Beetroot_&_Honey).png",
    desc: "Revitalize your skin with the antioxidant-rich blend of beetroot and honey. This unique soap deeply nourishes and helps restore your skin's natural glow, making it perfect for daily rejuvenation and gentle care.",
    variants: [
      { size: "50g", price: 100, inStock: true }
    ],
    inStock: true,
    teaGarden: "Ambootia Tea Estate"
  },
  {
    id: 11,
    name: "Premium Besan Bhujia",
    category: "Snacks",
    image: "/assets/Premium_Besan_Bhujia.png",
    desc: "Elevate your snack time with this richer version of bhujia, enhanced with crunchy cornflakes, roasted chana, and premium cashews.",
    variants: [
      { size: "200g", price: 79, inStock: true }
    ],
    inStock: true,
    teaGarden: "Samrikpani Tea Estate"
  },
  {
    id: 12,
    name: "Batare - Local Crunchy Snack",
    category: "Snacks",
    image: "/assets/Batare_Local_Crunchy_Snack.png",
    desc: "A regional crunchy snack made using traditional spices - a tangy, spicy burst of flavor in every bite",
    variants: [
      { size: "6 pcs", price: 69, inStock: true }
    ],
    inStock: true,
    teaGarden: "Samrikpani Tea Estate"
  },
  {
    id: 13,
    name: "Fini",
    category: "Snacks",
    image: "/assets/Fini.png",
    desc: "A regional crunchy snack made using traditional spices - a salty, spicy burst of flavor in every bite",
    variants: [
      { size: "6 pcs", price: 55, inStock: true }
    ],
    inStock: true,
    teaGarden: "Samrikpani Tea Estate"
  },
  {
    id: 14,
    name: "Sustainable Plates and Bowls",
    category: "Crafts",
    image: "/assets/Sustainable_Plates_and_Bowls.png",
    desc: "Meticulously shaped from natural, biodegradable materials, our current range features beautifully designed bowls and quarter plates. These pieces offer a unique, rustic charm, perfect for conscious consumers seeking an eco-friendly dining experience.",
    variants: [],
    inStock: false,
    teaGarden: "Panighata Tea Estate"
  }
];

const TEA_GARDENS = [
  {
    name: "Samrikpani Tea Estate",
    desc: "Nestled in the heart of Darjeeling, Samrikpani Tea Estate is home to the beloved Ama Ko Bhujia. Crafted by local SHG Didis, these crispy delights are more than snacks—they're a celebration of heritage and homely warmth. Whether it’s a quiet chai moment or a lively gathering, Samrik brings the hills to your plate.",
    image: "https://images.unsplash.com/photo-1565551381226-724f2b904d9c?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Peshok Tea Estate",
    desc: "From the fiery foothills of Peshok comes a bold burst of flavor. Known for its GI-tagged Dalle Chillies, Peshok's condiments are handcrafted to add depth and spice to every dish. A tribute to the valley's vibrant culinary spirit.",
    image: "https://images.unsplash.com/photo-1589139268789-700438c8c5c7?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Moondakotee Tea Estate",
    desc: "High above the clouds, Moondakotee crafts serenity in a jar. Their orchid-scented candles, hand-poured by local women, capture the essence of Himalayan blooms. A gentle glow, a calming breath—Moondakotee brings nature indoors.",
    image: "https://images.unsplash.com/photo-1563911302283-d2bc129e7c1f?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Mangarjung Tea Estate",
    desc: "Enjoy our handcrafted jams, made by local women using select fruits from the hills. Each jar offers pure, natural sweetness—perfect for any season.",
    image: "https://images.unsplash.com/photo-1621255755225-ee954496417d?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Panighata Tea Estate",
    desc: "Panighata is where sustainability meets tradition. From biodegradable cutlery to hand-rolled green tea, every creation reflects a commitment to eco-conscious living and women-led craftsmanship.",
    image: "https://images.unsplash.com/photo-1546252479-566b7a2d61d1?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Makaibari Tea Estate",
    desc: "In the untouched forests of Makaibari, bees craft nature's nectar. Their pure honey, collected with care, offers a floral richness that's both wholesome and healing. A taste of the wild, preserved in every drop.",
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Ambootia Tea Estate",
    desc: "Ambootia blends tradition with wellness. From herbal soaps to black laundry bars, each product is handmade using age-old recipes and natural ingredients. It's a return to purity, powered by the hills.",
    image: "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?q=80&w=800&auto=format&fit=crop"
  }
];

const IMPACT_STATS = [
  { icon: Users, label: "Households Touched", value: "5,000+" },
  { icon: Heart, label: "Women Empowered", value: "100%" },
  { icon: Leaf, label: "Locally Sourced", value: "Native" },
];

const SOCIAL_LINKS = [
  { icon: Instagram, url: "https://www.instagram.com/gharelu.origins" },
  { icon: Facebook, url: "https://www.facebook.com/GhareluOrigins" },
  { icon: Twitter, url: "https://x.com/gharelu_origins" },
  { icon: Linkedin, url: "https://www.linkedin.com/company/gharelu-origins" }
];

// --- Components ---

const Logo = () => (
  <div className="flex flex-col items-center justify-center font-serif tracking-widest text-center cursor-pointer select-none">
    <img src="/assets/Gharelu_origin.png" alt="Gharelu Origins" className="h-10 md:h-12" />
  </div>
);

const SectionHeading = ({ children, align = "center" }) => (
  <h2 
    className={`text-3xl md:text-5xl font-serif font-bold mb-12 ${align === "left" ? "text-left" : "text-center"}`}
    style={{ color: COLORS.darkGreen }}
  >
    {children}
  </h2>
);

// --- Product Detail Modal Component ---
const ProductDetailModal = ({ product, isOpen, onClose, onAddToCart, cart, onGoToCart, updateQuantity }) => {
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // Get quantity of current product variant in cart
  const getCartQuantity = () => {
    if (!product || !selectedVariant || !cart) return 0;
    const cartItem = cart.items.find(
      item => item.productId === product.id && item.variant.size === selectedVariant.size
    );
    return cartItem ? cartItem.quantity : 0;
  };

  const cartQuantity = getCartQuantity();

  useEffect(() => {
    if (product && product.variants && product.variants.length > 0) {
      setSelectedVariant(product.variants[0]);
    }
  }, [product]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !product) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop with blur */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        style={{ opacity: isOpen ? 1 : 0 }}
      />
      
      {/* Modal Content */}
      <div 
        className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl transform transition-all duration-500"
        style={{ 
          backgroundColor: COLORS.cream,
          transform: isOpen ? 'scale(1)' : 'scale(0.9)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-20 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-white transition-all hover:scale-110"
          style={{ color: COLORS.darkGreen }}
        >
          <XCircle size={24} />
        </button>

        <div className="grid md:grid-cols-2 gap-0">
          {/* Left Side - Image */}
          <div className="relative h-[400px] md:h-[600px] overflow-hidden rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none bg-gradient-to-br from-gray-100 to-gray-200">
            <div className="absolute inset-0 group">
              <div className="relative w-full h-full">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-contain p-8 drop-shadow-2xl"
                />
              </div>
            </div>
            {/* Decorative Elements */}
            <div className="absolute top-4 left-4 px-4 py-2 rounded-full backdrop-blur-md bg-white/80 shadow-lg">
              <span className="text-xs font-bold tracking-wider uppercase" style={{ color: COLORS.darkGreen }}>
                {product.category}
              </span>
            </div>
            {/* Floating Badge */}
            <div className="absolute bottom-6 left-6 px-6 py-3 rounded-2xl backdrop-blur-md bg-white/90 shadow-xl">
              <div className="flex items-center space-x-2">
                <MapPin size={18} style={{ color: COLORS.goldenYellow }} />
                <span className="text-sm font-bold" style={{ color: COLORS.darkGreen }}>
                  {product.teaGarden}
                </span>
              </div>
            </div>
          </div>

          {/* Right Side - Product Details */}
          <div className="p-8 md:p-12 flex flex-col justify-between" style={{ backgroundColor: COLORS.white }}>
            <div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4" style={{ color: COLORS.darkGreen }}>
                {product.name}
              </h2>
              
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                {product.desc}
              </p>

              {/* Stock Status */}
              {!product.inStock ? (
                <div className="mb-8 p-4 rounded-xl bg-red-50 border-2 border-red-200">
                  <div className="flex items-center space-x-2">
                    <XCircle size={20} className="text-red-600" />
                    <span className="font-bold text-red-600">Out of Stock</span>
                  </div>
                </div>
              ) : (
                <>
                  {/* Variants Selection */}
                  {product.variants && product.variants.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-sm font-bold tracking-wider uppercase mb-4" style={{ color: COLORS.darkGreen }}>
                        Select Variant
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        {product.variants.map((variant, idx) => (
                          <button
                            key={idx}
                            onClick={() => setSelectedVariant(variant)}
                            className={`p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                              selectedVariant === variant 
                                ? 'shadow-lg' 
                                : 'hover:shadow-md'
                            }`}
                            style={{
                              borderColor: selectedVariant === variant ? COLORS.goldenYellow : '#e5e7eb',
                              backgroundColor: selectedVariant === variant ? COLORS.cream : 'white'
                            }}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <Package size={18} style={{ color: COLORS.darkGreen }} />
                              <span className="text-xs font-bold uppercase" style={{ color: COLORS.darkGreen }}>
                                {variant.size}
                              </span>
                            </div>
                            {variant.inStock ? (
                              <div className="text-2xl font-serif font-bold" style={{ color: COLORS.goldenYellow }}>
                                ₹{variant.price}
                              </div>
                            ) : (
                              <div className="text-sm font-bold text-red-600">Out of Stock</div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Price Display */}
                  {selectedVariant && selectedVariant.inStock && (
                    <div className="mb-8 p-6 rounded-2xl bg-gradient-to-br" style={{ 
                      background: `linear-gradient(135deg, ${COLORS.cream} 0%, ${COLORS.white} 100%)`,
                      border: `2px solid ${COLORS.goldenYellow}`
                    }}>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-bold tracking-wider uppercase mb-1" style={{ color: COLORS.darkGreen }}>
                            Price
                          </p>
                          <p className="text-4xl font-serif font-bold" style={{ color: COLORS.goldenYellow }}>
                            ₹{selectedVariant.price}
                          </p>
                        </div>
                        <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg" style={{ backgroundColor: COLORS.goldenYellow }}>
                          <Leaf size={32} style={{ color: COLORS.darkGreen }} />
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              {product.inStock && selectedVariant && selectedVariant.inStock ? (
                <>
                  {/* Add to Cart / Quantity Selector */}
                  {cartQuantity > 0 ? (
                    <div className="flex items-center space-x-3">
                      {/* Quantity Controls */}
                      <div className="flex-1 flex items-center justify-between px-4 py-4 rounded-xl border-2" style={{ 
                        borderColor: COLORS.darkGreen,
                        backgroundColor: COLORS.white 
                      }}>
                        <button
                          onClick={() => {
                            if (updateQuantity && selectedVariant) {
                              updateQuantity(product.id, selectedVariant.size, cartQuantity - 1);
                            }
                          }}
                          className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 hover:bg-gray-100"
                          style={{ color: COLORS.darkGreen }}
                        >
                          <Minus size={20} strokeWidth={3} />
                        </button>
                        
                        <div className="flex items-center space-x-2">
                          <ShoppingBag size={20} style={{ color: COLORS.darkGreen }} />
                          <span className="text-2xl font-bold min-w-[3rem] text-center" style={{ color: COLORS.darkGreen }}>
                            {cartQuantity}
                          </span>
                        </div>

                        <button
                          onClick={() => {
                            if (updateQuantity && selectedVariant) {
                              updateQuantity(product.id, selectedVariant.size, cartQuantity + 1);
                            }
                          }}
                          className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 hover:bg-gray-100"
                          style={{ color: COLORS.darkGreen }}
                        >
                          <Plus size={20} strokeWidth={3} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        if (onAddToCart && selectedVariant) {
                          onAddToCart(product, selectedVariant);
                          setShowSuccess(true);
                          setTimeout(() => setShowSuccess(false), 2000);
                        }
                      }}
                      className="w-full py-4 rounded-xl font-bold text-lg tracking-wide transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                      style={{ backgroundColor: COLORS.darkGreen, color: COLORS.white }}
                    >
                      <ShoppingBag size={24} />
                      <span>Add to Cart</span>
                    </button>
                  )}

                  {/* Go to Cart button - shows if items in cart */}
                  {cartQuantity > 0 && (
                    <button
                      onClick={() => {
                        onClose();
                        onGoToCart();
                      }}
                      className="w-full py-4 rounded-xl font-bold text-lg tracking-wide transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                      style={{ backgroundColor: COLORS.goldenYellow, color: COLORS.darkGreen }}
                    >
                      <ArrowRight size={24} />
                      <span>Go to Cart</span>
                    </button>
                  )}

                  {showSuccess && (
                    <div className="p-3 rounded-lg bg-green-50 border-2 border-green-200 text-center animate-fade-in">
                      <span className="text-sm font-bold text-green-700">✓ Added to cart!</span>
                    </div>
                  )}
                </>
              ) : null}
              <button
                onClick={onClose}
                className="w-full py-4 rounded-xl font-bold text-lg tracking-wide transition-all duration-300 border-2 hover:bg-gray-50"
                style={{ borderColor: COLORS.darkGreen, color: COLORS.darkGreen }}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductCarousel = ({ onProductClick }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [cardWidth, setCardWidth] = useState(450);
  const scrollContainerRef = useRef(null);
  const animationRef = useRef(null);
  const scrollPositionRef = useRef(0);

  // Duplicate products for seamless infinite scroll (3 sets for smooth looping)
  const duplicatedProducts = [...PRODUCTS, ...PRODUCTS, ...PRODUCTS];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setCardWidth(320); // Show ~3-4 cards at once on desktop (reduced from 450)
      } else if (window.innerWidth >= 640) {
        setCardWidth(300); // Show ~2-3 cards on tablet (reduced from 380)
      } else {
        setCardWidth(280); // Show ~1 card on mobile (reduced from 340)
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollSpeed = 0.7; // pixels per frame
    
    const animate = () => {
      if (!isPaused && container) {
        scrollPositionRef.current += scrollSpeed;
        
        // Reset position when we've scrolled one full set of products
        const singleSetWidth = container.scrollWidth / 3;
        if (scrollPositionRef.current >= singleSetWidth) {
          scrollPositionRef.current = 0;
        }
        
        container.style.left = `-${scrollPositionRef.current}px`;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPaused]);

  // Smooth scroll animation function
  const smoothScrollTo = (targetPosition, duration = 500) => {
    setIsPaused(true);
    const container = scrollContainerRef.current;
    if (!container) return;

    const startPosition = scrollPositionRef.current;
    const distance = targetPosition - startPosition;
    const startTime = performance.now();
    let animationFrameId;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (ease-in-out)
      const ease = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      
      scrollPositionRef.current = startPosition + distance * ease;
      container.style.left = `-${scrollPositionRef.current}px`;
      
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        // Resume auto-scroll after smooth scroll completes + 2 seconds
        setTimeout(() => setIsPaused(false), 2000);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  };

  // Manual scroll functions with smooth animation
  const scrollLeft = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    const scrollAmount = cardWidth + 40; // card width + padding
    const targetPosition = Math.max(0, scrollPositionRef.current - scrollAmount);
    smoothScrollTo(targetPosition);
  };

  const scrollRight = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    const scrollAmount = cardWidth + 40; // card width + padding
    const singleSetWidth = container.scrollWidth / 3;
    const targetPosition = Math.min(singleSetWidth - 1, scrollPositionRef.current + scrollAmount);
    smoothScrollTo(targetPosition);
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto"
         onMouseEnter={() => setIsPaused(true)}
         onMouseLeave={() => setIsPaused(false)}>
      {/* Gradient Fade Overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
           style={{ background: `linear-gradient(to right, ${COLORS.cream}, transparent)` }}></div>
      <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
           style={{ background: `linear-gradient(to left, ${COLORS.cream}, transparent)` }}></div>

      <div className="overflow-hidden py-8">
        <div 
          ref={scrollContainerRef}
          className="flex relative"
          style={{ left: '0px' }}
        >
          {duplicatedProducts.map((product, idx) => (
            <div 
              key={`${product.id}-${idx}`} 
              className="flex-shrink-0 px-5"
              style={{ 
                width: `${cardWidth}px`, 
                minWidth: `${cardWidth}px`,
                isolation: 'isolate'
              }}
            >
              <div className="transition-transform duration-500 hover:scale-105 hover:-translate-y-2 h-full">
                <div 
                  className="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-500 border border-gray-200 hover:border-opacity-50 flex flex-col" 
                  style={{ 
                    borderColor: COLORS.darkGreen,
                    isolation: 'isolate',
                    height: '480px',
                    minHeight: '480px'
                  }}
                >
                {/* Image Container */}
                <div className="relative h-56 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50 flex-shrink-0"
                     style={{
                       // Keep 2D context without hiding on hover
                       transformStyle: 'flat',
                       perspective: 'none',
                       transform: 'translateZ(0)'
                     }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent z-10"></div>
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-contain p-5 relative z-0"
                    style={{
                      transformStyle: 'flat',
                      perspective: 'none',
                      transform: 'translateZ(0)'
                    }}
                  />
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3 z-20"
                       style={{
                         transformStyle: 'flat',
                         perspective: 'none',
                         transform: 'translateZ(0)'
                       }}>
                    <div className="px-3 py-1.5 rounded-full bg-white shadow-xl border border-white/50">
                      <span className="text-xs font-bold tracking-wider uppercase" style={{ color: COLORS.darkGreen }}>
                        {product.category}
                      </span>
                    </div>
                  </div>

                  {/* Stock Badge */}
                  {!product.inStock && (
                    <div className="absolute top-3 right-3 z-20">
                      <div className="px-3 py-1.5 rounded-full bg-gradient-to-r from-red-500 to-red-600 shadow-xl border border-red-400/50">
                        <span className="text-xs font-bold text-white">Out of Stock</span>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Content Section */}
                <div className="p-5 flex flex-col bg-white relative flex-grow">
                  <h3 className="text-lg font-serif font-bold mb-2 flex-shrink-0" style={{ color: COLORS.darkGreen }}>
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-3 text-sm line-clamp-2 leading-relaxed flex-shrink-0" style={{ minHeight: '2.5rem' }}>
                    {product.desc}
                  </p>
                  
                  {/* Price Display */}
                  {product.inStock && product.variants && product.variants.length > 0 && (
                    <div className="mb-3 flex-shrink-0">
                      <div className="flex items-baseline space-x-2">
                        <p className="text-2xl font-serif font-bold" style={{ color: COLORS.goldenYellow }}>
                          ₹{product.variants[0].price}
                        </p>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5 font-medium">{product.variants[0].size}</p>
                    </div>
                  )}

                  {/* View Details Button */}
                  <button 
                    onClick={() => onProductClick(product)}
                    className="mt-auto w-full py-2.5 rounded-xl font-bold text-sm tracking-wide transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2 group/btn shadow-lg hover:shadow-xl flex-shrink-0"
                    style={{ 
                      background: `linear-gradient(135deg, ${COLORS.darkGreen} 0%, #025a2f 100%)`,
                      color: COLORS.white 
                    }}
                  >
                    <span>View Details</span>
                    <ArrowRight size={16} className="transform group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={scrollLeft}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-md p-3 rounded-full shadow-xl hover:bg-white transition-all transform hover:scale-110 z-30 border border-gray-200"
        style={{ color: COLORS.darkGreen }}
        aria-label="Scroll left"
      >
        <ChevronLeft size={24} />
      </button>
      <button 
        onClick={scrollRight}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-md p-3 rounded-full shadow-xl hover:bg-white transition-all transform hover:scale-110 z-30 border border-gray-200"
        style={{ color: COLORS.darkGreen }}
        aria-label="Scroll right"
      >
        <ChevronRight size={24} />
      </button>

      {/* Add CSS Animation for shimmer */}
      <style>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%) skewX(-12deg);
          }
          100% {
            transform: translateX(200%) skewX(-12deg);
          }
        }
      `}</style>
    </div>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home'); // 'home' or 'cart'
  const [cart, setCart] = useState(() => {
    // Load cart from localStorage on mount
    const savedCart = localStorage.getItem('gharelu_cart');
    return savedCart ? JSON.parse(savedCart) : { items: [], total: 0 };
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('gharelu_cart', JSON.stringify(cart));
  }, [cart]);

  // Calculate cart total
  const getCartTotal = (items) => {
    return items.reduce((total, item) => total + (item.variant.price * item.quantity), 0);
  };

  // Add item to cart
  const addToCart = (product, variant) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.items.findIndex(
        item => item.productId === product.id && item.variant.size === variant.size
      );

      let updatedItems;
      if (existingItemIndex >= 0) {
        // Update quantity if item already exists
        updatedItems = [...prevCart.items];
        updatedItems[existingItemIndex].quantity += 1;
      } else {
        // Add new item
        const newItem = {
          productId: product.id,
          productName: product.name,
          productImage: product.image,
          productDesc: product.desc,
          productCategory: product.category,
          teaGarden: product.teaGarden,
          variant: variant,
          quantity: 1
        };
        updatedItems = [...prevCart.items, newItem];
      }
      return { items: updatedItems, total: getCartTotal(updatedItems) };
    });
  };

  // Remove item from cart
  const removeFromCart = (productId, variantSize) => {
    setCart(prevCart => {
      const updatedItems = prevCart.items.filter(
        item => !(item.productId === productId && item.variant.size === variantSize)
      );
      return { items: updatedItems, total: getCartTotal(updatedItems) };
    });
  };

  // Update item quantity
  const updateQuantity = (productId, variantSize, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId, variantSize);
      return;
    }
    setCart(prevCart => {
      const updatedItems = prevCart.items.map(item =>
        item.productId === productId && item.variant.size === variantSize
          ? { ...item, quantity: newQuantity }
          : item
      );
      return { items: updatedItems, total: getCartTotal(updatedItems) };
    });
  };

  // Clear cart
  const clearCart = () => {
    setCart({ items: [], total: 0 });
  };

  // Get cart item count
  const getCartItemCount = () => {
    return cart.items.reduce((count, item) => count + item.quantity, 0);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProduct(null), 300);
  };

  // Render Cart page if currentPage is 'cart'
  if (currentPage === 'cart') {
    return (
      <>
        {/* Navigation for Cart Page */}
        <nav 
          className={`fixed w-full z-50 transition-all duration-300 py-2 shadow-md`}
          style={{ backgroundColor: COLORS.cream }}
        >
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
            <div onClick={() => { setCurrentPage('home'); window.scrollTo(0, 0); }} className="cursor-pointer">
              <Logo />
            </div>
            <button
              onClick={() => setCurrentPage('home')}
              className="relative hover:opacity-70 transition-opacity"
              aria-label="Shopping Cart"
            >
              <ShoppingBag size={24} />
              {getCartItemCount() > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white"
                      style={{ backgroundColor: COLORS.goldenYellow }}>
                  {getCartItemCount()}
                </span>
              )}
            </button>
          </div>
        </nav>
        <Cart
          cart={cart}
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
          clearCart={clearCart}
          onBackToHome={() => setCurrentPage('home')}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen font-sans relative overflow-hidden" style={{ 
      background: 'linear-gradient(to bottom, #e8f5e9 0%, #f1f8f4 50%, #e8f5e9 100%)',
      color: COLORS.darkGreen 
    }}>
      
      {/* Floating Background Balls */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Green balls */}
        <div className="absolute top-[10%] left-[5%] w-16 h-16 rounded-full opacity-20 animate-float-slow" 
             style={{ background: `radial-gradient(circle at 30% 30%, ${COLORS.darkGreen}40, ${COLORS.darkGreen}20)` }}></div>
        <div className="absolute top-[60%] left-[15%] w-24 h-24 rounded-full opacity-15 animate-float-medium" 
             style={{ background: `radial-gradient(circle at 30% 30%, ${COLORS.darkGreen}30, ${COLORS.darkGreen}10)` }}></div>
        <div className="absolute top-[80%] left-[8%] w-12 h-12 rounded-full opacity-25 animate-float-fast" 
             style={{ background: `radial-gradient(circle at 30% 30%, ${COLORS.darkGreen}50, ${COLORS.darkGreen}20)` }}></div>
        
        {/* Golden balls */}
        <div className="absolute top-[25%] right-[10%] w-20 h-20 rounded-full opacity-15 animate-float-slow-reverse" 
             style={{ background: `radial-gradient(circle at 30% 30%, ${COLORS.goldenYellow}40, ${COLORS.goldenYellow}15)` }}></div>
        <div className="absolute top-[70%] right-[20%] w-14 h-14 rounded-full opacity-20 animate-float-medium" 
             style={{ background: `radial-gradient(circle at 30% 30%, ${COLORS.goldenYellow}35, ${COLORS.goldenYellow}18)` }}></div>
        <div className="absolute top-[45%] right-[5%] w-28 h-28 rounded-full opacity-12 animate-float-fast" 
             style={{ background: `radial-gradient(circle at 30% 30%, ${COLORS.goldenYellow}25, ${COLORS.goldenYellow}08)` }}></div>
        
        {/* Center floating balls */}
        <div className="absolute top-[35%] left-[45%] w-18 h-18 rounded-full opacity-18 animate-float-slow" 
             style={{ background: `radial-gradient(circle at 30% 30%, ${COLORS.darkGreen}35, ${COLORS.darkGreen}12)` }}></div>
        <div className="absolute top-[15%] left-[70%] w-22 h-22 rounded-full opacity-16 animate-float-medium" 
             style={{ background: `radial-gradient(circle at 30% 30%, ${COLORS.goldenYellow}30, ${COLORS.goldenYellow}12)` }}></div>
        <div className="absolute bottom-[20%] left-[60%] w-16 h-16 rounded-full opacity-14 animate-float-slow-reverse" 
             style={{ background: `radial-gradient(circle at 30% 30%, ${COLORS.darkGreen}28, ${COLORS.darkGreen}10)` }}></div>
      </div>
      
      {/* --- Navigation --- */}
      <nav 
        className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'py-2' : 'py-3'}`}
        style={{ 
          background: scrolled 
            ? 'linear-gradient(135deg, rgba(245, 255, 248, 0.92), rgba(232, 248, 238, 0.92))' 
            : 'linear-gradient(135deg, rgba(245, 255, 248, 0.85), rgba(232, 248, 238, 0.85))',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: `2px solid ${COLORS.darkGreen}15`,
          boxShadow: scrolled 
            ? `0 8px 32px rgba(3, 66, 37, 0.12), 0 0 80px ${COLORS.goldenYellow}20, inset 0 1px 0 rgba(255, 255, 255, 0.5)` 
            : `0 4px 20px rgba(3, 66, 37, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.3)`
        }}
      >
        {/* Decorative shine effect */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full animate-[shine_8s_ease-in-out_infinite]"
               style={{ animation: 'shine 8s ease-in-out infinite' }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center relative z-10">
          <div onClick={() => window.scrollTo(0,0)} className="transform hover:scale-105 transition-transform duration-300">
             <Logo />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-12 font-semibold tracking-wide text-base">
            {['Collection', 'Our Tea Gardens', 'Our Story', 'Impact'].map((item) => (
              <button 
                key={item} 
                onClick={() => {
                  setCurrentPage('home');
                  scrollToSection(item.toLowerCase().replace(/\s+/g, '-'));
                }}
                className="transition-all duration-300 relative group transform hover:-translate-y-0.5"
                style={{ 
                  color: COLORS.darkGreen,
                  textShadow: '0 1px 2px rgba(3, 66, 37, 0.1)'
                }}
              >
                <span className="relative z-10 group-hover:text-opacity-90">{item}</span>
                {/* Golden underline with glow */}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full rounded-full" 
                      style={{ 
                        background: `linear-gradient(90deg, ${COLORS.goldenYellow}, ${COLORS.goldenYellow}dd)`,
                        boxShadow: `0 0 10px ${COLORS.goldenYellow}, 0 2px 8px ${COLORS.goldenYellow}40` 
                      }}></span>
                {/* Subtle background on hover */}
                <span className="absolute inset-0 -m-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ 
                        background: `radial-gradient(circle at center, ${COLORS.goldenYellow}10, transparent)`,
                      }}></span>
              </button>
            ))}
            {/* Cart Icon */}
            <button
              onClick={() => setCurrentPage('cart')}
              className="relative transition-all duration-300 transform hover:scale-110 hover:-translate-y-0.5 hover:rotate-3"
              aria-label="Shopping Cart"
              style={{ color: COLORS.darkGreen }}
            >
              <ShoppingBag size={24} />
              {getCartItemCount() > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white animate-pulse"
                      style={{ 
                        backgroundColor: COLORS.goldenYellow,
                        boxShadow: `0 0 12px ${COLORS.goldenYellow}`
                      }}>
                  {getCartItemCount()}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Toggle and Cart */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={() => setCurrentPage('cart')}
              className="relative transform hover:scale-110 transition-transform duration-300"
              aria-label="Shopping Cart"
            >
              <ShoppingBag size={24} />
              {getCartItemCount() > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white animate-pulse"
                      style={{ 
                        backgroundColor: COLORS.goldenYellow,
                        boxShadow: `0 0 12px ${COLORS.goldenYellow}`
                      }}>
                  {getCartItemCount()}
                </span>
              )}
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="transform hover:scale-110 transition-transform duration-300">
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full shadow-xl py-8 px-6 flex flex-col space-y-6"
               style={{
                 background: 'rgba(255, 255, 255, 0.95)',
                 backdropFilter: 'blur(12px)',
                 WebkitBackdropFilter: 'blur(12px)',
                 borderBottom: '1px solid rgba(3, 66, 37, 0.1)'
               }}>
            {['Collection', 'Our Tea Gardens', 'Our Story', 'Impact'].map((item) => (
              <button 
                key={item}
                onClick={() => {
                  setCurrentPage('home');
                  setIsMenuOpen(false);
                  scrollToSection(item.toLowerCase().replace(/\s+/g, '-'));
                }}
                className="text-xl font-serif text-left"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* --- Hero Section --- */}
      <header className="relative pt-24 pb-16 md:pt-32 md:pb-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="z-10 order-2 md:order-1">
            <span className="inline-block px-4 py-2 rounded-full text-sm font-bold tracking-widest uppercase mb-6" style={{ backgroundColor: COLORS.goldenYellow, color: COLORS.darkGreen }}>
              Ethically Sourced
            </span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight mb-8">
              Purity from the <br /> 
              <span className="italic" style={{ color: COLORS.goldenYellow }}>Himalayas</span>
            </h1>
            <p className="text-lg md:text-xl mb-10 max-w-lg leading-relaxed opacity-90">
              Discover authentic products rooted in the traditions of Darjeeling. 
              Grown with care, harvested with purpose, and brought directly to your home.
            </p>
            <button 
              onClick={() => scrollToSection('collection')}
              className="inline-flex items-center px-8 py-4 rounded-full text-white font-bold tracking-wide transition-transform hover:scale-105 shadow-lg"
              style={{ backgroundColor: COLORS.darkGreen }}
            >
              Explore Collection <ArrowRight className="ml-2" size={20} />
            </button>
          </div>
          
          <div className="relative order-1 md:order-2">
            {/* Abstract decorative shapes */}
            <div className="absolute top-0 right-0 w-full h-full rounded-full opacity-20 filter blur-3xl transform translate-x-1/4 -translate-y-1/4" style={{ backgroundColor: COLORS.goldenYellow }}></div>
            <img 
              src="https://images.unsplash.com/photo-1597481499750-3e6b22637e12?q=80&w=1000&auto=format&fit=crop" 
              alt="Tea Garden in Darjeeling" 
              className="relative w-full h-[500px] object-cover rounded-[2rem] shadow-2xl z-10"
            />
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 z-20 bg-white p-6 rounded-2xl shadow-xl max-w-xs hidden md:block">
              <p className="font-serif italic text-lg mb-2">"The soul of the mountains in every sip."</p>
              <div className="flex text-yellow-500">★★★★★</div>
            </div>
          </div>
        </div>
      </header>

      {/* --- Products Section --- */}
      <section id="collection" className="py-20 md:py-32">
        <SectionHeading>Collection</SectionHeading>
        <ProductCarousel onProductClick={handleProductClick} />
      </section>

      {/* Product Detail Modal */}
      <ProductDetailModal 
        product={selectedProduct} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
        onAddToCart={addToCart}
        cart={cart}
        onGoToCart={() => setCurrentPage('cart')}
        updateQuantity={updateQuantity}
      />

      {/* --- Our Tea Gardens Section --- */}
      <section id="our-tea-gardens" className="py-20 md:py-32 bg-gradient-to-b from-green-50 via-emerald-50 to-green-50">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading>Our Tea Gardens</SectionHeading>
          <p className="text-center max-w-3xl mx-auto mb-16 text-lg text-gray-700">
             Discover the soul of Darjeeling through the unique offerings of seven remarkable tea estates. 
             Each garden tells a story—of tradition, craftsmanship, and the women who bring these creations to life.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 items-start">
            {TEA_GARDENS.map((garden, idx) => (
              <div 
                key={idx} 
                className="relative group" 
                style={{
                  height: '340px',
                  width: '100%',
                  perspective: '1500px',
                  transformStyle: 'preserve-3d'
                }}
              >
                <div 
                  className="absolute inset-0 w-full h-full transition-transform duration-700 ease-out"
                  style={{ 
                    transformStyle: 'preserve-3d',
                    transformOrigin: 'center center',
                    willChange: 'transform',
                    transform: 'rotateY(0deg)'
                  }}
                >
                  {/* Front Face */}
                  <div className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-700 flex flex-col p-8 bg-gradient-to-br from-white via-gray-50 to-white border border-gray-200 group-hover:border-yellow-200"
                       style={{ 
                         backfaceVisibility: 'hidden',
                         WebkitBackfaceVisibility: 'hidden',
                         transform: 'rotateY(0deg) translateZ(2px)',
                         position: 'absolute'
                       }}>
                    {/* Animated gradient overlay */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 bg-gradient-to-br from-yellow-50/50 via-green-50/30 to-transparent"></div>
                    
                    {/* Enhanced Floating particles effect */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <div className="absolute top-[20%] left-[15%] w-3 h-3 rounded-full opacity-30 animate-float-slow" style={{ backgroundColor: COLORS.goldenYellow }}></div>
                      <div className="absolute top-[60%] right-[25%] w-2 h-2 rounded-full opacity-40 animate-float-medium" style={{ backgroundColor: COLORS.darkGreen }}></div>
                      <div className="absolute bottom-[30%] left-[70%] w-2.5 h-2.5 rounded-full opacity-25 animate-float-fast" style={{ backgroundColor: COLORS.goldenYellow }}></div>
                      <div className="absolute top-[40%] right-[60%] w-1.5 h-1.5 rounded-full opacity-35 animate-float-slow-reverse" style={{ backgroundColor: COLORS.darkGreen }}></div>
                      <div className="absolute top-[80%] left-[40%] w-2 h-2 rounded-full opacity-30 animate-float-medium" style={{ backgroundColor: COLORS.goldenYellow }}></div>
                      <div className="absolute top-[10%] right-[80%] w-1.5 h-1.5 rounded-full opacity-35 animate-float-fast" style={{ backgroundColor: COLORS.darkGreen }}></div>
                    </div>
                    
                    {/* Multiple Glowing border effects */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" 
                         style={{ 
                           boxShadow: `inset 0 0 50px ${COLORS.goldenYellow}20, 0 0 80px ${COLORS.goldenYellow}12, 0 10px 40px rgba(0,0,0,0.1)`
                         }}>
                    </div>
                    
                    {/* Enhanced Shine effect on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 overflow-hidden rounded-2xl">
                      <div className="absolute top-0 left-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/60 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-2000 skew-x-12"></div>
                    </div>
                    
                    {/* Pulsing background effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                      <div className="absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2 bg-gradient-radial from-yellow-100/20 via-transparent to-transparent animate-pulse-slow"></div>
                    </div>
                    
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex items-start mb-4">
                        <div className="p-2.5 rounded-xl mr-3 transform transition-all duration-700 group-hover:rotate-[360deg] group-hover:scale-125 shadow-md group-hover:shadow-xl" 
                             style={{ 
                               backgroundColor: `${COLORS.goldenYellow}25`,
                               border: `2px solid ${COLORS.goldenYellow}40`
                             }}>
                          <MapPin className="flex-shrink-0 transition-all duration-700 group-hover:drop-shadow-lg" size={20} style={{ color: COLORS.goldenYellow }} />
                        </div>
                        <h3 className="text-xl font-serif font-bold transition-all duration-500 group-hover:translate-x-1 group-hover:text-shadow-lg" style={{ color: COLORS.darkGreen }}>
                          {garden.name}
                        </h3>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-6 flex-grow transition-all duration-500 group-hover:text-gray-800 group-hover:translate-y-[-2px]">
                        {garden.desc}
                      </p>
                    </div>

                    {/* Enhanced 3D depth layers */}
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/80 via-white/40 to-transparent pointer-events-none opacity-60 group-hover:opacity-80 transition-opacity duration-700"></div>
                    
                    {/* Corner accents - multiple */}
                    <div className="absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-10 group-hover:opacity-25 transition-all duration-700 group-hover:scale-110" 
                         style={{ backgroundColor: COLORS.goldenYellow }}></div>
                    <div className="absolute bottom-0 left-0 w-20 h-20 rounded-tr-full opacity-8 group-hover:opacity-20 transition-all duration-700 group-hover:scale-110" 
                         style={{ backgroundColor: COLORS.darkGreen }}></div>

                    {/* 3D border depth effect */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-yellow-300/30 transition-all duration-700"></div>
                  </div>
 
                  {/* Back Face */}
                  <div className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden shadow-lg flex flex-col p-8 bg-gradient-to-br from-emerald-50 via-white to-amber-50 border-2 border-green-200"
                       style={{ 
                         backfaceVisibility: 'hidden',
                         WebkitBackfaceVisibility: 'hidden',
                         transform: 'rotateY(180deg) translateZ(2px)',
                         position: 'absolute'
                       }}>
                    {/* Enhanced Animated background pattern */}
                    <div className="absolute inset-0 opacity-[0.12]">
                      <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 25% 40%, ${COLORS.goldenYellow} 2px, transparent 2px),
                                         radial-gradient(circle at 75% 70%, ${COLORS.darkGreen} 1.5px, transparent 1.5px),
                                         radial-gradient(circle at 50% 20%, ${COLORS.goldenYellow} 1px, transparent 1px),
                                         radial-gradient(circle at 10% 80%, ${COLORS.darkGreen} 1px, transparent 1px)`,
                        backgroundSize: '60px 60px, 80px 80px, 100px 100px, 70px 70px',
                        animation: 'moveBackground 30s linear infinite'
                      }}></div>
                    </div>

                    {/* Multiple glowing accents with animation */}
                    <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-25 animate-pulse-slow" 
                         style={{ backgroundColor: COLORS.goldenYellow }}></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full blur-3xl opacity-20 animate-pulse-slower" 
                         style={{ backgroundColor: COLORS.darkGreen }}></div>
                    <div className="absolute top-1/2 left-1/2 w-36 h-36 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-10 animate-pulse-slow" 
                         style={{ backgroundColor: COLORS.goldenYellow }}></div>
                    
                    {/* Content */}
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex items-start mb-4">
                        <div className="p-2.5 rounded-xl mr-3 shadow-lg transition-all duration-500 hover:scale-110" 
                             style={{ 
                               backgroundColor: `${COLORS.darkGreen}25`,
                               border: `2px solid ${COLORS.darkGreen}40`
                             }}>
                          <MapPin className="flex-shrink-0" size={20} style={{ color: COLORS.darkGreen }} />
                        </div>
                        <h3 className="text-xl font-serif font-bold" style={{ color: COLORS.darkGreen }}>{garden.name}</h3>
                      </div>
                      <div className="overflow-y-auto flex-grow pr-2 scrollbar-thin">
                        <p className="text-gray-800 text-sm leading-relaxed font-medium">{garden.desc}</p>
                      </div>
                    </div>

                    {/* Enhanced decorative elements */}
                    <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-60"></div>
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-40"></div>
                    
                    {/* Corner decorations */}
                    <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 rounded-tl-lg" style={{ borderColor: COLORS.darkGreen }}></div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 rounded-br-lg" style={{ borderColor: COLORS.goldenYellow }}></div>
                  </div>
                </div>
                
                {/* Enhanced Yellow Line - Grows on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-2 rounded-b-2xl overflow-hidden z-30 pointer-events-none">
                  <div 
                    className="h-full w-0 group-hover:w-full transition-all duration-700 ease-out origin-left" 
                    style={{ 
                      backgroundColor: COLORS.goldenYellow,
                      boxShadow: `0 0 30px ${COLORS.goldenYellow}70, 0 5px 20px ${COLORS.goldenYellow}50`
                    }}
                  ></div>
                </div>

                {/* CSS-only rotation trigger */}
                <style>{`
                  .group:hover > div:first-child {
                    transform: rotateY(180deg) !important;
                  }
                `}</style>
              </div>
            ))}
          </div>

          {/* Enhanced CSS animations */}
          <style>{`
            @keyframes float-slow {
              0%, 100% { transform: translate(0, 0); opacity: 0.3; }
              50% { transform: translate(12px, -25px); opacity: 0.6; }
            }
            @keyframes float-medium {
              0%, 100% { transform: translate(0, 0); opacity: 0.4; }
              50% { transform: translate(-18px, -20px); opacity: 0.7; }
            }
            @keyframes float-fast {
              0%, 100% { transform: translate(0, 0); opacity: 0.25; }
              50% { transform: translate(8px, -30px); opacity: 0.5; }
            }
            @keyframes float-slow-reverse {
              0%, 100% { transform: translate(0, 0); opacity: 0.35; }
              50% { transform: translate(-10px, 22px); opacity: 0.65; }
            }
            @keyframes moveBackground {
              0% { transform: translate(0, 0); }
              100% { transform: translate(60px, 60px); }
            }
            @keyframes pulse-slow {
              0%, 100% { opacity: 0.15; }
              50% { opacity: 0.25; }
            }
            @keyframes pulse-slower {
              0%, 100% { opacity: 0.1; }
              50% { opacity: 0.2; }
            }
            @keyframes shine {
              0% { transform: translateX(-100%) skewX(-15deg); }
              50%, 100% { transform: translateX(200%) skewX(-15deg); }
            }
            .animate-float-slow {
              animation: float-slow 9s ease-in-out infinite;
            }
            .animate-float-medium {
              animation: float-medium 7s ease-in-out infinite 0.5s;
            }
            .animate-float-fast {
              animation: float-fast 5s ease-in-out infinite 1s;
            }
            .animate-float-slow-reverse {
              animation: float-slow-reverse 8s ease-in-out infinite 1.5s;
            }
            .animate-pulse-slow {
              animation: pulse-slow 6s ease-in-out infinite;
            }
            .animate-pulse-slower {
              animation: pulse-slower 8s ease-in-out infinite 1s;
            }
            .scrollbar-thin::-webkit-scrollbar {
              width: 4px;
            }
            .scrollbar-thin::-webkit-scrollbar-track {
              background: transparent;
            }
            .scrollbar-thin::-webkit-scrollbar-thumb {
              background: #034225;
              border-radius: 4px;
            }
          `}</style>
        </div>
      </section>

      {/* --- Our Story Section --- */}
      <section id="our-story" className="py-20 md:py-32 relative overflow-hidden" style={{ backgroundColor: COLORS.cream }}>
         {/* Decorative leaf background */}
        <Leaf className="absolute top-10 right-10 w-64 h-64 text-green-800 opacity-5 rotate-45" />

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute inset-0 transform translate-x-4 translate-y-4 rounded-2xl" style={{ border: `2px solid ${COLORS.goldenYellow}` }}></div>
              <img 
                src="https://images.unsplash.com/photo-1544253303-376046e8c750?q=80&w=1000&auto=format&fit=crop" 
                alt="Woman harvesting tea" 
                className="relative rounded-2xl shadow-lg w-full h-[600px] object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            
            <div>
              <h3 className="text-sm font-bold tracking-widest uppercase mb-4" style={{ color: COLORS.goldenYellow }}>Our Origins</h3>
              <SectionHeading align="left">Rooted in Darjeeling</SectionHeading>
              
              <div className="space-y-6 text-lg leading-relaxed text-gray-700">
                <p>
                  In the last decade, tea estates in and around Darjeeling were shut down due to absentee ownership, mismanagement, and unrest—leaving generations of tea workers, especially women, without income or support. The closures triggered distress migration and eroded local livelihoods. Climate change and ageing bushes deepened the crisis.
                </p>
                <p>
                  With limited options and no alternative skills, communities faced deep uncertainty. Supported by the Gates Foundation and in partnership with the Darjeeling Welfare Society, the Gorkhaland Territorial Administration, the West Bengal State Rural Livelihoods Mission, and Grant Thornton Bharat, a mission was launched to restore livelihoods.
                </p>
                <p>
                  <strong style={{ color: COLORS.darkGreen }}>Gharelu Origins</strong> is the result of these efforts—a brand born of heritage, heart, and the unwavering spirit of Darjeeling’s people. From their homes, women now craft the finest products, reviving income, dignity, and hope.
                </p>
              </div>

              <div className="mt-10 pt-10 border-t border-gray-300 grid grid-cols-2 gap-8">
                <div>
                  <h4 className="text-4xl font-serif font-bold mb-2" style={{ color: COLORS.goldenYellow }}>5,000+</h4>
                  <p className="text-sm uppercase tracking-wider">Households Touched</p>
                </div>
                <div>
                  <h4 className="text-4xl font-serif font-bold mb-2" style={{ color: COLORS.goldenYellow }}>100%</h4>
                  <p className="text-sm uppercase tracking-wider">Community Led</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Our Impact Section --- */}
      <section id="impact" className="py-20 md:py-32 relative bg-gradient-to-b from-green-50 via-white to-green-50">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <SectionHeading>Our Impact</SectionHeading>
          <p className="text-center max-w-3xl mx-auto mb-16 text-lg">
             Over 5,000 households touched through training and support to create unique, value-added products using local resources. We are reviving income, dignity, and hope for the communities of Darjeeling.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {IMPACT_STATS.map((stat, idx) => (
              <div 
                key={idx} 
                className="bg-gray-50 p-10 rounded-3xl shadow-sm hover:shadow-xl transition-shadow text-center group border border-transparent hover:border-green-100"
              >
                <div 
                  className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: COLORS.cream }}
                >
                  <stat.icon size={36} style={{ color: COLORS.darkGreen }} />
                </div>
                <h3 className="text-5xl font-serif font-bold mb-4" style={{ color: COLORS.goldenYellow }}>
                  {stat.value}
                </h3>
                <h4 className="text-xl font-bold mb-2" style={{ color: COLORS.darkGreen }}>{stat.label}</h4>
                <p className="text-sm text-gray-500">Restoring livelihoods and creating sustainable futures.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="text-white py-8 px-6" style={{ backgroundColor: COLORS.darkGreen }}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 border-b border-green-800 pb-8">
          {/* Column 1: Info & Social */}
          <div className="md:col-span-1">
             <div className="flex items-center space-x-2 mb-6">
                <Leaf className="text-white" size={24} />
                <span className="font-serif font-bold text-xl tracking-wider">GHARELU ORIGINS</span>
             </div>
             <p className="text-green-200 text-sm leading-relaxed mb-6">
               Rooted in Darjeeling, Grown with Purpose. Bringing the Himalayas to your doorstep.
             </p>
             <div className="flex space-x-4">
               {SOCIAL_LINKS.map((social, i) => (
                 <a 
                    key={i} 
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-green-800 flex items-center justify-center hover:bg-white hover:text-green-900 transition-colors"
                 >
                   <social.icon size={18} />
                 </a>
               ))}
             </div>
          </div>

          {/* Column 2: Company */}
          <div>
            <h4 className="font-bold mb-6 text-green-300 uppercase tracking-widest text-sm">Company</h4>
            <ul className="space-y-4 text-green-100 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Column 3: Newsletter */}
          <div>
            <h4 className="font-bold mb-6 text-green-300 uppercase tracking-widest text-sm">Newsletter</h4>
            <p className="text-green-200 text-sm mb-4">Join our community for harvest updates.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="w-full px-4 py-3 rounded-l-lg bg-green-800 border-none text-white placeholder-green-400 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              />
              <button 
                className="px-6 py-3 rounded-r-lg font-bold transition-colors hover:bg-yellow-400"
                style={{ backgroundColor: COLORS.goldenYellow, color: COLORS.darkGreen }}
              >
                Join
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-4 text-center text-green-400 text-xs">
          &copy; {new Date().getFullYear()} Gharelu Origins. All rights reserved.
        </div>
      </footer>
    </div>
  );
}