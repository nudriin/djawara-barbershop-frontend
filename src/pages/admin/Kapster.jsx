import { NavLink } from "react-router-dom";
import AdminLayout from "../../components/AdminLayout";
import { useEffect, useState } from "react";

export default function Kapster() {
    const [kapsters, setKapsters] = useState([]);

    useEffect(() => {
        const getKapsters = async () => {
            try {
                const response = await fetch("/api/v1/kapsters", {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const data = await response.json();
                setKapsters(data.data);
            } catch (e) {
                console.log(e)
            }
        }
        getKapsters();
    }, []);

    const handleClick = (id) => {
        window.location.href = `/admin/kapsters/${id}`;
    }

    return (
        <AdminLayout>
            <div className="flex flex-col items-center justify-center w-9/12 gap-5 mx-auto">
                <div className="space-y-4 text-center">
                    <h1 className="mb-4 text-4xl text-white font-futura">Kapster</h1>
                    <NavLink to="/admin/kapsters/add">
                        <button className="px-2 py-2 rounded-full text-slate-900 bg-lime">Tambah</button>
                    </NavLink>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-10 pb-10">
                    {
                    kapsters !== undefined && kapsters.map((value, index) => (
                        <div className="flex flex-col items-center justify-center gap-2" key={index}>
                            <div className="max-w-sm overflow-hidden text-center rounded-full hover:bg-purple bg-lime text-slate-900 hover:text-white"  >
                                <img src={value.profile_pic} className="object-cover cursor-pointer object-center w-[250px] h-[250px]" onClick={() => handleClick(value.id)} />
                            </div>
                            <p className="text-white">{value.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </AdminLayout>
    )
}
