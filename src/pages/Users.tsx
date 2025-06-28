import Footer from "../components/Footer";
import Header from "../components/Header";
import useAuth from "../hooks/useAuth";
import PageNotFound from "./PageNotFound";

const Users = () => {
  const { userData } = useAuth();

  if (!userData) return <PageNotFound />;

  return (
    <>
      <Header />
      <main className="text-text-primary">Users</main>
      <Footer />
    </>
  );
};
export default Users;
