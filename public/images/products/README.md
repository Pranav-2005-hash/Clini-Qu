# Product Images Directory

This directory contains product images for the Clini-Q e-commerce section.

## Image Naming Convention

Images should be named using a simple format: `p1.jpg`, `p2.jpg`, `p3.jpg`, etc.

### Current Product Image Mapping:
- `p1.jpg` - Hydrating Vitamin C Serum
- `p2.jpg` - Gentle Foam Cleanser  
- `p3.jpg` - Broad Spectrum SPF 50+ Sunscreen
- `p4.jpg` - Niacinamide 10% + Zinc Serum
- `p5.jpg` - Retinol Night Cream
- `p6.jpg` - Hyaluronic Acid Moisturizer
- `p7.jpg` - Salicylic Acid Exfoliant
- `p8.jpg` - Ceramide Repair Balm

## Image Requirements:
- **Format**: JPG or PNG
- **Dimensions**: 300x300px (square format recommended)
- **Quality**: High resolution for product display
- **Background**: Clean, preferably white or transparent
- **File Size**: Optimized for web (under 200KB recommended)

## Usage:
Images are automatically loaded using the path `/images/products/p{id}.jpg` where {id} is the product ID.

## Adding New Products:
1. Add the product image as `p{next_number}.jpg` in this directory
2. Update the product data in `/app/api/products/route.ts`
3. Update this README with the new mapping
