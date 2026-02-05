const Register = () => {
  return (
    <div className="flex justify-center">
      <form className="border border-solid flex flex-col justify-center w-[35%] items-center p-8 gap-4 h-125 m-[4rem] rounded">
        <div className="text-2xl font-bold">Register</div>
        <input 
        className="w-[60%] border border-solid p-1"
        type="text" 
        placeholder="username"
        />
        <input
        type="password"
        placeholder="password"
        className="w-[60%] border border-solid p-1"
        />
        <button className="border border-solid w-[30%] rounded hover:bg-gray-400 hover:text-white cursor-pointer hover:border-black">Sign Up</button>
      </form>  
    </div>
  )
}

export default Register