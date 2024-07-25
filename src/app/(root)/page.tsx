import { auth } from "@/lib/auth"

export default async function page() {
    console.log(await auth.getCurrentUser())
    return <div>page</div>
}
