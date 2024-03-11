import React from 'react'
import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <div>
      <div className='flex w-full justify-around bg-[#001f50] py-10 text-white text-xl font-bold'>
        <NavLink to={'/mongodbcrud'}> MongoDB </NavLink>
       <NavLink to={'/jsonserver'}> JSON server </NavLink>
       <NavLink to={'/firebasecrud'}> Firebase </NavLink>
       <NavLink to={'/mysqlcrud'}> MySQL  </NavLink>
    </div>
    </div>
  )
}

export default Navbar
