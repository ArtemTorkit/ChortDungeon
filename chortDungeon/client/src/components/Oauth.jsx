import React from 'react'
import google from '../assets/google.svg'

const Oauth = () => {
  return (
    <div className='w-full h-full flex flex-col justify-center items-center gap-4'>
          <h1 className='text-[40px] sm:text-6xl max-w-[500px] text-center'>Let’s start the Chortkiv journej!</h1>
          <a a href="http://localhost:5000/auth/google"S className="button max-w-[500px] text-center py-[5px] px-[5px] mx-4">
              <div className="w-full h-full">
                  <div className="header-logo flex gap-6 justify-center items-center w-full h-full relative px-4">
                      <div className="background-net w-full h-full"></div>
                      <div className="border net-top button-element">
                          <img src={google} alt="Chort is watching!" className='cursor-pointer'/>
                      </div>
                      <div className="border text-2xl net-top button-element">
                          <p className='sm:text-3xl  block px-2 sm:px-4 py-2 sm:py-3 cursor-pointer'>Google Login/Register</p>
                      </div>
                  </div>
              </div>
          </a>
    </div>
  )
}

export default Oauth
