# 🛒 BazarDor — বাজার দর

**BazarDor** is a Bengali-language market price tracking web application that helps users explore, track, and compare the prices of everyday essential products in Bangladesh.

## 📌 Project Description

BazarDor provides a simple and responsive platform to browse essential products, check current prices, compare price changes, and explore market-wise pricing information. The application also includes user authentication and profile management.

## 🌐 Live Demo & Repository

- **Live Demo:** [https://bazardor-self.vercel.app/](https://bazardor-self.vercel.app/)
- **GitHub Repository:** [https://github.com/nabin-90/assignment-7](https://github.com/nabin-90/assignment-7)

## 🛠️ Technologies Used

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- Better Auth
- MongoDB
- React Toastify
- REST API
- Vercel

## ✨ Features

1. **Homepage:** Browse essential products and explore current market prices.
2. **Category Filtering:** Browse products by category, including rice, lentils, oil, vegetables, fish, meat, eggs, and spices.
3. **Product Details:** View product information and market-wise price ranges.
4. **Price Ticker:** Follow a continuously moving ticker showing product prices and price changes.
5. **Price Comparison:** Explore minimum, maximum, and average prices across markets.
6. **Price Sorting:** Sort products by price from low to high or high to low.
7. **User Authentication:** Sign up and sign in using email and password.
8. **Social Login:** Sign in with Google and GitHub.
9. **Protected Product Details:** Sign in to access detailed product pricing.
10. **User Profile:** View account information and update profile details.
11. **Responsive Design:** Browse on desktop, tablet, and mobile devices.
12. **Loading Skeletons:** Display loading placeholders while page content loads.
13. **Error Handling:** Display error states with retry options where supported.
14. **Custom 404 Page:** Show a helpful not-found page with a link back to the homepage.
15. **Bengali Number Formatting:** Display prices using Bengali numerals.

## 🚀 Getting Started

### Prerequisites

- Node.js
- npm
- A MongoDB database
- Google and GitHub OAuth credentials for social login

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/nabin-90/assignment-7.git
   ```

2. Navigate to the project directory:

   ```bash
   cd bazardor
   ```

   If the cloned folder has a different name, navigate to that folder instead.

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the project root and configure the required environment variables:

   ```env
   BETTER_AUTH_URL=http://localhost:3000
   BETTER_AUTH_SECRET=your_secret_key
   BETTER_AUTH_MONGODB_URI=your_mongodb_connection_string
   NEXT_PUBLIC_APP_URL=http://localhost:3000

   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret

   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
   ```

   Replace the example values with your actual credentials. Never commit your `.env` file or publish your secrets.

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm run start
```

## 🌐 API

BazarDor uses the Programming Hero REST API to retrieve product and market price information.

- **API Base URL:** [https://openapi.programming-hero.com/api/bazardor](https://openapi.programming-hero.com/api/bazardor)
- **All Products:** `/products`
- **Products by Category:** `/products?category=chal`
- **Product Details:** `/products/:id`
- **All Categories:** `/categories`

## 📁 Project Structure

```text
src/
├── app/
│   ├── api/
│   │   └── auth/
│   │       └── [...all]/
│   ├── category/
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── product/
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── profile/
│   │   ├── update/
│   │   │   └── page.tsx
│   │   └── page.tsx
│   ├── signin/
│   │   └── page.tsx
│   ├── signup/
│   │   └── page.tsx
│   ├── error.tsx
│   ├── loading.tsx
│   ├── not-found.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
└── lib/
    ├── api.ts
    ├── auth.ts
    ├── auth-client.ts
    └── types.ts
```

## 🎯 Project Goal

The goal of BazarDor is to make everyday market price information easier to access, understand, and compare for consumers in Bangladesh.

Market prices are indicative and may change depending on location and market conditions.

## 👨‍💻 Developer

Developed by **Mahmudun Nabin** as part of Assignment 07 using Next.js and TypeScript.

---

**BazarDor — প্রয়োজনীয় পণ্যের দাম এক নজরে।**
