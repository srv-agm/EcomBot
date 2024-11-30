import Endpoint from "@/common/endpoint";
import { APICall } from "@/services";
import { useMutation } from "react-query";

export type SignOutError = {
  message: string;
};

export type SignOutBodyType = {
  access_token: string;
};

/**
 * TODO
 */
export function useSignOut(
  onError: (error: SignOutError) => void,
  onSuccess: (data: any) => void,
) {
  const url = process.env.NEXT_PUBLIC_AUTH_DOMAIN + Endpoint.SIGN_OUT;
  return useMutation(APICall({ url, method: "POST" }), { onError, onSuccess });
}
