import { useContext, useEffect, useState } from "react";
import TaskCard from "./ui/TaskCard";
import { AuthContext } from "../context/AuthContextProvider";
import getUserTasks from "../utils/getUserTasks";
import NewTaskModal from "./NewTaskModal";
import { Loader } from "lucide-react"

export const Tasks = () => {

  const { auth } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  
  useEffect(() => {
    getUserTasks(auth.token, setTasks, setIsLoading);
  }, [])

  return (
    <section className=" w-full h-full flex flex-col gap-5 bg-[#212121] rounded-xl border-2 border-[#f9f9f9] border-opacity-5 px-8 py-6">
      <div className="w-full flex justify-between">
        <h2 className="font-medium text-white text-3xl relative">
          Your Tasks
          <span className="absolute top-9 left-0 w-20 h-1 bg-green-500 rounded-full"></span>
        </h2>
        <NewTaskModal token={auth.token} setTasks={setTasks} />
      </div>

      <div className="all-tasks w-full h-full flex flex-row items-justify gap-5 flex-wrap overflow-y-scroll">

        {isLoading ? <div className="w-full h-full flex justify-center items-center"><Loader size={40} className="animate-spin text-white" /></div> : null}

        {tasks && tasks.map((task) => {
          return <TaskCard key={task.id} data={task} setTasks={setTasks} token={auth.token} />
        })}

      </div>
    </section>
  )
}

export default Tasks;