import Assets from "@/Assets/Assets";


export default function AboutHeader() {
  return (
    <div className={`py-40 bg-gree-200 bg-transparent  text-center flex flex-col items-center justify-center gap-10`}>
            <div className="bg fixed top-0 left-0 -z-10 ">
                <img src={Assets.WaterDrops} alt="dw" />
            </div>
            <div  className='no-scrollbar text-7xl font-semibold mx-auto'>
            <h2 className=' text-white'>About Us</h2>
            <span className='text-white text-xs'>Home &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span className='text-red-500'>//</span> &nbsp;&nbsp;&nbsp;&nbsp; About Us</span>
            </div>
        </div>
  )
}
