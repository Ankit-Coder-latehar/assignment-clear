# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


Italian Shoes — E-commerce (Frontend + Backend)
A simple, fully functional e-commerce site for Italian handmade shoes built with:

Frontend: React + Tailwind CSS + Clerk (auth)

Backend: Node.js + Express

DB: MongoDB (Mongoose)

Payments: Stripe (test mode) + PayPal (sandbox) + Mock payment option

Extras: 360° product view (frame sequence), product variants (color/size), order persistence, Clerk auth integration

This README explains how the project is structured, how to run it locally, how to seed data (including assets for 360° rotation), and how the core features work.


🥿 E-Commerce for Italian Handmade Shoes
A full-stack e-commerce application for premium Italian handmade shoes.
Built with React.js + Tailwind CSS for the frontend, Node.js + Express for the backend, MongoDB for persistence, and Clerk.js for authentication.

📌 Features
Frontend (React + TailwindCSS)
Responsive UI with clean design inspired by Magnanni.

Hero section, featured products grid, and about section on home page.

Product page with:

360° rotation viewer.

Color & size selection.

Variant image updates on color change.

Cart system (add/update/remove items).

Checkout with multiple payment methods (Stripe, PayPal, Mock).

User Authentication via Clerk.js (Google & email/password).

Order history for logged-in users.

Micro-interactions and animations for smooth UX.

Backend (Node.js + Express + MongoDB)
REST API to manage:

Products (/api/products)

Orders (/api/orders)

Mongoose models for Product and Order.

Controllers for business logic:

productController.js → Fetch, create, update, delete products.

orderController.js → Create, retrieve user orders.

Routes:

productRoutes.js → Product endpoints.

orderRoutes.js → Order endpoints.

.env configuration for database URI, API keys, etc.

Database (MongoDB)
Collections:
Users (managed via Clerk authentication)

Products

json
Copy
Edit
{
  "title": "Italian Leather Oxford",
  "description": "Handcrafted in Italy with premium leather.",
  "price": 299,
  "colors": ["black", "brown"],
  "sizes": [40, 41, 42, 43],
  "images": ["img1.jpg", "img2.jpg"]
}
Orders

json
Copy
Edit
{
  "userId": "clerk_user_id",
  "products": [
    { "productId": "123", "size": 42, "color": "black", "quantity": 1 }
  ],
  "total": 299,
  "status": "pending"
}
📂 Project Structure
bash
Copy
Edit
Ecommerce/
│
├── Backend/
│   ├── controllers/
│   │   ├── orderController.js     # Order business logic
│   │   └── productController.js   # Product business logic
│   ├── models/
│   │   ├── Order.js                # Order schema
│   │   └── Product.js              # Product schema
│   ├── routes/
│   │   ├── orderRoutes.js          # Order API routes
│   │   └── productRoutes.js        # Product API routes
│   ├── node_modules/
│   └── .env                        # Environment variables
│
├── Frontend/ (React + TailwindCSS)
│   ├── components/                 # UI components
│   ├── pages/                      # Page views
│   ├── App.js                      # Main app entry
│   ├── index.js                    # React entry
│   └── tailwind.config.js
│
└── README.md

 Installation & Setup
1️⃣ Clone repository
bash
Copy
Edit
git clone https://github.com/your-username/ecommerce-italian-shoes.git
cd ecommerce-italian-shoes
2️⃣ Backend setup
bash
Copy
Edit
cd Backend
npm install
Create a .env file:

env
Copy
Edit
MONGO_URI=your_mongodb_connection_string
STRIPE_SECRET_KEY=your_stripe_secret
PAYPAL_CLIENT_ID=your_paypal_client_id
Run backend:

bash
Copy
Edit
npm start
3️⃣ Frontend setup
bash
Copy
Edit
cd ../Frontend
npm install
npm start
🔑 Authentication
Clerk.js handles Google sign-in and email/password auth.

User orders are tied to their Clerk user ID.

🚀 API Endpoints
Products
Method	Endpoint	Description
GET	/api/products	Get all products
GET	/api/products/:id	Get product by ID
POST	/api/products	Add new product
PUT	/api/products/:id	Update product
DELETE	/api/products/:id	Delete product

Orders
Method	Endpoint	Description
Get	/api/orders	Create order
