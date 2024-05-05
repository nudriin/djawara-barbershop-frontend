import PublicLayout from "../../components/PublicLayout";
import vintageImg from "/images/vintage-chair-barbershop.jpg";

export default function Pricelist() {
    return (
        <PublicLayout>
            <section className="min-h-screen py-24 text-white bg-slate-900">
                <div className="w-9/12 mx-auto space-y-5">
                    <h1 className="mb-20 text-4xl font-futura">Pricelist</h1>
                    <div className="grid items-center justify-center grid-cols-12 gap-4">
                        <div className="col-span-7">
                            <ul className="space-y-4">
                                <li className="text-xl font-bold">
                                    <span className="flex justify-between">
                                        <p>Haircut</p>
                                        <p className="px-2 py-1 bg-lime text-slate-900 rounded-xl">Rp 20.000</p>
                                    </span>
                                </li>
                                <li className="text-xl font-bold">
                                    <span className="flex justify-between">
                                        <p>Beard Trim</p>
                                        <p className="px-2 py-1 bg-lime text-slate-900 rounded-xl">Rp 10.000</p>
                                    </span>
                                </li>
                                <li className="text-xl font-bold">
                                    <span className="flex justify-between">
                                        <p>Razor Cut</p>
                                        <p className="px-2 py-1 bg-lime text-slate-900 rounded-xl">Rp 20.000</p>
                                    </span>
                                </li>
                                <li className="text-xl font-bold">
                                    <span className="flex justify-between">
                                        <p>Shaves</p>
                                        <p className="px-2 py-1 bg-lime text-slate-900 rounded-xl">Rp 10.000</p>
                                    </span>
                                </li>
                                <li className="text-xl font-bold">
                                    <span className="flex justify-between">
                                        <p>Styling</p>
                                        <p className="px-2 py-1 bg-lime text-slate-900 rounded-xl">Rp 10.000</p>
                                    </span>
                                </li>
                            </ul>
                        </div>
                        <div className="relative flex items-center justify-center col-span-5">
                            <label className="absolute rounded-xl h-[250px] w-[360px] z-0 bg-lime"> </label>
                            <img src={vintageImg} className="rounded-xl h-[250px] w-[360px] skew-y-6" />
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    )
}
