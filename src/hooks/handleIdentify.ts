import { get, post } from "@/services/axios";

export const signIn = async (email: string, password: string) => {
  const result = await post<{ name: string }>("user/login", {
    email: email,
    password: password,
  });
  if (!result.error) {
    console.log("Data:", result.data);
  } else {
    console.error("Error:", result.error);
  }
};

export const signUp = async (data: any) => {
  console.log(data);
  const result = await post<{ id: number }>("user/signup", {
    name: data.name,
    email: data.email,
    password: data.password,
  });
  if (!result.error) {
    console.log("Post created with ID:", result.data.id);
  } else {
    console.error("Error:", result.error);
  }
};
