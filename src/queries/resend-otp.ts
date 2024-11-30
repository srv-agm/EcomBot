import Endpoint from "@/common/endpoint";
import { APICall } from "@/services";
import { useMutation } from "react-query";

export type ResendOTPError = {
  message: string;
};

export type ResendOTPBodyType = {
  username: string;
};

/**
 * TODO
 */
export function useResendOTP(
  onError: (error: ResendOTPError) => void,
  onSuccess: (data: any) => void,
) {
  const url = process.env.NEXT_PUBLIC_AUTH_DOMAIN + Endpoint.RESEND_OTP;
  return useMutation(APICall({ url, method: "POST" }), { onError, onSuccess });
}
