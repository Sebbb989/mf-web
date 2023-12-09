"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Checkbox,
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
import { useIsLoggedIn, useUser } from "@/store/zustand";

type Inputs = {
  name: string;
  email: string;
  dni: string;
  password: string;
  parent0: string;
  parent1: string;
};

const Identify = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<Inputs>({ reValidateMode: "onChange", mode: "onChange" });

  const { setUser } = useUser();
  const { confirmLogIn } = useIsLoggedIn();

  const [isSignIn, setIsSignIn] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isDisabled, setIsDisabled] = useState(false);
  const [parent0Selected, setParent0Selected] = useState(false);
  const [parent1Selected, setParent1Selected] = useState(false);
  const [isForeign, setIsForeign] = useState(false);

  const redirect = () => {
    setTimeout(() => {
      router.push("/dashboard");
    }, 1500);
  };

  const postIdentifyActions = (response: any) => {
    setUser({
      id: response?.id,
      name: response?.name,
      email: response?.email,
      dni: response?.dni,
      isEnrolled: response?.isEnrolled,
      enrollNumber: response?.enrollNumber ?? null
    });
    confirmLogIn();
    setIsDisabled(false);
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsDisabled(true);
    if (isSignIn) {
      const response: any = await signIn(
        data.dni,
        data.password,
        redirect,
        onOpen
      );
      postIdentifyActions(response);
    } else {
      const response: any = await signUp(data, redirect, onOpen);
      postIdentifyActions(response);
    }
  };

  return (
    <>
      <div className="layout flex justify-center items-center">
        <form onSubmit={handleSubmit(onSubmit)} className="w-3/4 md:w-2/4">
          <section className="flex flex-col gap-4 my-12">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-bold">
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
              key={"dni-input"}
              type="dni"
              label="Identificacion personal"
              labelPlacement={"outside"}
              placeholder="8-888-8888"
              {...register("dni", { required: true })}
            />

            <div className={`${isSignIn ? "hidden" : ""}`}>
              <label className="mb-2 text-sm inline-block text-neutral-700 dark:text-neutral-200">
                Imagen de la identificación
              </label>
              <input
                accept="images/*"
                key={"dniImage-input"}
                type="file"
                className={`"relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                }`}
              />
            </div>
            <div className={`${isSignIn ? "hidden" : ""}`}>
              <label className="mb-2 text-sm inline-block text-neutral-700 dark:text-neutral-200">
                Créditos escolares
              </label>
              <input
                accept="images/*"
                key={"credits-input"}
                type="file"
                className={`"relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                }`}
              />
            </div>
            <div className={`${isSignIn ? "hidden" : ""}`}>
              <label className="mb-2 text-sm inline-block text-neutral-700 dark:text-neutral-200">
                Certificado de salud
              </label>
              <input
                accept="images/*"
                key={"healthCertificate-input"}
                type="file"
                className={`"relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                }`}
              />
            </div>

            <Input
              key={"email-input"}
              type="email"
              label="Correo electronico"
              labelPlacement={"outside"}
              placeholder="abc@def.com"
              className={`${isSignIn ? "hidden" : ""}`}
              {...register("email", { required: isSignIn ? false : true })}
            />

            <Checkbox
              isSelected={isForeign}
              className={`${isSignIn ? "hidden" : ""}`}
              onChange={() => setIsForeign(!isForeign)}
            >
              Es extranjero?
            </Checkbox>

            <div
              className={`${
                isSignIn ? "hidden" : isForeign ? "block" : "hidden"
              }`}
            >
              <label className="mb-2 text-sm inline-block text-neutral-700 dark:text-neutral-200">
                Documento de migración
              </label>
              <input
                accept="images/*"
                key={"migratonCertificate-input"}
                type="file"
                className={`relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary
                }`}
              />
            </div>

            <h3 className={`${isSignIn ? "hidden" : "mt-8 mb-4 text-xl font-bold"}`}>Información de los padres</h3>
            <Input
              key={"parent0-input"}
              type="text"
              label="Nombre completo del padre"
              labelPlacement={"outside"}
              placeholder="Juan Perez"
              className={`${isSignIn ? "hidden" : ""}`}
              isDisabled={isSignIn ? false : !!parent0Selected}
              {...register("parent0", {
                required: isSignIn ? false : !!!parent0Selected,
              })}
            />

            <div className={`${isSignIn ? "hidden" : parent0Selected ? "hidden":""}`}>
              <label className="mb-2 text-sm inline-block text-neutral-700 dark:text-neutral-200">
                Documento de identidad del padre
              </label>
              <input
                accept="images/*"
                key={"healthCertificate-input"}
                type="file"
                className={`"relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                }`}
              />
            </div>

            <Checkbox
              isSelected={parent0Selected}
              className={`${isSignIn ? "hidden" : ""}`}
              onChange={() => setParent0Selected(!parent0Selected)}
            >
              No tiene
            </Checkbox>

            <Input
              key={"parent1-input"}
              type="text"
              label="Nombre completo de la madre"
              labelPlacement={"outside"}
              placeholder="Juanita Ramos"
              className={`${isSignIn ? "hidden" : ""}`}
              isDisabled={isSignIn ? false : !!parent1Selected}
              {...register("parent1", {
                required: isSignIn ? false : !!!parent1Selected,
              })}
            />

            <div className={`${isSignIn ? "hidden" : parent1Selected ? "hidden":""}`}>
              <label className="mb-2 text-sm inline-block text-neutral-700 dark:text-neutral-200">
              Documento de identidad de la madre
              </label>
              <input
                accept="images/*"
                key={"healthCertificate-input"}
                type="file"
                className={`"relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                }`}
              />
            </div>

            <Checkbox
              isSelected={parent1Selected}
              className={`${isSignIn ? "hidden" : ""}`}
              onChange={() => setParent1Selected(!parent1Selected)}
            >
              No tiene
            </Checkbox>

            <h3 className={`${isSignIn ? "hidden" : "mt-8 mb-4 text-xl font-bold"}`}>Información de seguridad</h3>

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
                Al ingresar o registrarte aceptas nuestros términos y
                condiciones
              </p>
              <Button
                isDisabled={isDisabled}
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
                Te has identificado con éxito
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
