import Header from "../components/Header";
import Banner from "../components/Banner";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Header />
      <Banner />
      <Footer />
    </main>
  );
}