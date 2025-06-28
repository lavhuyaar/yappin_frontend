import Footer from "../components/Footer";
import Header from "../components/Header";

const PageNotFound = () => {
  return (
    <>
      <Header />
      <main className="justify-center mx-auto flex">
        <h1 className="text-8xl font-black text-center text-primary">404</h1>
        <h3 className="text-2xl text-center text-primary">Page not found!</h3>
      </main>
      <Footer />
    </>
  );
};

export default PageNotFound;
