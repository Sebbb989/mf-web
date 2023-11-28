import { get, post } from "@/services/axios";
import toast from "react-hot-toast";

export const checkAuthToken = async () => {
  try {
    const res: any = await get("user/auth-status");
    if (res.status !== 200) {
      return null;
    }
    return res.data;
  } catch (e) {
    throw console.error(e);
  }
};

export const signIn = async (
  dni: string,
  password: string,
  redirect: any,
  onOpenSuccess: any
) => {
  const result = await post<{ name: string }>("user/login", {
    dni: dni,
    password: password,
  });
  if (!result.error) {
    console.log("Data:", result.data);
    onOpenSuccess();
    redirect();
    return result.data
  } else {
    toast.error("Datos incorrectos");
    console.error("Error:", result.error);
  }
};

export const signUp = async (data: any, redirect: any, onOpenSuccess: any) => {
  console.log(data);
  const result = await post<{ id: number }>("user/signup", {
    name: data.name,
    email: data.email,
    dni: data.dni,
    dniImage: "DATOQUEMADO",
    credits: "DATOQUEMADO",
    migratoryPermit: "DATOQUEMADO",
    healthCertificate: "DATOQUEMADO",
    isForeign: false,
    password: data.password,
  });
  if (!result.error) {
    console.log("Post created with ID:", result.data.id);
    onOpenSuccess();
    redirect();
  } else {
    toast.error("Revisa tus datos e intenta nuevamente");
    console.error("Error:", result.error);
  }
};

export const logout = async () => {
    const res: any = await get("user/logout");
    if(res.status !== 200){
      throw console.error("Unable to logout")
    }
    toast.success("Ha salido con éxito de su sesión");
    return await res.data
};
