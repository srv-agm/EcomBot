import Endpoint from "@/common/endpoint";
import { APICall } from "@/services";
import { useMutation } from "react-query";

export type ConfirmForgotPasswordError = {
  message: string;
};

export type ConfirmForgotPasswordBodyType = {
  username: string;
  confirmation_code: string;
  new_password: string;
};

/**
 * TODO
 */
export function useConfirmForgotPassword(
  onError: (error: ConfirmForgotPasswordError) => void,
  onSuccess: (data: any) => void,
) {
  const url =
    process.env.NEXT_PUBLIC_AUTH_DOMAIN + Endpoint.CONFIRM_FORGOT_PASSWORD;
  return useMutation(APICall({ url, method: "POST" }), { onError, onSuccess });
}
