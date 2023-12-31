import { FormEvent, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { withSessionSsr } from "../lib/withSession";
import hash from '../lib/hash'
import './globals.css'

interface Props {
  user: string
}

export default function Login({ user }: Props) {
  const router = useRouter();
  const nameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user) {
      router.push({ pathname: "/" });
    }
  }, [router, user]);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!nameRef.current) return;
    if (!passwordRef.current) return;

    const name = nameRef.current.value;
    const password = passwordRef.current.value;
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name, password: hash(password)}),
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
    <div className="page">
      <form onSubmit={login}>
        <label htmlFor="emailField">Name</label>
        <input id="emailField" type="text" ref={nameRef} />
        <br></br>
        <label htmlFor="passwordField">Password</label>
        <input id="passwordField" type="password" ref={passwordRef} />
        <br></br>
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
