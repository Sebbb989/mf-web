import { get, post } from "@/services/axios";
import toast from "react-hot-toast";

export const allInstitutes = async () => {
  try {
    const result: any = await get("institute/").then(({ data }: any) => {
      // console.log(data.institutes);
      return data.institutes;
    });
    return result;
  } catch (error) {
    toast.error("Algo ha salido mal");
    console.log(error);
    return;
  }
};

export const enroll = async (instituteId: any, grade: any, userId: any) => {
  try {
    const result: any = await post("institute/enroll", {
      instituteId: instituteId,
      grade: grade,
      userId: userId,
    }).then(({ data }: any) => {
      console.log(data.institutes);
      toast.success('Se ha matriculado exitosamente')
      return data.institutes;
    });
    return result;
  } catch (error) {
    toast.error("Algo ha salido mal");
    console.log(error);
    return;
  }
};
