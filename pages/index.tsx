import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'

import Layout from "../components/layout"

export default function Home() {
  return (
    <>
      <Head>
        <title>Moobility</title>
        <meta name="description" content="Moobility app for 2023 hackathon" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main>
      <Layout>
        <h1>NextAuth.js Example</h1>
      <p>
        This is an example site to demonstrate how to use{" "}
        <a href="https://next-auth.js.org">NextAuth.js</a> for authentication.
      </p>
    </Layout>
    </main>
  </>
  )
}
