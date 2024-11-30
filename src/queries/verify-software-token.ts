import Endpoint from "@/common/endpoint";
import { APICall } from "@/services";
import { useRouter } from "next/navigation";
import { useMutation } from "react-query";

type ErrorResponse = {
  message: string;
};

export type VerifySoftwareTokenBodyType = {
  access_token: string;
  user_code: string;
};

export function useVerifySoftwareToken(onSuccess: (data: unknown) => void) {
  const url =
    process.env.NEXT_PUBLIC_AUTH_DOMAIN + Endpoint.VERIFY_SOFTWARE_TOKEN;
  return useMutation(APICall({ url, method: "POST" }), { onSuccess });
}
