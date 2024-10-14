import { useSearchParams } from "next/navigation"

export default function useCreateUrlWithRedirectParam(url: string) {
    const searchParams = useSearchParams()
    const redirectUrl = searchParams.get("redirectUrl")
    return redirectUrl ? url + "?redirectUrl=" + redirectUrl : url
}
