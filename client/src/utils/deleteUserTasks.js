import toast from "react-hot-toast";

const deleteTask = async (token, data, setTasks) => {
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
};

export default deleteTask;
