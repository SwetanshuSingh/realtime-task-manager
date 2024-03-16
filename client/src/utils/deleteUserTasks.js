const deleteTask = async (token, data, setTasks) => {
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

export default deleteTask;