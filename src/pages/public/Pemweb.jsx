
export default function Pemweb() {
    return (
        <section className="min-h-screen text-white bg-slate-900">
            <div className="py-20 space-y-5 text-center">
                <h1 className="text-4xl font-bold font-futura"><span className="text-white">Pegawai ni</span> <span className="px-2 bg-lime -skew-y-2 text-dark-slate">Boss</span></h1>
                <p>Manipulasi aja boss</p>
                <div className="flex items-center justify-center">
                    <table className="text-center">
                        <thead className="text-slate-900 bg-lime">
                            <tr>
                                <th className="px-2 py-1">Id</th>
                                <th className="px-2 py-1">Nama</th>
                                <th className="px-2 py-1">Umur</th>
                                <th className="px-2 py-1">Jabatan</th>
                                <th className="px-2 py-1">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="px-2 py-1">1</td>
                                <td className="px-2 py-1">Test</td>
                                <td className="px-2 py-1">Umur</td>
                                <td className="px-2 py-1">Jabatan</td>
                                <td className="px-2 py-1">
                                    <td className="px-2 py-1">1</td>
                                    <td className="px-2 py-1">1</td>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </div>
        </section>
    )
}
