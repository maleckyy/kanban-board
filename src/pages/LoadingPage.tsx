import Loader from '@/styled-components/LoadingTitle'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'

export default function LoadingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/app");
    }, 3000);

    return () => clearTimeout(timer);
  }, [])

  return (
    <section className='w-full h-screen flex justify-center items-center'>
      <Loader></Loader>
    </section>
  )
}
