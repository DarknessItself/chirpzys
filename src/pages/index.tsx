import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { SignIn, SignInButton, useUser, UserButton, SignOutButton } from '@clerk/nextjs'

import { api } from "~/utils/api";

const Home: NextPage = () => {
  
  // get data
  const {data, isLoading} = api.posts.getAll.useQuery();
  if(!data || isLoading) return <div>Loading...</div>
  if(!data) return <div>Something went wrong</div>


  // To check if user is authenticated or not 
  const user = useUser();

  return (
    <>
      <Head>
        <title>eMoji Twitter </title>
        <meta name="description" content="Emoji Twitter made with love with tRPC, prisma, planetscale and NextJS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen items-center justify-center">
        <div className="w-full h-full border-x border-slate-400 md:max-w-2xl">
        
            <div className="border-b border-slate-400 p-4">
              <h1> Please Sign in: </h1>
              {!user.isSignedIn && <div className="flex justify-center"><SignInButton /></div>}
              {!!user.isSignedIn && <div className="flex justify-center"><SignOutButton /></div>}
                
            </div>
            <div className="flex flex-col">
              {[...data, ...data]?.map((post) => (
                <div className="border-b border-slate-400 p-8" key={post.id} >{post.content}</div>
              ))}
            </div>
        </div>
        
          
          
        
      </main>
    </>
  );
};

export default Home;
