"use client";
import Endpoint from "@/common/endpoint";
import { fetchData } from "@/services";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

export function useIsMFA() {
  const [Body, setBody] = useState({});
  const url = process.env.NEXT_PUBLIC_AUTH_DOMAIN + Endpoint.IS_MFA;
  useEffect(() => {
    setBody({
      access_token:
        typeof window === "object" ? sessionStorage.getItem("AccessToken") : "",
    });
  }, []);
  let t = true;
  if (typeof window === "undefined") t = false;

  return useQuery({
    queryKey: ["IS_MFA", { url, method: "POST", data: Body }],
    queryFn: fetchData,
    enabled: t,
    staleTime: Number.POSITIVE_INFINITY,
    retry: 5,
  });
}
