import { RequestOptions } from "@/types";

export default function initReq(options: RequestOptions): Request {
  const {
    method = "GET",
    url,
    headers,
    body,
    mode,
    credentials,
    cache,
    redirect,
    referrer,
    integrity,
    keepalive,
    signal,
  } = options;

  return new Request(url, {
    method,
    headers,
    body,
    mode,
    credentials,
    cache,
    redirect,
    referrer,
    integrity,
    keepalive,
    signal,
  });
}

export { initReq };
