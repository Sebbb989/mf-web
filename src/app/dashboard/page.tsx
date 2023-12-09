"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useUser } from "@/store/zustand";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Modal,
  useDisclosure,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { allInstitutes, enroll } from "@/hooks/handleInstitutes";
import { useInstitutes } from "@/store/zustand";

const Dashboard = () => {
  const { institutes, setInstitutes }: any = useInstitutes();
  const [localGrade, setLocalGrade]: any = useState();

  const [localInstitute, setLocalInstitute]: any = useState();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { user } = useUser();

  const getAllInstitutes = useCallback(async () => {
    const request = await allInstitutes();
    setInstitutes(request);
  }, []);

  useEffect(() => {
    getAllInstitutes();
  }, []);

  const getGrade = () => {
    institutes?.some((institute: any) => {
      if (!institute?.grades?.length) return;
      institute?.grades?.some((grade: any) => {
        if (!grade?.students?.length) return;
        const foundStudent = grade?.students?.find(
          (student: any) => student?._id === user?.id
        );
        if (foundStudent) {
          setLocalInstitute(institute);
          setLocalGrade(grade);
        }
      });
    });
  };

  useEffect(() => {
    getGrade();
  }, [institutes, localInstitute, localGrade]);

  return (
    <>
      <div className="layout flex justify-center items-center flex-col gap-8">
        <h1 className="text-black text-xl font-bold mt-8">
          Bienvenid@ {user?.name}
        </h1>
        <div className="">
          <p
            className={`${
              !user?.isEnrolled ? "text-sm text-red-500 bg-red-100" : "hidden"
            }`}
          >
            Usted actualmente no se encuentra matriculado para este periodo.
          </p>
          <p
            className={`${
              user?.isEnrolled
                ? "text-sm text-green-500 bg-green-100"
                : "hidden"
            }`}
          >
            Usted se encuentra matriculado.
          </p>
        </div>
        {!user?.isEnrolled ? (
          <>
            <h2 className="ml-0 w-full -mb-6 font-semibold text-xl">
              Tabla de insituciones
            </h2>
            <Table isStriped aria-label="Example static collection table">
              <TableHeader>
                <TableColumn>INSTITUCIÓN</TableColumn>
                <TableColumn>GRADO MIN.</TableColumn>
                <TableColumn>GRADO MAX.</TableColumn>
                <TableColumn>PROVINCIA</TableColumn>
                <TableColumn>ACCIONES</TableColumn>
              </TableHeader>
              <TableBody>
                {institutes?.map((institute: any) => {
                  return (
                    <TableRow key={institute?.name}>
                      <TableCell>{institute?.name}</TableCell>
                      <TableCell>{institute?.minGrade}</TableCell>
                      <TableCell>{institute?.maxGrade}</TableCell>
                      <TableCell>{institute?.province}</TableCell>
                      <TableCell>
                        <Button
                          onPress={onOpen}
                          color="primary"
                          size="sm"
                          onClick={() => {
                            setLocalInstitute(institute);
                          }}
                        >
                          SALONES
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </>
        ) : (
          <>
            <h2 className="ml-0 w-full -mb-2 font-semibold text-xl">
              Datos de su matricula
            </h2>

            <p className="text-left w-full font-bold flex justify-start items-center gap-2 ">
              <span className="border-1.5 border-black p-1 rounded-md">
                {user?.enrollNumber}
              </span>
              {localInstitute?.name}
            </p>
            <p className="w-full text-left -mt-6 font-bold">
              Grado: {localGrade?.grade}
            </p>
            <p className="text-left w-full -mt-6 text-sm text-red-500">
              Éste es sú número de matrícula, debe presentarse con éste mismo el
              primer dia de clase para validación y posteriormente asignación a
              su respectivo salón de clase.
            </p>

            <h2 className="ml-0 w-full -mb-6 font-semibold text-xl">
              Recomendaciones y reglamento
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-4 mb-12">
              <div className="relative flex w-72 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                <div className="p-6">
                  <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                    Uniforme
                  </h5>
                  <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                    {localGrade?.grade <= 6 && (
                      <>
                        {" "}
                        <span className="font-bold">
                          Pre-kinder y primaria:
                        </span>{" "}
                        Camisa blanca, pantalón azul oscuro, medias azules por
                        encima del tobillo, zapatos negros.
                      </>
                    )}
                    {localGrade?.grade > 6 && localGrade?.grade <= 9 && (
                      <>
                        {" "}
                        <span className="font-bold">Pre-Media:</span> Camisa
                        celeste, pantalón azul oscuro, medias azules por encima
                        del tobillo, zapatos negros.
                      </>
                    )}
                    {localGrade?.grade > 9 && (
                      <>
                        {" "}
                        <span className="font-bold">Bachilleres:</span> Camisa
                        blanca, corbata azul oscuro, pantalón azul oscuro,
                        medias azul oscuro por encima del tobillo, zapatos
                        negros.
                      </>
                    )}
                  </p>
                </div>
              </div>
              <div className="relative flex w-72 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                <div className="p-6">
                  <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                    Utiles
                  </h5>
                  <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                    Se recomienda la compra basica de plumas, lapices,
                    cuadernos, libretas, portafolio, agenda, colores, kit de
                    geometria. Aparte el primer dia de clases se le
                    proporcionara información acerca de material adicional como
                    libros o herramientas complementarias.
                  </p>
                </div>
              </div>
              <div className="relative flex w-72 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                <div className="p-6">
                  <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                    Reglamento
                  </h5>
                  <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                    Compartimos su correo electronico con la institución a la
                    cual se matriculo, recibira una copia del reglamento
                    directamente a su correo, por favor leerlo antes del inicio
                    de clases.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="xl"
        placement="center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <p className="text-base md:text-xl">
                  Salones: {localInstitute?.name}
                </p>
              </ModalHeader>
              <ModalBody>
                {localInstitute?.grades?.length > 0 ? (
                  <Table isStriped aria-label="Example static collection table">
                    <TableHeader>
                      <TableColumn>GRADO</TableColumn>
                      <TableColumn>CAPACIDAD</TableColumn>
                      <TableColumn>MATRICULADOS</TableColumn>
                      <TableColumn>ACCIONES</TableColumn>
                    </TableHeader>
                    <TableBody>
                      {localInstitute?.grades?.map((grade: any) => {
                        return (
                          <TableRow key={grade?.grade}>
                            <TableCell>{grade?.grade}</TableCell>
                            <TableCell>{grade?.capacity}</TableCell>
                            <TableCell>{grade?.currentlyEnrolled}</TableCell>
                            <TableCell>
                              <Button
                                color="primary"
                                size="sm"
                                onClick={async () => {
                                  await enroll(
                                    localInstitute?._id,
                                    grade?.grade,
                                    user?.id
                                  );
                                  setTimeout(() => {
                                    location.reload();
                                  }, 1500);
                                }}
                              >
                                MATRICULAR
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                ) : (
                  <p>No hay salones disponibles</p>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
export default Dashboard;
