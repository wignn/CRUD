import BooksEdite from "@/app/components/admin/Dasboard";
import SideBar from "@/app/components/admin/SideBar";

interface SearchParams {
  query?: string;
}

const Page = async ({ searchParams }: { searchParams?: SearchParams }) => {
  const query = searchParams?.query || "";
  console.log(`Query: ${query}`);

  return (
    <div className="flex min-h-screen bg-gray-100" style={{
      backgroundImage: `url('/bg.jpg')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundAttachment: "fixed",
    }}>
      <SideBar>
        <BooksEdite query={query} />
      </SideBar>
    </div>
  );
};

export default Page;
