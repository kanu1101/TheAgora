import React, { useRef } from 'react'
import PartNavbar from "./PartNavbar"
import ProfileMenu from './profileMenu'

const Navbar = () => {
  const triggerRef = useRef();
  return (
    <div>
      <PartNavbar triggerRef = {triggerRef}/>
      <ProfileMenu triggerRef = {triggerRef}/>
    </div>
  )
}

export default Navbar
