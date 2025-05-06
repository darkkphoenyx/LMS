import * as React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

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
    href: "/horror",
    description: "Expreriences that evoke feelings of fear, dread, or terror.",
  },
  {
    title: "Comedy",
    href: "/comedy",
    description: "Laugh out Loud experiences that entertain and amuse.",
  },
  {
    title: "Romance Comedy",
    href: "/romance-comedy",
    description:
      "Dive deep into the world of love and relationships with a touch of humor.",
  },
  {
    title: "Sci-Fi",
    href: "/sci-fi",
    description: "Explore futuristic worlds and advanced technology.",
  },
  {
    title: "Adventure",
    href: "/adventure",
    description: "Take a journey through thrilling quests and explorations.",
  },
  {
    title: "Fantasy",
    href: "/fantasy",
    description: "Wanna live out the fantasy, then do so.",
  },
];

const NavElements = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string) => {
    navigate(path);
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 200);
  };

  const isActive = (path: string): string => {
    return location.pathname === path
      ? "text-indigo-600 border-b-3 border-indigo-600 rounded-none transition-all"
      : "text-black";
  };
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link to="/">
            <NavigationMenuLink
              className={`font-medium text-lg ${isActive("/")}`}
              onClick={() => handleNavigation("/")}
            >
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link to="/books">
            <NavigationMenuLink
              className={`font-medium text-lg ${isActive("/books")}`}
              onClick={() => handleNavigation("/books")}
            >
              Books
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link to="/about">
            <NavigationMenuLink
              className={`font-medium text-lg ${isActive("/about")}`}
              onClick={() => handleNavigation("/about")}
            >
              About
            </NavigationMenuLink>
          </Link>
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
                  onClick={() => handleNavigation("/books")}
                  className={`${isActive(component.href)}`}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link to="/contact">
            <NavigationMenuLink
              className={`font-medium text-lg ${isActive("/contact")}`}
              onClick={() => handleNavigation("/contact")}
            >
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
