import { useParams } from "react-router-dom"
import { useCallback, useEffect, useRef, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import supabase from "../../supabase";
import { useDispatch, useSelector } from "react-redux";
import { buttonFailed, buttonFinish, buttonStart } from "../../redux/admin/adminSlice";
import swal from "sweetalert2";

export default function KapsterUpdate() {
    const fileRef = useRef(null);
    const [image, setImage] = useState(undefined);
    const [imgUrl, setImgUrl] = useState(null);
    const [formData, setFormData] = useState({});
    const [kapsters, setKapsters] = useState({});
    const { loading, token } = useSelector((state) => state.admin);
    const dispatch = useDispatch();

    const { id } = useParams();

    useEffect(() => {
        const getKapstersById = async () => {
            try {
                dispatch(buttonStart());
                const response = await fetch(`/api/v1/kapsters/${id}`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const data = await response.json();
                if (!data.errors) {
                    dispatch(buttonFinish());
                    setKapsters(data.data);
                } else {
                    dispatch(buttonFailed(data.errors))
                }

            } catch (e) {
                console.log(e);
                dispatch(buttonFinish());
            }
        }

        getKapstersById();
    }, [dispatch, id]);

    const removeImage = useCallback(async () => {
        try {
            dispatch(buttonStart());
            const url = kapsters?.profile_pic;
            const regex = /\/([\w-]+\.\w+)$/;
            const match = url.match(regex);
            const profile_pic = match ? match[1] : null;
            const { error } = await supabase.storage.from('nudriin').remove([`nudriin/${profile_pic}`]);
            if (error) {
                throw new Error(error);
            }
            dispatch(buttonFinish());
        } catch (e) {
            console.log(e);
            dispatch(buttonFinish());
        }
    }, [dispatch, kapsters]);

    const uploadImage = useCallback(async (image) => {
        try {
            dispatch(buttonStart());
            const fileName = new Date().getTime() + image.name;
            const { data, error } = await supabase.storage.from('nudriin').upload(`${fileName}`, image);
            if (data) {
                dispatch(buttonFinish());
                return data;
            } else {
                throw new Error(error);
            }
        } catch (error) {
            console.log(error);
            dispatch(buttonFinish());
        }
    }, [dispatch]);

    const getImgUrl = useCallback((path) => {
        const { data } = supabase.storage.from('nudriin').getPublicUrl(path);
        return data.publicUrl;
    }, []);

    const updateKapsterProfile = useCallback(async (url) => {
        try {
            dispatch(buttonStart());
            const response = await fetch(`/api/v1/kapsters/${id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token.token}`
                },
                body: JSON.stringify({
                    profile_pic: url
                })
            });
            const data = await response.json();
            if (!data.errors) {
                dispatch(buttonFinish());
                swal.fire({
                    title: "Success",
                    text: "Gambar berhasil diubah!",
                    icon: "success",
                    customClass: 'bg-slate-900 text-lime rounded-xl'
                });
            } else {
                swal.fire({
                    title: "Error",
                    text: data.errors,
                    icon: "error",
                    customClass: 'bg-slate-900 text-lime rounded-xl'
                });
                throw new Error(data.errors);
            }
        } catch (error) {
            dispatch(buttonFinish());
        }
    }, [dispatch, id, token]);

    useEffect(() => {
        if (image) {
            removeImage();
            uploadImage(image).then((data) => {
                const url = getImgUrl(data.path)
                setImgUrl(url);
                updateKapsterProfile(url);
            });
        }
    }, [removeImage, uploadImage, getImgUrl, updateKapsterProfile, image])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
        console.log(formData);
    }


    const handleUpload = async (e) => {
        e.preventDefault();
        try {
            dispatch(buttonStart());
            const response = await fetch(`/api/v1/kapsters/${id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token.token}`
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (!data.errors) {
                dispatch(buttonFinish());
                swal.fire({
                    title: "Success",
                    text: "Kapster berhasil diubah!",
                    icon: "success",
                    customClass: 'bg-slate-900 text-lime rounded-xl'
                });
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
            console.log(data);
        } catch (e) {
            console.log(e);
            dispatch(buttonFinish());
        }
    }

    const handleDelete = async (e) => {
        e.preventDefault()
        try {
            const { isConfirmed } = await swal.fire({
                title: "Anda yakin?",
                text: "Tindakan ini akan menghapus data anda",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#7E30E1",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes",
                customClass: 'bg-slate-900 text-lime rounded-xl'
            });
            if (isConfirmed) {
                dispatch(buttonStart());
                removeImage();
                const response = await fetch(`/api/v1/kapsters/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token.token}`
                    }
                });

                const data = await response.json();

                if (!data.errors) {
                    console.log(data);
                    dispatch(buttonFinish());
                    swal.fire({
                        title: "Success",
                        text: "Kapster berhasil dihapus!",
                        icon: "success",
                        customClass: 'bg-slate-900 text-lime rounded-xl'
                    });
                    window.location.href = '/admin/kapsters';
                } else {
                    console.log(data);
                    dispatch(buttonFailed(data.errors));
                    swal.fire({
                        title: "Error",
                        text: data.errors,
                        icon: "error",
                        customClass: 'bg-slate-900 text-lime rounded-xl'
                    });
                }
            }
        } catch (e) {
            console.log(e);
            dispatch(buttonFinish());
        }
    }
    return (
        <AdminLayout>
            <div className="flex items-center justify-center min-h-screen text-white bg-slate-900">
                <div className="w-9/12 p-6 space-y-5 border rounded-xl border-lime">
                    <div className="flex flex-col items-center justify-center gap-2">
                        <svg viewBox="0 0 24 24" className="w-20 text-center icon" xmlns="http://www.w3.org/2000/svg" fill="#C9F67F" stroke="" transform="rotate(0)"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M8,10a3,3,0,0,0,3-3A3,3,0,0,0,8,4,2.91,2.91,0,0,0,5.2,6H2V8H5.2A2.91,2.91,0,0,0,8,10ZM8,6A.94.94,0,0,1,9,7,.94.94,0,0,1,8,8,.94.94,0,0,1,7,7,.94.94,0,0,1,8,6Zm11.8,5A2.91,2.91,0,0,0,17,9a3,3,0,0,0-3,3,2.74,2.74,0,0,0,0,.5l-4,2.24A3,3,0,0,0,8,14a2.91,2.91,0,0,0-2.8,2H2v2H5.2A2.91,2.91,0,0,0,8,20a3,3,0,0,0,3-3,2.74,2.74,0,0,0,0-.5l4-2.24A3,3,0,0,0,17,15a2.91,2.91,0,0,0,2.8-2H22V11ZM8,18a1,1,0,0,1,0-2,1,1,0,0,1,0,2Zm9-5a1,1,0,1,1,1-1A.94.94,0,0,1,17,13Z" fillRule="evenodd"></path><rect width="24" height="24" fill="none"></rect></g></svg>
                        <h1 className="mt-3 text-3xl text-center font-futura">Ubah Kapster</h1>
                    </div>
                    <form className="grid items-center justify-center grid-cols-12 gap-4">
                        <div className="col-span-6">
                            <label htmlFor="name" className="text-white">Nama</label>
                            <input defaultValue={kapsters?.name} onChange={handleChange} type="text" name="name" id="name" placeholder="Masukan nama disini..." className="w-full p-2 mb-4 border rounded-lg bg-slate-800 border-lime focus:outline-0" />
                            <label htmlFor="phone" className="text-white">Nomor Telepon</label>
                            <input defaultValue={kapsters?.phone} onChange={handleChange} type="number" name="phone" id="phone" placeholder="Masukan nomor telepon disini..." className="w-full p-2 mb-4 border rounded-lg bg-slate-800 border-lime focus:outline-0" />
                            <button onClick={handleUpload} disabled={loading} className="w-full p-2 mb-4 rounded-lg bg-lime text-slate-900 hover:bg-purple hover:text-white">{loading ? "..." : "Ubah"}</button>
                            <button onClick={handleDelete} disabled={loading} className="w-full p-2 mb-4 bg-red-500 rounded-lg text-slate-900 hover:bg-opacity-70 hover:text-white">{loading ? "..." : "Hapus"}</button>
                        </div>
                        <div className="col-span-6">
                            <div className="w-[320px] h-[250px] overflow-hidden rounded-xl">
                                {fileRef && <img src={imgUrl ? imgUrl : kapsters?.profile_pic} onClick={() => fileRef.current.click()} className="object-cover object-center w-full h-full cursor-pointer" />}
                            </div>
                            <input type="file" ref={fileRef} hidden onChange={(e) => setImage(e.target.files[0])} />
                        </div>
                    </form>
                    <div className="flex justify-center gap-1 text-sm">
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}
