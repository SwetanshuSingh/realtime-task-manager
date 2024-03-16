const getAllTasks = async (token, setTasks, setIsLoading) => {
  setIsLoading(true)
  const response = await fetch("/api/tasks/admin/all", {
    headers : {
      'token' : token
    }
  });

  const result = await response.json();
  setIsLoading(false);
  setTasks(result.data);
}

export default getAllTasks;