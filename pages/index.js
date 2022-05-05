import Link from 'next/link'
import React from 'react'

export default function Landing() {
  return (
    <>

       <h1 >
          Welcome to Task Manager
      </h1>
      <div>
        <Link href="/task/home"><a><button>HOME</button></a></Link>
      </div>
      </>
  )
}
