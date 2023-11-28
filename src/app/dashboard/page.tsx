"use client"

import React from 'react'
import { useUser } from '@/store/zustand';

const Dashboard = () => {

  const { user } = useUser();

  return (
    <div className='layout flex justify-center items-center'>
      <h1 className='text-black text-xl font-bold'>Bienvenido {user?.name}</h1>
    </div>
  )
}

export default Dashboard