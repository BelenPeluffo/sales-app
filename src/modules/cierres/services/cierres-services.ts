import { AxiosClient } from "../../common/services";

export const abrirCierre = async () => {
  console.log("Cierre abierto");
  const response = await AxiosClient.get("/cierre/abrir");
  return response.data;
};
