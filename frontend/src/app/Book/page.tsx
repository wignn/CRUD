import BookCreate from "../components/Book/BookCreate"

export default function page (){

    return (
        <div className="flex min-h-screen w-f bg-gray-100" style={{
            backgroundImage: `url('/bg.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
          }}><BookCreate className="m-4"/></div>
        
    )
}