# Product Images Management Guide

## 📁 Image Directory Structure

```
public/
└── images/
    └── products/
        ├── README.md          # Documentation
        ├── .gitkeep          # Git tracking
        ├── p1.jpg            # Hydrating Vitamin C Serum
        ├── p2.jpg            # Gentle Foam Cleanser
        ├── p3.jpg            # Broad Spectrum SPF 50+ Sunscreen
        ├── p4.jpg            # Niacinamide 10% + Zinc Serum
        ├── p5.jpg            # Retinol Night Cream
        ├── p6.jpg            # Hyaluronic Acid Moisturizer
        ├── p7.jpg            # Salicylic Acid Exfoliant
        └── p8.jpg            # Ceramide Repair Balm
```

## 🖼️ Image Requirements

### File Naming Convention
- **Format**: `p{number}.jpg` (e.g., p1.jpg, p2.jpg, p3.jpg)
- **Sequential numbering**: Start from p1 and increment for each new product
- **File extension**: `.jpg` or `.png` (JPG recommended for smaller file sizes)

### Image Specifications
- **Dimensions**: 300x300px (square format recommended)
- **Aspect Ratio**: 1:1 (square)
- **File Size**: Under 200KB for optimal loading
- **Quality**: High resolution, web-optimized
- **Background**: Clean white or transparent background
- **Format**: JPG (preferred) or PNG

### Image Content Guidelines
- **Product Focus**: Product should be centered and clearly visible
- **Lighting**: Even, professional lighting
- **Angle**: Front-facing or slight angle to show product details
- **Branding**: Include product packaging/labels if applicable
- **Consistency**: Maintain similar style across all product images

## 🔄 Adding New Products

### Step 1: Add Product Image
1. Prepare your product image according to specifications above
2. Name it with the next sequential number (e.g., if you have p1-p8, name the new one p9.jpg)
3. Place it in `/public/images/products/` directory

### Step 2: Update Product Data
1. Open `/app/api/products/route.ts`
2. Add new product object to the `PRODUCTS` array:

```typescript
{
  id: "9",
  name: "Your Product Name",
  description: "Product description...",
  price: 2999, // Price in paise (₹29.99 = 2999 paise)
  originalPrice: 3499, // Optional sale price
  image: "/images/products/p9.jpg",
  category: "serums", // cleansers, serums, moisturizers, sunscreen, treatments
  rating: 4.5,
  reviews: 123,
  inStock: true,
  features: ["Feature 1", "Feature 2", "Feature 3"],
  skinType: ["normal", "dry", "oily"] // all, normal, dry, oily, combination, sensitive, acne-prone, mature, dehydrated, damaged
}
```

### Step 3: Update Documentation
1. Update `/public/images/products/README.md` with the new product mapping
2. Update this guide if needed

## 💰 Currency Format (INR)

### Price Storage
- Prices are stored in **paise** (smallest unit of INR)
- Example: ₹29.99 = 2999 paise
- Example: ₹1,599 = 159900 paise

### Price Display
- Automatically formatted using `formatSimpleINR()` function
- Displays as: ₹1,599, ₹29.99, etc.
- Uses Indian number formatting (lakhs, crores)

### Price Conversion Reference
```
USD $10 ≈ ₹830 = 83000 paise
USD $25 ≈ ₹2,075 = 207500 paise  
USD $50 ≈ ₹4,150 = 415000 paise
```

## 🛠️ Technical Implementation

### Image Loading
- Images are loaded from `/images/products/p{id}.jpg`
- Automatic fallback to placeholder if image not found
- Lazy loading implemented for performance

### File Structure Impact
- Products API: `/app/api/products/route.ts`
- Products Page: `/app/products/page.tsx`
- Currency Utils: `/lib/currency.ts`
- Cart Context: `/contexts/cart-context.tsx`

## 📝 Current Product Mapping

| ID | Image File | Product Name | Price (INR) |
|----|------------|--------------|-------------|
| 1  | p1.jpg     | Hydrating Vitamin C Serum | ₹3,799 |
| 2  | p2.jpg     | Gentle Foam Cleanser | ₹2,099 |
| 3  | p3.jpg     | Broad Spectrum SPF 50+ Sunscreen | ₹2,749 |
| 4  | p4.jpg     | Niacinamide 10% + Zinc Serum | ₹1,599 |
| 5  | p5.jpg     | Retinol Night Cream | ₹5,699 |
| 6  | p6.jpg     | Hyaluronic Acid Moisturizer | ₹2,499 |
| 7  | p7.jpg     | Salicylic Acid Exfoliant | ₹1,899 |
| 8  | p8.jpg     | Ceramide Repair Balm | ₹3,249 |

## 🚀 Quick Start

1. **Add your product images** to `/public/images/products/` with names p1.jpg, p2.jpg, etc.
2. **Ensure images meet specifications** (300x300px, under 200KB)
3. **Test the products page** at `/products` to verify images load correctly
4. **Images will automatically appear** in the product grid and detail modals

## 🔍 Troubleshooting

### Image Not Loading
- Check file name matches exactly (p1.jpg, not P1.JPG or p1.jpeg)
- Verify file is in correct directory: `/public/images/products/`
- Ensure file size is under 200KB
- Check browser console for 404 errors

### Image Quality Issues
- Use 300x300px minimum resolution
- Compress images while maintaining quality
- Use JPG format for photographs, PNG for graphics with transparency

### Performance Issues
- Optimize image file sizes (use tools like TinyPNG)
- Consider WebP format for modern browsers
- Implement progressive loading if needed
