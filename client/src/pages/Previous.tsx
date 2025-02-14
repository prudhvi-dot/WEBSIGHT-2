import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import CallList from "../components/CallList";

const Previous = () => {
  return (
    <main>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <section className="flex items-center min-h-screen flex-1 flex-col px-6 bg-white pb-6 pt-18 max-md:pb-14 sm:px-14 max-md:ml-[5rem]">
          <section className="flx size-full flex-col gap-10 text-black">
            <h1 className="text-3xl font-blod">Previous</h1>
            <CallList type="ended" />
          </section>
        </section>
      </div>
    </main>
  );
};

export default Previous;
