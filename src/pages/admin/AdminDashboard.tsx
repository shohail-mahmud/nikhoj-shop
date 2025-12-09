import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Star, TrendingUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalReviews: 0,
    paintings: 0,
    tshirts: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const [productsResult, reviewsResult] = await Promise.all([
        supabase.from("products").select("id, category"),
        supabase.from("reviews").select("id"),
      ]);

      const products = productsResult.data || [];
      const reviews = reviewsResult.data || [];

      setStats({
        totalProducts: products.length,
        totalReviews: reviews.length,
        paintings: products.filter((p) => p.category === "painting").length,
        tshirts: products.filter((p) => p.category === "tshirt").length,
      });
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Total Products",
      value: stats.totalProducts,
      description: `${stats.paintings} paintings, ${stats.tshirts} t-shirts`,
      icon: Package,
      link: "/admin/products",
    },
    {
      title: "Total Reviews",
      value: stats.totalReviews,
      description: "Customer testimonials",
      icon: Star,
      link: "/admin/reviews",
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-serif font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Welcome to your admin dashboard. Manage your products and reviews here.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {statCards.map((stat) => (
            <Link key={stat.title} to={stat.link}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Quick Actions
              </CardTitle>
              <CardDescription>Common tasks you can perform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link 
                to="/admin/products" 
                className="block p-3 rounded-lg hover:bg-muted transition-colors"
              >
                <div className="font-medium">Manage Products</div>
                <div className="text-sm text-muted-foreground">
                  Add, edit, or remove products from your store
                </div>
              </Link>
              <Link 
                to="/admin/reviews" 
                className="block p-3 rounded-lg hover:bg-muted transition-colors"
              >
                <div className="font-medium">Manage Reviews</div>
                <div className="text-sm text-muted-foreground">
                  View and moderate customer reviews
                </div>
              </Link>
              <Link 
                to="/" 
                className="block p-3 rounded-lg hover:bg-muted transition-colors"
              >
                <div className="font-medium">View Store</div>
                <div className="text-sm text-muted-foreground">
                  See your store as customers see it
                </div>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
