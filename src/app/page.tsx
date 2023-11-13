import Image from "next/image";
import MainPageIcon from "@/assets/svgs/mainPageIcon.svg";
import MainPageBanner from "@/assets/svgs/mainPageBanner.svg";
import { Button } from "@nextui-org/react";

export default function Home() {
  return (
    <main className="layout">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-0">
        <div className="">
          <Image src={MainPageBanner} alt={""} width="400" height="500"></Image>
          <p className="mt-8 md:w-80 w-auto">
            Matricularse nunca ha sido tan facil, al paso de unos simples click
            accede a toda la informacion necesaria para matricular a los tuyos!
          </p>
          <Button className="mt-8" color="primary" radius="sm">
            Inicia Ahora
          </Button>
        </div>
        <Image src={MainPageIcon} alt={""} width="500" height="900"></Image>
      </div>
    </main>
  );
}
