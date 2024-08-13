import Sidebar from "./Sidebar"

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="container flex h-full gap-5 pb-5 pt-5">
            <Sidebar />
            {children}
        </div>
    )
}
