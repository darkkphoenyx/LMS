import * as React from "react";
import { Link } from "react-router-dom";

import { cn } from "../../lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Horror",
    href: "/categories/horror",
    description: "Expreriences that evoke feelings of fear, dread, or terror.",
  },
  {
    title: "Comedy",
    href: "/categories/comedy",
    description: "Laugh out Loud experiences that entertain and amuse.",
  },
  {
    title: "Romance Comedy",
    href: "/categories/romance-comedy",
    description:
      "Dive deep into the world of love and relationships with a touch of humor.",
  },
  {
    title: "Sci-Fi",
    href: "/categories/sci-fi",
    description: "Explore futuristic worlds and advanced technology.",
  },
  {
    title: "Adventure",
    href: "/categories/adventure",
    description: "Take a journey through thrilling quests and explorations.",
  },
  {
    title: "Fantasy",
    href: "/categories/fantasy",
    description: "Wanna live out the fantasy, then do so.",
  },
];

const components2: { title: string; href: string; description: string }[] = [
  {
    title: "Buy",
    href: "/shop/buy",
    description: "Buy the latest and greatest books.",
  },
  {
    title: "Borrow",
    href: "/shop/borrow",
    description: "Borrow the latest and greatest books of all time.",
  },
];

const NavElements = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link to="/">
            <NavigationMenuLink className="font-medium text-lg">
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link to="/about">
            <NavigationMenuLink className="font-medium text-lg">
              About
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="font-medium text-lg">
            Shop
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {components2.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="font-medium text-lg">
            Categories
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/blogs">
            <NavigationMenuLink className="font-medium text-lg">
              Blogs
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/contact">
            <NavigationMenuLink className="font-medium text-lg">
              Contact Us
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { title: string }
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default NavElements;
