import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Menu, Moon, Sun } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { RESTAURANT_INFO } from "@/lib/constants";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/reserve", label: "Reservations" },
  { href: "/contact", label: "Contact" },
];

export function Navigation() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") as "light" | "dark" || "light";
    }
    return "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  };

  const NavLinks = () => (
    <>
      {NAV_ITEMS.map((item) => (
        <Button
          key={item.href}
          variant={location === item.href ? "default" : "ghost"}
          asChild
        >
          <Link href={item.href}>{item.label}</Link>
        </Button>
      ))}
    </>
  );

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            {RESTAURANT_INFO.name}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <NavLinks />
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col space-y-4 mt-8">
                <NavLinks />
                <Button variant="ghost" size="icon" onClick={toggleTheme}>
                  {theme === "light" ? (
                    <Moon className="h-5 w-5" />
                  ) : (
                    <Sun className="h-5 w-5" />
                  )}
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}