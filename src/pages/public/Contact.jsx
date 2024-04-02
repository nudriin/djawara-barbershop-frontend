import PublicLayout from "../../components/PublicLayout";

export default function Contact() {
    return (
        <PublicLayout>
            <section className="min-h-screen py-24 text-white bg-slate-900">
                <div className="w-9/12 mx-auto space-y-5">
                    <h1 className="mb-20 text-4xl text-center font-futura">Say Hello</h1>
                    <div className="grid items-center justify-center grid-cols-12 gap-4">
                        <div className="col-span-6 space-y-2">
                            <h1 className="text-3xl font-bold text-purple">Contact Information</h1>
                            <p className="text-lg">(+62) 81549193834 <br /> djawara@mail.com</p>
                        </div>
                        <div className="relative flex items-center justify-center col-span-6">
                            <label className="absolute rounded-xl h-[250px] w-[360px] z-0 skew-y-6 bg-purple"> </label>
                            <div className="rounded-xl text-slate-900 h-[250px] w-[360px] z-0 gap-2 bg-lime flex-col text-center flex items-center justify-center">
                                <p className="text-3xl font-futura">OPEN DAILY</p>
                                <p className="font-bold text-purple">10 : 00 - 22 : 00</p>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    )
}
