import AdminLayout from "../../components/AdminLayout";

export default function Category() {
    return (
        <AdminLayout>
            <div className="flex justify-center text-white">
                <table>
                    <thead className="bg-lime text-slate-900">
                        <tr>
                            <th className="px-2">Nomor</th>
                            <th className="px-2">Nama Kategori</th>
                            <th className="px-2">Harga</th>
                            <th className="px-2">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="border border-lime">
                        <tr>
                            <td className="px-2 py-3">1</td>
                            <td className="px-2 py-3">Bearded</td>
                            <td className="px-2 py-3">Rp20.000</td>
                            <td className="px-2 py-3 space-x-1">
                                <button className='px-2 bg-lime text-slate-900 rounded-full'>Ubah</button>
                                <button className='px-2 bg-red-500 rounded-full'>Hapus</button>
                            </td>

                        </tr>
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    )
}
