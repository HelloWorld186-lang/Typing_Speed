import React from 'react';
import logo from '../assets/Logo.svg';
import restart from '../assets/Restart.svg';

function Ui_Ux({
  typingText,
  inputFieldValue,
  timeLeft,
  charIndex,
  mistakes,
  isTyping,
  WPM,
  CPM,
  restartGame,
  Handel_Key,
  Current_Typing
}) {
  return (
    <div className='h-screen w-full bg-special_green py-20 px-12 flex justify-center items-center xs:py-0 xs:px-0'>
      <div className='h-full w-full bg-special_black py-2 px-5 rounded-2xl xs:rounded-none shadow-2xl shadow-special_black flex flex-wrap'>
        <div className='h-1/6 w-full flex justify-evenly items-center'>
          <div className='text-special_green text-xs brightness-75 space-y-1'>
            <img src={logo} alt="" className='h-12 brightness-125' />
            <span className='font-semibold'>TypeRush</span>
          </div>
          <div className='text-white text-xs brightness-75 space-y-1 flex justify-center item-center space-x-2 capitalize'>
          <div className='font-semibold'>{`${isTyping ? 'typing' : 'not typing'}`}</div>
          <div className={`h-2 w-2 rounded-full animate-ping ${isTyping ? 'bg-special_green' : 'bg-special_red'}`}></div>
          </div>
        </div>
        <div className='h-4/6 w-full flex flex-wrap border-b border-white/20'>
          <div className='h-1/6 xl:h-2/6 w-full flex justify-center item-center'>
            <div className='h-full'>
              <div className='uppercase text-white brightness-50 text-sm text-center'>
                timer
              </div>
              <div className='text-white brightness-50 text-5xl text-center tracking-wider'>
                {parseInt(timeLeft)}
              </div>
            </div>
          </div>
          <div className='h-4/6 xl:h-3/6 w-full'>
            <div className='w-full text-center text-white brightness-50 font-semibold p-5 flex flex-wrap justify-center item-center text-md'>
              {typingText}
            </div>
          </div>
          <div className='h-1/6 xl:h-1/6 w-full'>
            <button className='h-1/5 w-full flex justify-center item-center space-x-2 border-none outline-none focus:border-none focus:outline-none' onClick={restartGame}>
              <img src={restart} alt="" className='h-4 brightness-75 hover:rotate-180 transition transition-transform delay-100 duration-200 cursor-pointer' />
              <span className='capitalize text-xs text-white brightness-75'>start over</span>
            </button>
          </div>
        </div>
        <div className='h-1/6 w-full flex justify-evenly items-center'>
          <div className='p-2 text-white brightness-75 capitalize text-xs font-normal'>total time : 60</div>
          <div className='p-2 text-white brightness-75 capitalize text-xs font-normal'>mistakes : {mistakes}</div>
          <div className='p-2 text-white brightness-75 uppercase text-xs font-normal'>wpm : {WPM}</div>
          <div className='p-2 text-white brightness-75 uppercase text-xs font-normal'>cpm : {CPM}</div>
        </div>
      </div>
    </div>
  );
}

export default Ui_Ux;
