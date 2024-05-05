import haircutImg from "/images/services/woman-cutting-hair-man-salon.jpg";
import haircutColorImg from "/images/services/hairdresser-grooming-client.jpg";
import washingImg from "/images/services/hairdresser-grooming-their-client.jpg";
import kidsImg from "/images/services/boy-getting-haircut-salon-front-view.jpg";
import PublicLayout from "../../components/PublicLayout";
export default function Service() {
    return (
        <PublicLayout>
            <section className="min-h-screen py-24 text-white bg-slate-900">
                <div className="w-9/12 mx-auto space-y-5">
                    <h1 className="text-4xl font-futura">Layanan</h1>
                    <div className="flex flex-col flex-wrap items-center justify-center gap-4 sm:flex-row">
                        <div className="max-w-sm overflow-hidden text-center hover:bg-purple rounded-2xl bg-lime text-slate-900 hover:text-white">
                            <img src={haircutImg} className="object-cover object-top w-[360px] h-[250px]" />
                            <div className="flex justify-between px-6 py-4">
                                <h1 className="font-bold">Haircut</h1>
                                <h1 className="font-bold">Rp 20.000</h1>
                            </div>
                        </div>
                        <div className="max-w-sm overflow-hidden text-center hover:bg-purple rounded-2xl bg-lime text-slate-900 hover:text-white">
                            <img src={haircutColorImg} className="object-cover object-top w-[360px] h-[250px]" />
                            <div className="flex justify-between px-6 py-4">
                                <h1 className="font-bold">Hair Color</h1>
                                <h1 className="font-bold">Rp 110.000</h1>
                            </div>
                        </div>
                        <div className="max-w-sm overflow-hidden text-center hover:bg-purple rounded-2xl bg-lime text-slate-900 hover:text-white">
                            <img src={washingImg} className="object-cover object-top w-[360px] h-[250px]" />
                            <div className="flex justify-between px-6 py-4">
                                <h1 className="font-bold">Washing</h1>
                                <h1 className="font-bold">Rp 20.000</h1>
                            </div>
                        </div>
                        <div className="max-w-sm overflow-hidden text-center hover:bg-purple rounded-2xl bg-lime text-slate-900 hover:text-white">
                            <img src={kidsImg} className="object-cover object-top w-[360px] h-[250px]" />
                            <div className="flex justify-between px-6 py-4">
                                <h1 className="font-bold">Kids</h1>
                                <h1 className="font-bold">Rp 15.000</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    )
}
