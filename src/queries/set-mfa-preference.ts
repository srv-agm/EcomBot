import Endpoint from "@/common/endpoint";
import { APICall } from "@/services";
import { useMutation } from "react-query";

export type ErrorResponse = {
  message: string;
};

export type SetMFAPreferenceBodyType = {
  access_token: string;
  user_code: string;
};

export function useSetMFAPreference(
  onError: (err: ErrorResponse) => void,
  onSuccess: (data: unknown) => void,
) {
  const url = process.env.NEXT_PUBLIC_AUTH_DOMAIN + Endpoint.SET_MFA_PREFERENCE;
  return useMutation(APICall({ url, method: "POST" }), { onSuccess, onError });
}
