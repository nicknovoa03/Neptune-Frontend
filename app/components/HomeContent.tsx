import Image from 'next/image'
import logo from '@/app/public/NeptuneLogo.png'

const HomeContent = () => {
  return (
    <div className="flex flex-col items-center justify-between py-4 max-w-screen min-h-[90vh] overflow-y-hidden ">
      <div className="mt-80">
        <Image
          className="opacity-60 grayscale"
          src={logo} // Update this path to the actual path of your logo
          alt="NeptuneGPT Logo"
          width={300} // Adjust the width as needed
          height={400} // Adjust the height as needed
        />
      </div>
    </div>
  )
}

export default HomeContent
