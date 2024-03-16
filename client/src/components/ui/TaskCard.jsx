/* eslint-disable react/prop-types */
import { useState } from "react";
import getTaskData from "../../utils/getTaskDate";
import { Trash2 } from "lucide-react"
import completeTask from "../../utils/completeUserTasks";
import deleteTask from "../../utils/deleteUserTasks";
import UpdateTaskModal from "../UpdateTaskModal";

const TaskCard = ({ data, setTasks, token }) => {
  
  const [isCompleted, setIsCompleted] = useState(data.completed);

  return (
    <div className="w-[320px] h-[220px] p-3 pt-4 flex flex-col justify-between rounded-md border-2 bg-[#f9f9f9] text-gray-100 bg-opacity-5 border-[#f9f9f9] border-opacity-5">
      <div className=" flex flex-col gap-1">
        <h2 className="text-gray-50 font-semibold text-xl">{data.title}</h2>
        <p className="font-light text-gray-300">{data.description}</p>
      </div>

      <div className="flex flex-col gap-1">
        <h4 className="font-medium ml-2">{getTaskData(data.createdAt)}</h4>
        <div className="flex justify-between items-center">
          <button onClick={() => {completeTask(token, data, setIsCompleted)}} className={`w-fit ${isCompleted ? "bg-green-400" : "bg-red-600"}  px-3 py-1 font-medium rounded-full`}>{isCompleted ? "Completed" : "Incomplete"}</button>
          <span className="flex justify-center items-center gap-3">
            <UpdateTaskModal token={token} setTasks={setTasks} title={data.title} description={data.description} taskId={data.id} />
            <Trash2 onClick={() => {deleteTask(token, data, setTasks)}} className="cursor-pointer hover:scale-125 transition-transform" />
          </span>
        </div>
      </div>
    </div>
  )
}

export default TaskCard;