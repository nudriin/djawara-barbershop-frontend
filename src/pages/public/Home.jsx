import { NavLink } from "react-router-dom";
import PublicLayout from "../../components/PublicLayout";

export default function Home() {
    return (
        <PublicLayout>
            <section className="flex items-center justify-center min-h-screen text-white bg-slate-900">
                <div className="space-y-5 text-center">
                    <h1 className="text-4xl font-bold font-futura"><span className="text-white">Djawara</span> <span className="px-2 bg-lime -skew-y-2 text-dark-slate">Barbershop</span></h1>
                    <p>Get the most professional haircut for you</p>
                    <div className="space-x-4">
                        <button className="p-3 border-2 rounded-xl border-lime hover:shadow-md hover:bg-slate-800">About Us</button>
                        <NavLink to="/booking">
                            <button className="p-3 text-slate-900 rounded-xl bg-lime hover:shadow-md hover:bg-purple hover:text-white">Book Now</button>
                        </NavLink>
                    </div>
                </div>
            </section>
        </PublicLayout>
    )
}
