import BooksEdite from "./AdminDasboard";
import Search from "../components/searchBook";
interface SearchParams {
  query?: string;
}

const Page = async ({ searchParams }: { searchParams?: SearchParams }) => {
  const query = searchParams?.query || "";
  console.log(`Query: ${query}`);

  return (
    <div>
      <BooksEdite query={query} /></div>
  );
};

export default Page;
