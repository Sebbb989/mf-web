"use client";

import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";

const MainNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className="layout">
      <Navbar
        onMenuOpenChange={setIsMenuOpen}
        className="flex justify-between w-full [&>*]:px-0"
        maxWidth="full"
      >
        <NavbarBrand>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden mr-4"
          />
          <Link href="/" className="text-black">
            <p className="font-bold text-inherit text-xl cursor-pointer">
              Matricula Facil
            </p>
          </Link>
        </NavbarBrand>
        <NavbarContent
          className="hidden sm:flex gap-8 justify-between"
          justify="center"
        >
          <NavbarItem>
            <Link className="text-sm" color="foreground" href="/">
              Inicio
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link className="text-sm" color="foreground" href="#">
              Nosotros
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link className="text-sm" color="foreground" href="#">
              Blogs
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link className="text-sm" color="foreground" href="#">
              Contacto
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link className="text-sm" color="foreground" href="/identify">
              Probar Ahora
            </Link>
          </NavbarItem>
        </NavbarContent>
        {/* Mobile */}
        <NavbarMenu>
          <NavbarMenuItem className="mt-4">
            <Link className="text-base" color="foreground" href="/">
              Inicio
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link className="text-base" color="foreground" href="#">
              Nosotros
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link className="text-base" color="foreground" href="#">
              Blogs
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link className="text-base" color="foreground" href="#">
              Contacto
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem isActive>
            <Link className="text-base" color="foreground" href="/identify">
              Probar Ahora
            </Link>
          </NavbarMenuItem>
        </NavbarMenu>
        {/* Mobile */}
      </Navbar>
    </div>
  );
};

export default MainNavbar;
