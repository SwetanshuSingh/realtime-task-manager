/* eslint-disable react/prop-types */
import getTaskData from "../../utils/getTaskDate";
import { FilePenLine, Trash2 } from "lucide-react"

const TaskCard = ({ data, setTasks, token }) => {
  
  const deleteTask = async () => {
    const response = await fetch("/api/tasks/delete", {
      method : "GET", 
      headers : {
        "token" : token,
        "taskid" : data.id
      }
    });
    
    const result = await response.json();
    setTasks((prev) => {
      return prev.filter((task) => task.id !== result.data.id)
    })
  }

  return (
    <div className="w-[320px] h-[220px] p-3 pt-4 flex flex-col justify-between rounded-md border-2 bg-[#f9f9f9] text-gray-100 bg-opacity-5 border-[#f9f9f9] border-opacity-5">
      <div className=" flex flex-col gap-1">
        <h2 className="text-gray-50 font-semibold text-xl">{data.title}</h2>
        <p className="font-light">{data.description}</p>
      </div>

      <div className="flex flex-col gap-1">
        <h4 className="font-medium ml-2">{getTaskData(data.createdAt)}</h4>
        <div className="flex justify-between items-center">
          <button className="w-fit bg-red-600 px-3 py-1 font-medium rounded-full">Incomplete</button>
          <span className="flex justify-center items-center gap-3">
            <FilePenLine className="cursor-pointer hover:scale-125 transition-transform" />
            <Trash2 onClick={deleteTask} className="cursor-pointer hover:scale-125 transition-transform" />
          </span>
        </div>
      </div>
    </div>
  )
}

export default TaskCard;