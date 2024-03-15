import { useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import { LogOut } from "lucide-react"

const Sidebar = () => {

    const { auth } = useContext(AuthContext);

    return (
        <section className="w-72 h-full flex flex-col justify-between px-8 py-6 bg-[#212121] rounded-xl border-2 border-[#f9f9f9] border-opacity-5">
            <div className="w-full flex justify-between items-center heading">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-400 rounded-full"></div>
                <h2 className="text-white text-2xl">Swetanshu</h2>
            </div>
            <LogOut className="text-white cursor-pointer" />
        </section>
    )
}

export default Sidebar;