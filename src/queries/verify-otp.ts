import Endpoint from "@/common/endpoint";
import { APICall } from "@/services";
import { useMutation } from "react-query";

type ErrorResponse = {
  message: string;
};

export type VerifyOTPBodyType = {
  username: string;
  otp_code: string;
};

/**
 * TODO
 */
export function useVerifyOTP(
  onError: (error: ErrorResponse) => void,
  onSuccess: (data: any) => void,
) {
  const url = process.env.NEXT_PUBLIC_AUTH_DOMAIN + Endpoint.VERIFY_OTP;
  return useMutation(APICall({ url, method: "POST" }), { onError, onSuccess });
}
