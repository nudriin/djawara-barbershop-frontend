import AdminLayout from '../../components/AdminLayout'

export default function Schedule() {
    return (
        <AdminLayout>
            <div>
                <div className='flex flex-col items-center justify-center gap-5'>
                    <div className='space-y-4 text-center'>
                        <h1 className="text-4xl text-white font-futura">Jadwal</h1>
                        <button className='p-2 rounded-full bg-lime'>Tambah</button>
                    </div>
                    <div className='text-white'>
                        <table>
                            <thead className="bg-lime text-slate-900">
                                <tr>
                                    <th className="px-2">Kapster</th>
                                    <th className="px-2">Kategori</th>
                                    <th className="px-2">Waktu Mulai</th>
                                    <th className="px-2">Waktu Selesai</th>
                                    <th className="px-2">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="border border-lime">
                                <tr>
                                    <td className="px-2 py-3">Kapster</td>
                                    <td className="px-2 py-3">Kategori</td>
                                    <td className="px-2 py-3">Kategori</td>
                                    <td className="px-2 py-3">Kapster</td>
                                    <td className="px-2 py-3"><button className='px-2 bg-red-500 rounded-full'>Hapus</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}
