import Current from "@/components/Current";
import { Suspense } from "react";

const Home = () => {
  return (
    <main className={"grid grid-cols-12"}>
      <Suspense>
        <Current />
      </Suspense>
    </main>
  );
};

export default Home;
