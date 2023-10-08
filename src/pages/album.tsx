import { withSessionSsr } from "../lib/withSession";
import "./globals.css";
import Image from "next/image";
import NavBar from "~/app/components/NavBar";
import photo1 from "~/app/components/photo1.jpg";
import photo2 from "~/app/components/photo2.jpg";
import photo3 from "~/app/components/photo3.jpg";
import photo4 from "~/app/components/photo4.jpg";
import photo5 from "~/app/components/photo5.jpg";
import photo6 from "~/app/components/photo6.jpg";
import photo7 from "~/app/components/photo7.jpg";
import photo8 from "~/app/components/photo8.jpg";
import photo9 from "~/app/components/photo9.jpg";
import photo10 from "~/app/components/photo10.jpg";
import photo11 from "~/app/components/photo11.jpg";
import photo12 from "~/app/components/photo12.jpg";
import photo13 from "~/app/components/photo13.jpg";
import photo14 from "~/app/components/photo14.jpg";

interface Props {
  user: string;
  admin: boolean;
}

export default function RSVP({ user, admin }: Props) {
  return (
    <div>
      <NavBar admin={admin} />
      <div className="gallery">
        <Image className="photo" src={photo1} alt="A photo of us" />
        <Image className="photo" src={photo2} alt="A photo of us" />
        <Image className="photo" src={photo3} alt="A photo of us" />
        <Image className="photo" src={photo4} alt="A photo of us" />
        <Image className="photo" src={photo5} alt="A photo of us" />
        <Image className="photo" src={photo6} alt="A photo of us" />
        <Image className="photo" src={photo7} alt="A photo of us" />
        <Image className="photo" src={photo8} alt="A photo of us" />
        <Image className="photo" src={photo9} alt="A photo of us" />
        <Image className="photo" src={photo10} alt="A photo of us" />
        <Image className="photo" src={photo11} alt="A photo of us" />
        <Image className="photo" src={photo12} alt="A photo of us" />
        <Image className="photo" src={photo13} alt="A photo of us" />
        <Image className="photo" src={photo14} alt="A photo of us" />
      </div>
    </div>
  );
}

export const getServerSideProps = withSessionSsr(
  async function getServersideProps({ req, res }) {
    try {
      const user = req.session.user || "";
      console.log(user);
      const admin = req.session.admin || false;
      if (user === "") {
        throw new Error("No user logged in");
      }
      return {
        props: {
          user: user,
          admin: admin,
        },
      };
    } catch (err) {
      console.log("page Home error", err);

      return {
        redirect: {
          destination: "/login",
          statusCode: 307,
        },
      };
    }
  }
);
