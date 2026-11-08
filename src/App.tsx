import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useParams, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { StoreProvider } from './context/StoreContext';

// Storefront Components
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderSuccessPage } from './pages/OrderSuccessPage';
import { OrderTrackingPage } from './pages/OrderTrackingPage';
import { LoginPage } from './pages/LoginPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { AccountPage } from './pages/AccountPage';
import { WishlistPage } from './pages/WishlistPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { FaqPage } from './pages/FaqPage';
import { ShippingPolicyPage } from './pages/ShippingPolicyPage';
import { ReturnsPolicyPage } from './pages/ReturnsPolicyPage';
import { BlogPage } from './pages/BlogPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Admin Components
import { AdminLayout } from './admin/AdminLayout';
import { AdminDashboard } from './admin/AdminDashboard';
import { AdminProducts } from './admin/AdminProducts';
import { AdminAddProduct } from './admin/AdminAddProduct';
import { AdminOrders } from './admin/AdminOrders';
import { AdminCustomers } from './admin/AdminCustomers';
import { AdminCategories } from './admin/AdminCategories';
import { AdminContent } from './admin/AdminContent';
import { AdminDelivery } from './admin/AdminDelivery';
import { AdminMessages } from './admin/AdminMessages';
import { AdminSettings } from './admin/AdminSettings';

// Scroll to top automatically on route changes
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
};

// Layout for customer-facing storefront pages
const StorefrontLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1F2937] antialiased selection:bg-[#F97316] selection:text-white">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

// Route wrapper for dynamic collections (/collections/:collection)
const DynamicCollectionPage: React.FC = () => {
  const { collection } = useParams<{ collection: string }>();
  const valid =
    collection === 'men' ||
    collection === 'women' ||
    collection === 'accessories' ||
    collection === 'shoes';

  return <ShopPage forcedCollection={valid ? (collection as any) : undefined} />;
};

// Admin authentication guard
const AdminRouteGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAdmin } = useAuth();
  
  // If user is not admin, redirect to login page with notification
  if (!user || !isAdmin) {
    return <Navigate to="/login?admin=required" replace />;
  }

  return <>{children}</>;
};

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <StoreProvider>
          <ScrollToTop />
          <Routes>
            {/* Storefront routes with unified Navbar & Footer */}
            <Route element={<StorefrontLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/collections/:collection" element={<DynamicCollectionPage />} />
              <Route path="/categories" element={<ShopPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order-success" element={<OrderSuccessPage />} />
              <Route path="/order-tracking" element={<OrderTrackingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<LoginPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/faq" element={<FaqPage />} />
              <Route path="/shipping-policy" element={<ShippingPolicyPage />} />
              <Route path="/returns-policy" element={<ReturnsPolicyPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>

            {/* Admin Management System (Isolated layout with dark sidebar) */}
            <Route
              path="/admin"
              element={
                <AdminRouteGuard>
                  <AdminLayout />
                </AdminRouteGuard>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="products/add" element={<AdminAddProduct />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="customers" element={<AdminCustomers />} />
              <Route path="categories" element={<AdminCategories />} />
              <Route path="content" element={<AdminContent />} />
              <Route path="delivery" element={<AdminDelivery />} />
              <Route path="messages" element={<AdminMessages />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
          </Routes>
        </StoreProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
