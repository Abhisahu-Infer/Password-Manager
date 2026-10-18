import React from 'react'

const Navbar = () => {
  return (
    <nav className="bg-slate-800 text-white">
      <div className="mycontainer flex justify-between items-center py-5 px-5 h-14">
        <div className="logo font-bold flex justify-center text-2xl">
          <span className='text-green-500'>&lt;</span>
          Pass  
          <span className='text-green-500'>Pro/&gt;</span>
          </div>
        {/* <ul>
          <li className="flex gap-4">
            <a className="hover:font-bold mx-2" href="/">
              Home
            </a>
            <a className="hover:font-bold mx-2" href="#">
              About
            </a>
            <a className="hover:font-bold mx-2" href="#">
              Contact
            </a>
          </li>
        </ul> */}
        <button className='w-22 h-8 z-2 flex justify-center items-center gap-1 bg-green-700 rounded-full'>
          <img className='w-6 h-6 invert' src="/Git.svg" alt="" />
          <span>Github</span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar