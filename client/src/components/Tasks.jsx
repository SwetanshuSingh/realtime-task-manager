export const Tasks = () => {
  return (
    <section className=" w-full h-full flex flex-col gap-5 bg-[#212121] rounded-xl border-2 border-[#f9f9f9] border-opacity-5 px-8 py-6">
      <h2 className="font-semibold text-white font-mono text-3xl relative">
        All Tasks
        <span className="absolute top-9 left-0 w-16 h-1 bg-green-500 rounded-full"></span>
      </h2>

      <div className="all-tasks w-full h-full">

      </div>
    </section>
  )
}

export default Tasks;