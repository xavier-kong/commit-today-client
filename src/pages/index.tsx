import { type NextPage } from "next";
import Head from "next/head";

import { api } from "~/utils/api";

const Home: NextPage = () => {
  const status = api.fetchStatus.fetchStatus.useQuery();

  return (
    <>
      <Head>
        <title>Commit Today?</title>
        <meta name="description" content="Did I?" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          </div>
          <p className="text-2xl text-white">
            {status.data?.status ? "Yes" : "No"}
          </p>
        </div>
      </main>
    </>
  );
};

export default Home;
