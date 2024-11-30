import Endpoint from "@/common/endpoint";
import { APICall } from "@/services";
import { useMutation } from "react-query";

export type MFAVerifyError = {
  message: string;
};

export type MFAVerifyBodyType = {
  session_token: string;
  user_code: string;
  username: string;
  challenge_name: string;
};

/**
 * TODO
 */
export function useMFAVerify(
  onError: (error: MFAVerifyError) => void,
  onSuccess: (data: any) => void,
) {
  const url = process.env.NEXT_PUBLIC_AUTH_DOMAIN + Endpoint.VERIFY_MFA;
  return useMutation(APICall({ url, method: "POST" }), { onError, onSuccess });
}
