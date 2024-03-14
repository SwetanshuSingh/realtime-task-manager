import { useContext, useEffect, useState } from "react";
import TaskCard from "./ui/TaskCard";
import { AuthContext } from "../context/AuthContextProvider";

const getUserTasks = async (token, setTasks) => {
  const response = await fetch("/api/tasks/all", {
    headers : {
      'token' : token
    }
  });

  const result = await response.json();
  setTasks(result.data);
}

export const Tasks = () => {

  const { auth } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getUserTasks(auth.token, setTasks);
  }, [])

  return (
    <section className=" w-full h-full flex flex-col gap-5 bg-[#212121] rounded-xl border-2 border-[#f9f9f9] border-opacity-5 px-8 py-6">
      <h2 className="font-medium text-white text-3xl relative">
        All Tasks
        <span className="absolute top-9 left-0 w-16 h-1 bg-green-500 rounded-full"></span>
      </h2>

      <div className="all-tasks w-full h-full flex flex-row items-justify gap-5 flex-wrap overflow-y-scroll">
        {tasks && tasks.map((task) => {
          return <TaskCard key={task.id} data={task} />
        })}
      </div>
    </section>
  )
}

export default Tasks;