import getTaskData from "../../utils/getTaskDate";

/* eslint-disable react/prop-types */
const TaskCard = ({ data }) => {

  return (
    <div className="w-[320px] h-[220px] p-3 pt-4 flex flex-col justify-between rounded-md border-2 bg-[#f9f9f9] text-gray-100 bg-opacity-5 border-[#f9f9f9] border-opacity-5">
      <div className=" flex flex-col gap-1">
        <h2 className="text-gray-50 font-semibold text-xl">{data.title}</h2>
        <p className="font-light">{data.description}</p>
      </div>

      <div className="flex flex-col gap-1">
        <h4 className="font-medium ml-2">{getTaskData(data.createdAt)}</h4>
        <button className="w-fit bg-red-600 px-3 py-1 font-medium rounded-full">Incomplete</button>
      </div>
    </div>
  )
}

export default TaskCard;