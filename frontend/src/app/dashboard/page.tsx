import Dashboard from "../components/Landing/dashboard";


interface SearchParams {
  query?: string;
}

const Dash = async ({ searchParams }: { searchParams?: SearchParams }) => {
  const query = searchParams?.query || "";
  console.log(`Query: ${query}`);

  return (
    <div>
     
      <Dashboard query={query} /></div>
  );
};

export default Dash;
