"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { 
  ShoppingCart, Star, Plus, Minus, ArrowLeft, Search, Filter, 
  Heart, Eye, Package, Truck, Shield, Award 
} from "lucide-react"
import Link from "next/link"
import { CliniQLogo } from "@/components/clini-q-logo"
import { ProfileDropdown } from "@/components/profile"
import { useToast } from "@/hooks/use-toast"
import { useCart, Product, CartItem } from "@/contexts/cart-context"
import { formatSimpleINR } from "@/lib/currency"

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Hydrating Vitamin C Serum",
    description: "Brightening serum with 20% Vitamin C for radiant, youthful skin",
    price: 379900,
    originalPrice: 499900,
    image: "/images/products/p1.png",
    category: "serums",
    rating: 4.8,
    reviews: 1247,
    inStock: true,
    features: ["20% Vitamin C", "Hyaluronic Acid", "Anti-aging", "Brightening"],
    skinType: ["all", "dry", "normal"]
  },
  {
    id: "2", 
    name: "Gentle Foam Cleanser",
    description: "pH-balanced cleanser that removes impurities without stripping skin",
    price: 209900,
    image: "/images/products/p2.png",
    category: "cleansers",
    rating: 4.6,
    reviews: 892,
    inStock: true,
    features: ["pH Balanced", "Gentle Formula", "Deep Cleansing", "Sulfate-free"],
    skinType: ["sensitive", "dry", "normal"]
  },
  {
    id: "3",
    name: "Broad Spectrum SPF 50+ Sunscreen",
    description: "Lightweight, non-greasy sunscreen with zinc oxide protection",
    price: 274900,
    image: "/images/products/p3.png", 
    category: "sunscreen",
    rating: 4.9,
    reviews: 2156,
    inStock: true,
    features: ["SPF 50+", "Zinc Oxide", "Water Resistant", "Non-comedogenic"],
    skinType: ["all", "sensitive", "oily"]
  },
  {
    id: "4",
    name: "Niacinamide 10% + Zinc Serum",
    description: "Pore-minimizing serum that controls oil and reduces blemishes",
    price: 159900,
    image: "/images/products/p4.png",
    category: "serums", 
    rating: 4.7,
    reviews: 1683,
    inStock: true,
    features: ["10% Niacinamide", "Zinc", "Pore Minimizing", "Oil Control"],
    skinType: ["oily", "combination", "acne-prone"]
  },
  {
    id: "5",
    name: "Retinol Night Cream",
    description: "Anti-aging night cream with encapsulated retinol for smoother skin",
    price: 569900,
    originalPrice: 669900,
    image: "/images/products/p5.png",
    category: "moisturizers",
    rating: 4.5,
    reviews: 743,
    inStock: false,
    features: ["Encapsulated Retinol", "Anti-aging", "Night Formula", "Peptides"],
    skinType: ["mature", "normal", "dry"]
  },
  {
    id: "6",
    name: "Hyaluronic Acid Moisturizer",
    description: "Lightweight moisturizer that provides 24-hour hydration",
    price: 249900,
    image: "/images/products/p6.png",
    category: "moisturizers",
    rating: 4.4,
    reviews: 956,
    inStock: true,
    features: ["Hyaluronic Acid", "24hr Hydration", "Lightweight", "Non-greasy"],
    skinType: ["all", "dry", "dehydrated"]
  }
]

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedSkinType, setSelectedSkinType] = useState("all")
  const [sortBy, setSortBy] = useState("featured")
  const [showCart, setShowCart] = useState(false)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()
  const { cart, addToCart, removeFromCart, updateCartQuantity, getTotalPrice, getTotalItems } = useCart()

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (selectedCategory !== "all") params.append("category", selectedCategory)
      if (selectedSkinType !== "all") params.append("skinType", selectedSkinType)
      if (searchTerm) params.append("search", searchTerm)
      if (sortBy !== "featured") params.append("sortBy", sortBy)

      const response = await fetch(`/api/products?${params.toString()}`)
      if (response.ok) {
        const data = await response.json()
        setProducts(data.products)
        setFilteredProducts(data.products)
      } else {
        // Fallback to sample data if API fails
        setProducts(SAMPLE_PRODUCTS)
        setFilteredProducts(SAMPLE_PRODUCTS)
      }
    } catch (error) {
      console.error("Error fetching products:", error)
      // Fallback to sample data
      setProducts(SAMPLE_PRODUCTS)
      setFilteredProducts(SAMPLE_PRODUCTS)
    } finally {
      setLoading(false)
    }
  }

  // Initial load
  useEffect(() => {
    fetchProducts()
  }, [])

  // Refetch when filters change
  useEffect(() => {
    if (products.length > 0) {
      fetchProducts()
    }
  }, [selectedCategory, selectedSkinType, searchTerm, sortBy])

  // Filter and sort products (keeping for client-side filtering as backup)
  useEffect(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
      const matchesSkinType = selectedSkinType === "all" || product.skinType.includes(selectedSkinType)
      
      return matchesSearch && matchesCategory && matchesSkinType
    })

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        // Keep original order for "featured"
        break
    }

    setFilteredProducts(filtered)
  }, [products, searchTerm, selectedCategory, selectedSkinType, sortBy])

  const handleAddToCart = (product: Product, quantity: number = 1) => {
    addToCart(product, quantity)
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart`,
    })
  }

  const handleRemoveFromCart = (productId: string) => {
    removeFromCart(productId)
    toast({
      title: "Removed from Cart",
      description: "Item has been removed from your cart",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-pink-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/full-dashboard"
                className="flex items-center gap-2 text-pink-600 hover:text-pink-700 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Dashboard
              </Link>
              <div className="flex items-center gap-2">
                <CliniQLogo size="sm" />
                <h1 className="text-xl font-bold text-gray-800">Skincare Products</h1>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => setShowCart(true)}
                className="relative border-pink-200 text-pink-600 hover:bg-pink-50"
              >
                <ShoppingCart className="w-5 h-5" />
                {getTotalItems() > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs px-1 min-w-[20px] h-5">
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>
              <ProfileDropdown />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-pink-200 focus:ring-pink-500"
              />
            </div>
            
            <div className="flex gap-2 flex-wrap">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40 border-pink-200">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="cleansers">Cleansers</SelectItem>
                  <SelectItem value="serums">Serums</SelectItem>
                  <SelectItem value="moisturizers">Moisturizers</SelectItem>
                  <SelectItem value="sunscreen">Sunscreen</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedSkinType} onValueChange={setSelectedSkinType}>
                <SelectTrigger className="w-40 border-pink-200">
                  <SelectValue placeholder="Skin Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Skin Types</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="dry">Dry</SelectItem>
                  <SelectItem value="oily">Oily</SelectItem>
                  <SelectItem value="combination">Combination</SelectItem>
                  <SelectItem value="sensitive">Sensitive</SelectItem>
                  <SelectItem value="acne-prone">Acne-prone</SelectItem>
                  <SelectItem value="mature">Mature</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40 border-pink-200">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="border-pink-100 animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                <CardHeader className="pb-2">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="h-3 bg-gray-200 rounded mb-3"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 mb-3"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-6 bg-gray-200 rounded w-16"></div>
                    <div className="h-8 bg-gray-200 rounded w-24"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
            <Card key={product.id} className="border-pink-100 hover:shadow-lg transition-all duration-300 group">
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.originalPrice && (
                  <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                    Sale
                  </Badge>
                )}
                {!product.inStock && (
                  <Badge className="absolute top-2 right-2 bg-gray-500 text-white">
                    Out of Stock
                  </Badge>
                )}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setSelectedProduct(product)}
                    className="bg-white/90 text-gray-800 hover:bg-white"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Quick View
                  </Button>
                </div>
              </div>

              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg font-semibold text-gray-800 line-clamp-2">
                    {product.name}
                  </CardTitle>
                  <Button variant="ghost" size="sm" className="text-pink-600 hover:text-pink-700 p-1">
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">({product.reviews})</span>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <CardDescription className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {product.description}
                </CardDescription>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {product.features.slice(0, 2).map((feature) => (
                    <Badge key={feature} variant="secondary" className="text-xs bg-pink-100 text-pink-700">
                      {feature}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-gray-800">
                      {formatSimpleINR(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        {formatSimpleINR(product.originalPrice)}
                      </span>
                    )}
                  </div>
                  
                  <Button
                    onClick={() => handleAddToCart(product)}
                    disabled={!product.inStock}
                    className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
            ))}
          </div>
        )}

        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedProduct && (
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-96 object-cover rounded-lg"
                />
              </div>
              
              <div className="space-y-4">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-gray-800">
                    {selectedProduct.name}
                  </DialogTitle>
                </DialogHeader>
                
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(selectedProduct.rating)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600">({selectedProduct.reviews} reviews)</span>
                </div>

                <p className="text-gray-700">{selectedProduct.description}</p>

                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-800">Key Features:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.features.map((feature) => (
                      <Badge key={feature} variant="secondary" className="bg-pink-100 text-pink-700">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-800">Suitable for:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.skinType.map((type) => (
                      <Badge key={type} variant="outline" className="border-pink-200 text-pink-700">
                        {type.charAt(0).toUpperCase() + type.slice(1)} skin
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-gray-800">
                      {formatSimpleINR(selectedProduct.price)}
                    </span>
                    {selectedProduct.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">
                        {formatSimpleINR(selectedProduct.originalPrice)}
                      </span>
                    )}
                  </div>
                  
                  <Button
                    onClick={() => {
                      handleAddToCart(selectedProduct)
                      setSelectedProduct(null)
                    }}
                    disabled={!selectedProduct.inStock}
                    className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-8"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600 pt-2">
                  <div className="flex items-center gap-1">
                    <Truck className="w-4 h-4" />
                    Free shipping over $50
                  </div>
                  <div className="flex items-center gap-1">
                    <Shield className="w-4 h-4" />
                    30-day return policy
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Shopping Cart Modal */}
      <Dialog open={showCart} onOpenChange={setShowCart}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-800">
              Shopping Cart ({getTotalItems()} items)
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Your cart is empty</h3>
                <p className="text-gray-600">Add some products to get started</p>
              </div>
            ) : (
              <>
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 border border-pink-100 rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">{item.name}</h4>
                      <p className="text-sm text-gray-600">{formatSimpleINR(item.price)} each</p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 p-0"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 p-0"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-semibold text-gray-800">
                        {formatSimpleINR(item.price * item.quantity)}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveFromCart(item.id)}
                        className="text-red-600 hover:text-red-700 text-xs"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
                
                <div className="border-t border-pink-100 pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xl font-bold text-gray-800">Total:</span>
                    <span className="text-2xl font-bold text-pink-600">
                      {formatSimpleINR(getTotalPrice())}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <Button
                      className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white py-3"
                      onClick={() => {
                        toast({
                          title: "Checkout Started",
                          description: "Redirecting to secure checkout...",
                        })
                        // Here you would integrate with a payment processor
                      }}
                    >
                      Proceed to Checkout
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-pink-200 text-pink-600 hover:bg-pink-50"
                      onClick={() => setShowCart(false)}
                    >
                      Continue Shopping
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
