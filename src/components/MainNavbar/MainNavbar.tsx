"use client";

import React, { useEffect } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Dropdown,
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { checkAuthToken, logout } from "@/hooks/handleIdentify";
import { useIsLoggedIn, useUser } from "@/store/zustand";
import { useRouter } from "next/navigation";

const MainNavbar = () => {
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { isLoggedIn, confirmLogIn, denyLogIn } = useIsLoggedIn();
  const { setUser } = useUser();

  useEffect(() => {
    if (!isLoggedIn) {
      const res = async () => {
        const data = await checkAuthToken();
        if (data) {
          console.log(data);
          setUser({ name: data.name, email: data.email, dni: data.dni });
          confirmLogIn();
        } else {
          denyLogIn();
        }
      };
      res();
    }
  }, []);

  const handleLogOut = () => {
    logout();
    setUser(null);
    denyLogIn();
    router.push("/");
  }

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
            {!isLoggedIn ? (
              <Link className="text-sm" color="foreground" href="/identify">
                Probar Ahora
              </Link>
            ) : (
              <Dropdown>
                <DropdownTrigger>
                  <Button size="sm" variant="bordered" color="primary" className="text-sm">Opciones</Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Dynamic Actions">
                    <DropdownItem
                      key={'first-dropdown'}
                      color={"danger"}
                      className={"text-red-600"}
                      onClick={handleLogOut}
                    >
                      {'Cerrar sesión'}
                    </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            )}
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
            {!isLoggedIn ? (
              <Link className="text-sm" color="foreground" href="/identify">
                Probar Ahora
              </Link>
            ) : (
              <p className="text-red-500 text-base" onClick={handleLogOut}>Cerrar sesión</p>
            )}
          </NavbarMenuItem>
        </NavbarMenu>
        {/* Mobile */}
      </Navbar>
    </div>
  );
};

export default MainNavbar;
