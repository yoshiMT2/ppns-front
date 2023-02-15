export const Loader = () => {
  return (
    <div className='grid h-screen place-items-center'>
      <div className="flex justify-center">
        <span className="circle animate-loader"></span>
        <span className="circle animate-loader animation-delay-200"></span>
        <span className="circle animate-loader animation-delay-400"></span>
      </div>
    </div>

  )
}

