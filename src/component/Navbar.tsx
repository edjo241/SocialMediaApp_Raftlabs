import { useState } from "react";

const Nav = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  const handleToggle = () =>{
    setToggleMenu(!toggleMenu)
  }

  return (
    <header>
      <div className="px-4 py-2 text-white flex  justify-between bg-blue-900">
        <h1>LOGO</h1>
        <div className={toggleMenu ? "md:flex  md:pt-0 pt-10 w-full md:w-auto" : "hidden md:flex"} id="menu">
        <ul>
          <li className="md:inline-block cursor-pointer hover:text-gray-500 border-b md:border-none py-2 px-3"></li>
          <li className="dropdown md:inline-block cursor-pointer hover:text-gray-500 border-b md:border-none py-2 px-3 relative"><a></a></li> 
          <li className="md:inline-block cursor-pointer hover:text-gray-500 border-b md:border-none py-2 px-3"></li>
          <li className="md:inline-block cursor-pointer hover:text-gray-500 border-b md:border-none py-2 px-3">Profile</li>
        </ul>
        </div>
        <div className= "cursor-pointer md:hidden">
          <input className="menu-btn hidden" type="checkbox" id="menu-btn"/>
          <label className="menu-icon block cursor-pointer md:hidden px-2 py-4 relative select-none" >
            <span onClick={handleToggle} className="navicon bg-white-darkest flex items-center relative"></span>
          </label>
      </div>
      </div>
    </header>
  )
};

export default Nav;

