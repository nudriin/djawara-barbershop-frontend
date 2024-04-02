import AdminLayout from "../../components/AdminLayout";

export default function Order() {
    return (
        <AdminLayout>
            <div className="flex justify-center text-white">
                <table>
                    <thead className="bg-lime text-slate-900">
                        <tr>
                            <th className="px-2">Nama</th>
                            <th className="px-2">Telpon</th>
                            <th className="px-2">Kategori</th>
                            <th className="px-2">Kapster</th>
                            <th className="px-2">Tanggal</th>
                            <th className="px-2">Jam</th>
                            <th className="px-2">Status</th>
                        </tr>
                    </thead>
                    <tbody className="border border-lime">
                        <tr>
                            <td className="px-2 py-3">Nama</td>
                            <td className="px-2 py-3">Telpon</td>
                            <td className="px-2 py-3">Kategori</td>
                            <td className="px-2 py-3">Kapster</td>
                            <td className="px-2 py-3">Tanggal</td>
                            <td className="px-2 py-3">Jam</td>
                            <td className="px-2 py-3">Status</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    )
}
