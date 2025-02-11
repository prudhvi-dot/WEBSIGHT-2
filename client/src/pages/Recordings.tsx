import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Recordings = () => {
  return (
    <main>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px-14">
          <section className="flx size-full flex-col gap-10 text-white">
            <h1 className="text-3xl font-blod">Recordings</h1>
          </section>
        </section>
      </div>
    </main>
  );
};

export default Recordings;
