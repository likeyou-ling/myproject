import { httpRequest } from '@/utils'
import React, { useEffect } from 'react'

export default function Layout() {
  useEffect(() => {
    httpRequest.get('/user/profile');
  }, [])
  return (
    <div></div>
  )
}
