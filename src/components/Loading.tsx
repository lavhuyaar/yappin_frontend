import Footer from "./Footer";
import Header from "./Header";

const Loading = () => {
  return (
    <>
      <Header />
      <main className="w-full h-[80vh] flex flex-col items-center justify-center gap-3 !p-3">
        <div className="loader"></div>
        <h4 className="font-semibold text-xl text-text-primary text-center">
          Loading... This might take a few minutes!
        </h4>
      </main>
      <Footer />
    </>
  );
};
export default Loading;
