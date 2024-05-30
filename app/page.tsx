import Current from "@/components/Current";

export type searchParamsType = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};
const Home = ({ searchParams }: searchParamsType) => {
  const search =
    typeof searchParams.search === "string" ? searchParams.search : undefined;
  return (
    <main>
      <Current searchParams={search} />
    </main>
  );
};

export default Home;
