import Endpoint from "@/common/endpoint";
import { APICall } from "@/services";
import { useMutation } from "react-query";

type ErrorResponse = {
  message: string;
};

export type LoginBodyType = {
  username: string;
  password: string;
};

export function useLogin(
  onError: (error: ErrorResponse) => void,
  onSuccess: (data: any) => void,
) {
  const url = process.env.NEXT_PUBLIC_AUTH_DOMAIN + Endpoint.LOGIN;
  return useMutation(APICall({ url, method: "POST" }), { onError, onSuccess });
}
