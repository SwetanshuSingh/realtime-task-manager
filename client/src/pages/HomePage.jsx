import Sidebar from "../components/Sidebar";
import Tasks from "../components/Tasks";

const HomePage = () => {
  return (
    <main className="w-full lg:h-[100vh] min-h-[100vh] bg-[#181818] p-12 flex lg:flex-row lg:justify-between flex-col gap-10 font-0">
      <Sidebar />
      <Tasks />
    </main>
  );
};

export default HomePage;
