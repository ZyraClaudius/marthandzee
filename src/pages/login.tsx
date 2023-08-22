import { FormEvent, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { withSessionSsr } from "../lib/withSession";

interface Props {
  user: string;
}

export default function Login({ user }: Props) {
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user) {
      router.push({ pathname: "/" });
    }
  }, [router, user]);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!emailRef.current) return;

    const email = emailRef.current.value;
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      };
      const response = await fetch("/api/login", options);
      if (response.status !== 200) {
        throw new Error("Can't login");
      }
      router.push({ pathname: "/" });
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div>
      <form onSubmit={login}>
        <input type="text" ref={emailRef} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export const getServerSideProps = withSessionSsr(
  async function getServersideProps({ req, res }) {
    try {
      const user = req.session.user || "";

      return {
        props: {
          user,
        },
      };
    } catch (err) {
      console.log(err);

      return {
        redirect: {
          destination: "/login",
          statusCode: 307,
        },
      };
    }
  }
);
