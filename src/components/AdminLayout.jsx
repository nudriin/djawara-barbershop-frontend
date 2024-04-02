import AdminSidebar from "./AdminSidebar";

/* eslint-disable react/prop-types */
export default function AdminLayout({children}) {
    return (
        <div className="relative h-full">
            <div className="hidden h-full md:flex md:flex-col md:fixed md:inset-y-0 md:z-[80] bg-slate-900 w-[19rem] border border-t-0 border-l-0 border-b-0 border-r-2 border-r-lime">
                <AdminSidebar />
            </div>
            <div className="pt-28 pl-[19rem] min-h-screen bg-slate-900">
                {children}
            </div>
        </div>
    )
}
