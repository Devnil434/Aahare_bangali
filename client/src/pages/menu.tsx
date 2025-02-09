import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { MENU_CATEGORIES } from "@/lib/constants";
import type { MenuItem } from "@shared/schema";

function MenuItemCard({ item }: { item: MenuItem }) {
  return (
    <Card>
      <div className="aspect-video relative">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle>{item.name}</CardTitle>
          <span className="font-bold">₹{item.price}</span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{item.description}</p>
      </CardContent>
    </Card>
  );
}

function MenuItemSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-[200px] w-full" />
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[200px]" />
    </div>
  );
}

export default function Menu() {
  const { data: menuItems, isLoading } = useQuery<MenuItem[]>({
    queryKey: ["/api/menu"],
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">Our Menu</h1>

      <Tabs defaultValue={MENU_CATEGORIES[0].id}>
        <TabsList className="w-full flex justify-center mb-8">
          {MENU_CATEGORIES.map((category) => (
            <TabsTrigger key={category.id} value={category.id}>
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {MENU_CATEGORIES.map((category) => (
          <TabsContent key={category.id} value={category.id}>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoading
                ? Array(6)
                    .fill(0)
                    .map((_, i) => <MenuItemSkeleton key={i} />)
                : menuItems
                    ?.filter((item) => item.category === category.id)
                    .map((item) => <MenuItemCard key={item.id} item={item} />)}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}