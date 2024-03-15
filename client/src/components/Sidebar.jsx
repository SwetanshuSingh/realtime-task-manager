import { useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import { LogOut } from "lucide-react"
import { useNavigate } from "react-router-dom";
import handleSignOut from "../utils/handleSignOut";

const Sidebar = () => {
    const navigate = useNavigate();
    const { auth, setAuth } = useContext(AuthContext);

    return (
        <section className="w-72 h-full flex flex-col justify-between px-8 py-6 bg-[#212121] rounded-xl border-2 border-[#f9f9f9] border-opacity-5">
            <div className="w-full flex justify-between items-start heading">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-400 rounded-full"></div>
                <h2 className="text-white text-xl overflow-hidden">{auth?.username}</h2>
            </div>
            <LogOut onClick={() => {handleSignOut(setAuth, navigate)}} className="text-white cursor-pointer" />
        </section>
    )
}

export default Sidebar;