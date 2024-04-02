import AdminLayout from "../../components/AdminLayout";

export default function Kapster() {
    return (
        <AdminLayout>
            <div className="flex flex-col gap-5 items-center justify-center w-9/12 mx-auto">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl text-white font-futura">Kapster</h1>
                    <button className="text-slate-900 bg-lime px-2 py-2 rounded-full">Tambah</button>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-10 pb-10">
                    <div className="max-w-sm overflow-hidden text-center hover:bg-purple rounded-full bg-lime text-slate-900 hover:text-white">
                        <img src="https://placehold.co/250x250" className="object-cover object-top w-[250px] h-[250px]" />
                    </div>
                    <div className="max-w-sm overflow-hidden text-center hover:bg-purple rounded-full bg-lime text-slate-900 hover:text-white">
                        <img src="https://placehold.co/250x250" className="object-cover object-top w-[250px] h-[250px]" />
                    </div>
                    <div className="max-w-sm overflow-hidden text-center hover:bg-purple rounded-full bg-lime text-slate-900 hover:text-white">
                        <img src="https://placehold.co/250x250" className="object-cover object-top w-[250px] h-[250px]" />
                    </div>
                    <div className="max-w-sm overflow-hidden text-center hover:bg-purple rounded-full bg-lime text-slate-900 hover:text-white">
                        <img src="https://placehold.co/250x250" className="object-cover object-top w-[250px] h-[250px]" />
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}
