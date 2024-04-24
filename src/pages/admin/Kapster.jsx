import { NavLink } from "react-router-dom";
import AdminLayout from "../../components/AdminLayout";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { buttonFailed, buttonFinish, buttonStart } from "../../redux/admin/adminSlice";
import swal from "sweetalert2";
export default function Kapster() {
    const [kapsters, setKapsters] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const getKapsters = async () => {
            try {
                dispatch(buttonStart());
                const response = await fetch("/api/v1/kapsters", {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const data = await response.json();
                if (!data.errors) {
                    console.log(data);
                    setKapsters(data.data);
                    dispatch(buttonFinish());
                } else {
                    dispatch(buttonFailed(data.errors));
                    swal.fire({
                        title: "Error",
                        text: data.errors,
                        icon: "error",
                        customClass: 'bg-slate-900 text-lime rounded-xl'
                    });
                    throw new Error(data.errors);
                }
            } catch (e) {
                console.log(e)
                dispatch(buttonFinish());
            }
        }
        getKapsters();
    }, [dispatch]);

    return (
        <AdminLayout>
            <div className="flex flex-col items-center justify-center w-9/12 gap-5 mx-auto">
                <div className="space-y-4 text-center">
                    <h1 className="mb-4 text-4xl text-white font-futura">Kapster</h1>
                    <NavLink to="/admin/kapsters/add">
                        <button className="px-2 py-2 rounded-full text-slate-900 bg-lime">Tambah</button>
                    </NavLink>
                </div>
                {kapsters.length === 0 ? (
                    <img className="w-2/4 h-2/4" src="https://kfbgqdcxemiokdktlykv.supabase.co/storage/v1/object/public/nudriin/web_images/undraw_empty_re_opql.svg" />
                ) : (
                    <div className="flex flex-wrap items-center justify-center gap-10 pb-10">
                        {
                            kapsters !== undefined && kapsters.map((value, index) => (
                                <div className="flex flex-col items-center justify-center gap-2" key={index}>
                                    <div className="max-w-sm overflow-hidden text-center rounded-full hover:bg-purple bg-lime text-slate-900 hover:text-white"  >
                                        <NavLink to={`/admin/kapsters/${value.id}`}>
                                            <img src={value.profile_pic} className="object-cover cursor-pointer object-center w-[250px] h-[250px]" />
                                        </NavLink>
                                    </div>
                                    <p className="text-white">{value.name}</p>
                                </div>
                            ))}
                    </div>
                )}
            </div>
        </AdminLayout>
    )
}
