/* eslint-disable react/prop-types */
import { useState } from "react";
import getTaskData from "../../utils/getTaskDate";
import { Trash2, Loader } from "lucide-react"
import toast from "react-hot-toast";
import AdminUpdateModal from "../AdminUpdateModal";

const AdminTaskCard = ({ data, setTasks, token }) => {
  
  const [isCompleted, setIsCompleted] = useState(data.completed);
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteTask = async (token, data, setTasks, isDeleting, setIsDeleting) => {
    try {
      if(isDeleting){
        return
      }
      setIsDeleting(true)
      const response = await fetch("/api/tasks/admin/delete", {
        method: "GET",
        headers: {
          token: token,
          taskid: data.id,
        },
      });
    
      const result = await response.json();
      if (response.status === 200) {
        setTasks((prev) => {
          return prev.filter((task) => task.id !== result.data.id);
        });
      } else {
        toast.error(result.error);
      }
  
    } catch (error) {
      toast.error("Internal Server Error")
    } finally {
      setIsDeleting(false)
    }
  };

  const completeTask = async (token, data, setIsCompleted) => {
    const response = await fetch("/api/tasks/admin/update/status", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify({ taskId: data.id, isCompleted: !data.completed }),
    });
  
    const result = await response.json();
    if (response.status === 200) {
      setIsCompleted(result.data.completed);
    } else {
      toast.error(result.error);
    }
  };

  return (
    <div className="w-[320px] h-[220px] p-3 pt-4 flex flex-col justify-between rounded-md border-2 bg-[#f9f9f9] text-gray-100 bg-opacity-5 border-[#f9f9f9] border-opacity-5">
      <div className=" flex flex-col gap-1">
        <h2 className="text-gray-50 font-semibold lg:text-xl">{data.title}</h2>
        <p className="font-light text-gray-300">{data.description}</p>
      </div>

      <div className="flex flex-col gap-1">
        <h4 className="font-medium ml-2">{getTaskData(data.createdAt)}</h4>
        <div className="flex justify-between items-center">
          <button onClick={() => {completeTask(token, data, setIsCompleted)}} className={`w-fit ${isCompleted ? "bg-green-400" : "bg-red-600"}  px-3 py-1 font-medium rounded-full text-sm lg:text-base`}>{isCompleted ? "Completed" : "Incomplete"}</button>
          <span className="flex justify-center items-center gap-3">
            <AdminUpdateModal token={token} setTasks={setTasks} title={data.title} description={data.description} taskId={data.id} />
            { isDeleting ? <Loader className="animate-spin" /> : <Trash2 onClick={() => {deleteTask(token, data, setTasks, isDeleting, setIsDeleting)}} className="cursor-pointer hover:scale-125 transition-transform" /> }
          </span>
        </div>
        <p className="text-gray-300 text-xs ml-2">Author : {data?.user?.username}</p>
      </div>
    </div>
  )
}

export default AdminTaskCard;