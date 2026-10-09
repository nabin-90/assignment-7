# 🛒 BazarDor — বাজার দর

BazarDor is a Bengali-language market price tracking web application that helps users explore the current prices of everyday essential products in Bangladesh.

## 📌 Project Description

BazarDor provides an easy way to browse essential products, check their current prices, compare price changes, and view market-wise price information through a simple, responsive interface.

## 🛠️ Technologies Used

* Next.js (App Router)
* React
* TypeScript
* Tailwind CSS
* Next.js API data fetching
* REST API

## ✨ Features

1. **Homepage:** Browse essential products and explore market price information.
2. **Category Filtering:** View products by category, including rice, lentils, oil, vegetables, fish, meat, eggs and milk, and spices.
3. **Product Details:** View product information and market-wise prices.
4. **Price Ticker:** Follow a continuously moving ticker displaying product prices and price changes.
5. **Responsive Design:** Browse the application on desktop, tablet, and mobile devices.
6. **Loading Skeleton:** Display placeholder cards while page content is loading.
7. **Error Handling:** Show an error message with a retry option when a page encounters an error.
8. **Custom 404 Page:** Display a helpful not-found page with a link back to the homepage.
9. **Bengali Number Formatting:** Display product prices using Bengali numerals.

## 🚀 Getting Started

### Prerequisites

* Node.js
* npm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/nabin-90/assignment-7
   ```

2. Navigate to the project directory:

   ```bash
   cd bazardor
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open http://localhost:3000 in your browser.

## 🌐 API

BazarDor uses a REST API to retrieve product and market price information.

* **API Base URL:** https://api.api-store.workers.dev/api/bazardor
* **All Products:** `/products`
* **Products by Category:** `/products?category=chal`
* **Product Details:** `/products/:id`

## 📁 Project Structure

```text
src/
├── app/
│   ├── category/
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── product/
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── error.tsx
│   ├── loading.tsx
│   ├── not-found.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Navbar.tsx
│   └── PriceTicker.tsx
└── lib/
    ├── api.ts
    └── types.ts
```

## 🎯 Project Goal

The goal of BazarDor is to make everyday market price information easier to access, understand, and compare for consumers in Bangladesh.

## 👨‍💻 Developer

Developed as part of Assignment 07 using Next.js and TypeScript.
