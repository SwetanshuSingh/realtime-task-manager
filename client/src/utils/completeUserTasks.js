import toast from "react-hot-toast";

const completeTask = async (token, data, setIsCompleted) => {
  const response = await fetch("/api/tasks/update/status", {
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

export default completeTask;
