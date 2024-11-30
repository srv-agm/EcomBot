import Endpoint from "@/common/endpoint";
import { APICall } from "@/services";
import { useMutation } from "react-query";

export type ForgotPasswordError = {
  message: string;
};

export type ForgotPasswordBodyType = {
  username: string;
};

/**
 * TODO
 */
export function useForgotPassword(
  onError: (error: ForgotPasswordError) => void,
  onSuccess: (data: any) => void,
) {
  const url = process.env.NEXT_PUBLIC_AUTH_DOMAIN + Endpoint.FORGOT_PASSWORD;
  return useMutation(APICall({ url, method: "POST" }), { onError, onSuccess });
}
