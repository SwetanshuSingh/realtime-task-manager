const getUserTasks = async (token, setTasks) => {
  const response = await fetch("/api/tasks/all", {
    headers : {
      'token' : token
    }
  });

  const result = await response.json();
  setTasks(result.data);
}

export default getUserTasks;