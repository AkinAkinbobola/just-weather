import Current from "@/components/Current";
import { Suspense } from "react";

const Home = () => {
  return (
    <main>
      <Suspense>
        <Current />
      </Suspense>
    </main>
  );
};

export default Home;
