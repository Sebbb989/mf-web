"use client";

import Image from "next/image";
import MainPageIcon from "@/assets/svgs/mainPageIcon.svg";
import MainPageBanner from "@/assets/svgs/mainPageBanner.svg";
import { Button, Link } from "@nextui-org/react";
import React from "react";
import { useIsLoggedIn } from "@/store/zustand";

const Home = () => {
  const { isLoggedIn } = useIsLoggedIn();

  return (
    <main className="layout">
      <div className="flex flex-col-reverse md:flex-row justify-between items-start gap-8 md:gap-0 mt-6">
        <div className="">
          <Image src={MainPageBanner} alt={""} width="400" height="500"></Image>
          <p className="mt-8 md:w-80 w-auto">
            Matricularse nunca ha sido tan facil, al paso de unos simples click
            accede a toda la informacion necesaria para matricular a los tuyos!
          </p>
          <Link
            href={`${isLoggedIn ? "/dashboard" : "/identify"}`}
            className="text-black"
          >
            <Button className="mt-8" color="primary" radius="sm">
              Inicia Ahora
            </Button>
          </Link>
        </div>
        <Image
          quality={100}
          className="mt-4 p-3 md:p-0"
          src={MainPageIcon}
          alt={""}
          width="500"
        ></Image>
      </div>
    </main>
  );
};

export default Home;
