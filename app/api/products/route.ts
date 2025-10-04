import { NextResponse } from 'next/server'

export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  category: string
  rating: number
  reviews: number
  inStock: boolean
  features: string[]
  skinType: string[]
}

const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Hydrating Vitamin C Serum",
    description: "Brightening serum with 20% Vitamin C for radiant, youthful skin. This powerful antioxidant serum helps reduce dark spots, improve skin texture, and boost collagen production for a more youthful appearance.",
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
    description: "pH-balanced cleanser that removes impurities without stripping skin. Perfect for daily use, this gentle formula cleanses deeply while maintaining your skin's natural moisture barrier.",
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
    description: "Lightweight, non-greasy sunscreen with zinc oxide protection. Provides superior UV protection while feeling weightless on skin. Perfect for daily wear under makeup.",
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
    description: "Pore-minimizing serum that controls oil and reduces blemishes. This high-strength formula helps regulate sebum production and improve skin texture for a smoother complexion.",
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
    description: "Anti-aging night cream with encapsulated retinol for smoother skin. This gentle yet effective formula helps reduce fine lines and wrinkles while you sleep.",
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
    description: "Lightweight moisturizer that provides 24-hour hydration. This non-greasy formula plumps and hydrates skin with multiple types of hyaluronic acid.",
    price: 249900,
    image: "/images/products/p6.png",
    category: "moisturizers",
    rating: 4.4,
    reviews: 956,
    inStock: true,
    features: ["Hyaluronic Acid", "24hr Hydration", "Lightweight", "Non-greasy"],
    skinType: ["all", "dry", "dehydrated"]
  },
  {
    id: "7",
    name: "Salicylic Acid Exfoliant",
    description: "Gentle BHA exfoliant that unclogs pores and smooths skin texture. Perfect for treating blackheads, whiteheads, and improving overall skin clarity.",
    price: 189900,
    image: "/images/products/p7.png",
    category: "treatments",
    rating: 4.6,
    reviews: 1124,
    inStock: true,
    features: ["2% Salicylic Acid", "Pore Unclogging", "Gentle Exfoliation", "Oil Control"],
    skinType: ["oily", "combination", "acne-prone"]
  },
  {
    id: "8",
    name: "Ceramide Repair Balm",
    description: "Intensive repair balm for damaged or compromised skin barriers. Rich in ceramides and fatty acids to restore and protect sensitive skin.",
    price: 324900,
    image: "/images/products/p8.png",
    category: "moisturizers",
    rating: 4.7,
    reviews: 654,
    inStock: true,
    features: ["Ceramides", "Barrier Repair", "Intensive Hydration", "Fragrance-free"],
    skinType: ["sensitive", "dry", "damaged"]
  }
]

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const skinType = searchParams.get('skinType')
    const search = searchParams.get('search')
    const sortBy = searchParams.get('sortBy')

    let filteredProducts = [...PRODUCTS]

    // Filter by category
    if (category && category !== 'all') {
      filteredProducts = filteredProducts.filter(product => product.category === category)
    }

    // Filter by skin type
    if (skinType && skinType !== 'all') {
      filteredProducts = filteredProducts.filter(product => product.skinType.includes(skinType))
    }

    // Filter by search term
    if (search) {
      const searchLower = search.toLowerCase()
      filteredProducts = filteredProducts.filter(product => 
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.features.some(feature => feature.toLowerCase().includes(searchLower))
      )
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filteredProducts.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filteredProducts.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        filteredProducts.sort((a, b) => b.rating - a.rating)
        break
      case 'name':
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'reviews':
        filteredProducts.sort((a, b) => b.reviews - a.reviews)
        break
      default:
        // Keep original order for "featured"
        break
    }

    return NextResponse.json({
      products: filteredProducts,
      total: filteredProducts.length,
      categories: ['cleansers', 'serums', 'moisturizers', 'sunscreen', 'treatments'],
      skinTypes: ['normal', 'dry', 'oily', 'combination', 'sensitive', 'acne-prone', 'mature', 'dehydrated', 'damaged']
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { productIds } = body

    if (!productIds || !Array.isArray(productIds)) {
      return NextResponse.json(
        { error: 'Product IDs are required' },
        { status: 400 }
      )
    }

    const requestedProducts = PRODUCTS.filter(product => 
      productIds.includes(product.id)
    )

    return NextResponse.json({
      products: requestedProducts,
      total: requestedProducts.length
    })
  } catch (error) {
    console.error('Error fetching specific products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}
