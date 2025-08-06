import Head from "next/head";
import SearchForm from "../components/SearchForm";

export default function Home() {
  return (
    <>
      <Head>
        <title>Vacayly – Find Cheap Flights Fast</title>
        <meta name="description" content="Search and compare flight deals across airlines in real-time." />
      </Head>
      <main className="min-h-screen bg-white text-gray-800">
        <div className="max-w-4xl mx-auto p-6">
          <h1 className="text-4xl font-bold text-vacayGreen mb-6">Welcome to Vacayly</h1>
          <p className="mb-8 text-lg">Plan your next adventure with real-time flight data and the best prices online.</p>
          <SearchForm />
        </div>
      </main>
    </>
  );
}
