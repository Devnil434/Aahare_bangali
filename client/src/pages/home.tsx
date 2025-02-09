import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { RESTAURANT_INFO } from "@/lib/constants";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section
        className="relative h-[80vh] flex items-center justify-center text-white"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.6)",
        }}
      >
        <div
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage: "url(https://images.unsplash.com/photo-1576048177169-f0622a66adbd)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            {RESTAURANT_INFO.name}
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Experience culinary excellence in the heart of the city
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/menu">View Menu</Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/reserve">Reserve Table</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Our Story</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Welcome to {RESTAURANT_INFO.name}, where culinary artistry meets
                warm hospitality. Our passionate team of chefs creates
                unforgettable dining experiences using the finest local
                ingredients.
              </p>
              <Button variant="outline" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
            <div className="relative h-[400px]">
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
                alt="Restaurant interior"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
