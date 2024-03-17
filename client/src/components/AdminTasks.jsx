import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import { Loader } from "lucide-react"
import getAllTasks from "../utils/getAllTasks";
import AdminTaskCard from "./ui/AdminTaskCard";
import { SocketContext } from "../context/SocketContextProvider";

export const AdminTasks = () => {

  const { auth } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  
  useEffect(() => {
    getAllTasks(auth.token, setTasks, setIsLoading);
  }, [])

  return (
    <section className=" w-full h-full flex flex-col gap-5 bg-[#212121] rounded-xl border-2 border-[#f9f9f9] border-opacity-5 px-8 py-6">
      <div className="w-full flex justify-between">
        <h2 className="font-medium text-white lg:text-3xl relative">
          All Tasks
          <span className="absolute top-9 left-0 w-20 h-1 bg-green-500 rounded-full"></span>
        </h2>
      </div>

      <div className="all-tasks w-full h-full flex flex-row items-justify gap-5 flex-wrap overflow-y-scroll">

        {isLoading ? <div className="w-full h-full flex justify-center items-center"><Loader size={40} className="animate-spin text-white" /></div> : null}

        {tasks && tasks.map((task) => {
          return <AdminTaskCard key={task.id} data={task} setTasks={setTasks} token={auth.token} />
        })}

      </div>
    </section>
  )
}

export default AdminTasks;