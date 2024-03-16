import toast from "react-hot-toast";

const deleteTask = async (token, data, setTasks, isDeleting, setIsDeleting) => {
  try {
    if(isDeleting){
      return
    }
    setIsDeleting(true)
    const response = await fetch("/api/tasks/delete", {
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

export default deleteTask;
