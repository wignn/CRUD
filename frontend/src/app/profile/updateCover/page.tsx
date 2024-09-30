import { UpdateCover } from "@/app/components/profile/UpdateProfileImage";

export default function page (){

    return (
        <div className="h-full"
        style={{
          backgroundImage: `url('/bg.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      ><UpdateCover/></div>
        
    )
}