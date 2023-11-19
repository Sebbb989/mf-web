"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";
import { signIn, signUp } from "@/hooks/handleIdentify";
import { useForm, SubmitHandler } from "react-hook-form";
import SuccessIdentifyIcon from "@/assets/svgs/successIdentifyIcon.svg";

type Inputs = {
  name: string;
  email: string;
  password: string;
};

const Identify = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<Inputs>({ reValidateMode: "onChange", mode: "onChange" });

  const [isSignIn, setIsSignIn] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const redirect = () => {
    setTimeout(() => {
      router.push("/");
    }, 1500);
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (isSignIn) {
      await signIn(data.email, data.password).finally(() => {
        onOpen();
        redirect();
      });
    } else {
      signUp(data).finally(() => {
        onOpen();
        redirect();
      });
    }
    console.log(data);
  };

  return (
    <>
      <div className="layout flex justify-center items-center">
        <form onSubmit={handleSubmit(onSubmit)} className="w-3/4 md:w-2/4">
          <section className="flex flex-col gap-4 my-12">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl">
                {isSignIn ? "Inicia sesion" : "Registrate"}
              </h1>
              <Button
                color="primary"
                variant="light"
                onClick={(e) => {
                  e.preventDefault;
                  setIsSignIn(!isSignIn);
                }}
              >
                {!isSignIn ? "Inicia sesion" : "Registrate"}
              </Button>
            </div>
            <Input
              key={"name-input"}
              type="name"
              label="Nombre completo"
              labelPlacement={"outside"}
              placeholder="John Doe"
              className={`${isSignIn ? "hidden" : ""}`}
              {...register("name", { required: isSignIn ? false : true })}
            />
            <Input
              key={"email-input"}
              type="email"
              label="Correo electronico"
              labelPlacement={"outside"}
              placeholder="abc@def.com"
              {...register("email", { required: true })}
            />
            <Input
              key={"password-input"}
              type="password"
              label="Contraseña"
              labelPlacement={"outside"}
              placeholder="Asegurate que sea segura!"
              {...register("password", { required: true })}
            />
            {!isValid && (
              <span className="text-xs text-red-700">
                * Todos los campos son requeridos *
              </span>
            )}
            <div className="flex justify-between items-center gap-4">
              <p className="text-gray-600 text-xs md:text-sm w-3/4 md:w-2/4">
                Al ingresar o registrarte aceptas nuestros terminos y
                condiciones
              </p>
              <Button
                className="mt-2 w-2/4 md:w-1/3"
                color="primary"
                radius="md"
                fullWidth
                type="submit"
              >
                {isSignIn ? "Iniciar sesion" : "Registrate"}
              </Button>
            </div>
          </section>
        </form>
      </div>
      <Modal
        backdrop={"blur"}
        isOpen={isOpen}
        onClose={onClose}
        hideCloseButton
        placement="center"
        isDismissable={false}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 mx-auto">
                Te has identificado con exito
              </ModalHeader>
              <ModalBody>
                <Image
                  quality={100}
                  className="mt-2 p-3 md:p-0 mx-auto"
                  src={SuccessIdentifyIcon}
                  alt={""}
                  width="100"
                ></Image>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Identify;
