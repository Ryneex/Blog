import RootLayout from "@/components/RootLayout"

export default async function layout({ children }: { children: React.ReactNode }) {
    return <RootLayout>{children}</RootLayout>
}
