import Head from 'next/head'
import Home from './home'

export default function HomePage({posts}) {
  
  return (
    <div>
      <Home posts = {posts}/>
    </div>
  )
}

const fetcher = (url) => fetch(url).then((r) => r.json());
export const getStaticProps = async () => {
    const data = fetcher("http://localhost:4000/api/posts")

  const posts = await data

  return {
    props: {
      posts,
    },
  };
};