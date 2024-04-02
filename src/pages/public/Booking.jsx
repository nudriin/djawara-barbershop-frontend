import PublicLayout from "../../components/PublicLayout";

export default function Booking() {
    return (
        <PublicLayout>
            <section className="flex items-center justify-center min-h-screen py-24 text-white bg-slate-900">
                <div className="w-9/12 p-6 space-y-5 border bg-slate-900 rounded-xl border-lime">
                    <h1 className="text-4xl text-center font-futura">Book a seat</h1>
                    <form className="grid items-center justify-center grid-cols-12 gap-4 text-white">
                        <div className="col-span-6">
                            <label htmlFor="email" className="text-white">Email</label>
                            <input type="text" id="email" className="w-full p-2 mb-4 border rounded-lg bg-slate-800 border-lime" />
                            <label htmlFor="phone" className="text-white">Phone</label>
                            <input type="text" id="phone" className="w-full p-2 mb-4 border rounded-lg bg-slate-800 border-lime" />
                            <label htmlFor="category" className="text-white">Category</label>
                            <select id="category" className="w-full p-2 border rounded-lg bg-slate-800 border-lime">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                            </select>
                        </div>
                        <div className="col-span-6">
                            <label htmlFor="username" className="text-white">Username</label>
                            <input type="text" id="username" className="w-full p-2 mb-4 border rounded-lg bg-slate-800 border-lime" />
                            <label htmlFor="name" className="text-white">Name</label>
                            <input type="text" id="name" className="w-full p-2 mb-4 border rounded-lg bg-slate-800 border-lime" />
                            <label htmlFor="dates" className="text-white">Dates</label>
                            <select id="dates" className="w-full p-2 border rounded-lg bg-slate-800 border-lime">
                                <option>12-12-2024</option>
                                <option>13-12-2024</option>
                                <option>14-12-2024</option>
                            </select>
                        </div>
                        <label htmlFor="kapsters" className="text-white">Kapster</label>
                        <select id="kapsters" className="w-full col-span-12 p-2 border rounded-lg bg-slate-800 border-lime">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                        </select>
                        <label className="w-full col-span-12 p-2 mt-4 text-center rounded-lg cursor-pointer bg-lime text-slate-900 hover:bg-purple hover:text-white">Book now</label>
                    </form>
                </div>
            </section>
        </PublicLayout>
    )
}
