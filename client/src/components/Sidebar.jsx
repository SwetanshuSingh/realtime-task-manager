import { useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import { LogOut } from "lucide-react"
import { Link, useNavigate } from "react-router-dom";
import handleSignOut from "../utils/handleSignOut";

const Sidebar = () => {
    const navigate = useNavigate();
    const { auth, setAuth } = useContext(AuthContext);

    return (
        <section className="lg:w-72 lg:h-full flex flex-col gap-2 lg:justify-between px-8 py-6 bg-[#212121] rounded-xl border-2 border-[#f9f9f9] border-opacity-5">
            <div className="w-full lg:flex lg:flex-row justify-between items-start heading">
                <div className="lg:w-8 lg:h-8 bg-gradient-to-br from-indigo-400 rounded-full"></div>
                <h2 className="text-white lg:text-xl overflow-hidden">{auth?.username}</h2>
            </div>
            {auth?.role === "admin" ? (<div className="lg:text-center text-gray-100">
                <Link to="/home">
                    <h3 className="hover:bg-[#f9f9f9] hover:bg-opacity-5 cursor-pointer p-2 rounded-lg">My Tasks</h3>
                </Link>
                <Link to="/admin">
                    <h3 className="hover:bg-[#f9f9f9] hover:bg-opacity-5 cursor-pointer p-2 rounded-lg">All Tasks</h3>
                </Link>
            </div>) : null}
            
            <LogOut onClick={() => {handleSignOut(setAuth, navigate)}} className="text-white cursor-pointer" />
        </section>
    )
}

export default Sidebar;