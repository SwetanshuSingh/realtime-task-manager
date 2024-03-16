const getUserTasks = async (token, setTasks, setIsLoading) => {
  setIsLoading(true)
  const response = await fetch("/api/tasks/all", {
    headers : {
      'token' : token
    }
  });

  const result = await response.json();
  setIsLoading(false);
  setTasks(result.data);
}

export default getUserTasks;