import Sidebar from "./Sidebar"

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="container h-full gap-10 overflow-auto py-2 sm:flex sm:py-5">
            <Sidebar />
            {children}
        </div>
    )
}
