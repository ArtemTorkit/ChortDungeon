import React from 'react'

const StyleSystem = () => {
  return (
    <div>
          <h1 className='text-4xl vt text-txt'>STYLE SYSTEM</h1>
          <br />
          <div className="border-container w-40 h-40 p-4 text-center">Border container</div>
          <br />
          <div className="side-border-container w-40 h-40 p-4 text-center">Side border container</div>
          <br />
          <div className="border w-40 h-40 p-4 text-center">Regular border container</div>
          <br />
          {/* header logo with net */}
          <div className="side-border-container max-w-[300px] text-center py-[5px] px-[5px]">
              <div className="w-full h-full">
                  <div className="header-logo flex gap-6 justify-center items-center w-full h-full relative">
                      <div className="background-net w-full h-full"></div>
                      <div className="border net-top">
                          <img src={logo} alt="Chort is watching!" />
                      </div>
                      <div className="border text-2xl net-top">
                          <p className='text-3xl block px-4 py-3'>MENU.exe</p>
                      </div>
                  </div>
              </div>
          </div>
          <div className="side-border-container max-w-[500px] text-center py-[5px] px-[5px]">
              <div className="w-full h-full">
                  <div className="header-logo flex gap-6 justify-center items-center w-full h-full relative">
                      <div className="background-net w-full h-full"></div>
                      <div className="border net-top">
                          <img src={logo} alt="Chort is watching!" />
                      </div>
                      <div className="border text-2xl net-top">
                          <p className='text-3xl block px-4 py-3'>MENU.exe</p>
                      </div>
                      <div className="border text-2xl net-top">
                          <p className='text-3xl block px-4 py-3'>MENU.exe</p>
                      </div>
                  </div>
              </div>
          </div>
          <br />
          <button className='max-w-[250px] text-2xl'>BUTTON</button>
    </div>
  )
}

export default StyleSystem
