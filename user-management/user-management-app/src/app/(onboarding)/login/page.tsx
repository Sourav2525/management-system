import Image from "next/image"

export default function Login() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2'>
      <div className="hidden lg:block relative w-full lg:h-screen overflow-hidden">
        <Image src="/onboarding/bert.png" alt="Authentication" width={1280} height={843} className="h-fit z-0" />
        <Image src="/onboarding/Mask Group 2.png" alt="Mask" width={300} height={200} className="absolute left-0 bottom-0 z-10" />
        <div className="absolute top z-20 top-32 2xl:top-64 left-16">
          <div style={{ background: '#fff' }} className="w-12 h-12 rounded-full mb-3.5"></div>
          <p className="text-5xl text-white font-semibold leading-14">Grow your business<br className="2xl:hidden" /> with us</p>
          <p className="text-white text-xl mt-3">Reach your business Goals in record<br className="2xl:hidden" /> time.</p>
        </div>
      </div>
      <div className="relative lg:p-8">
        <Image src="/onboarding/Mask Group.png" alt="Mask" width={300} height={200} className="absolute right-0 top-0 z-0" />
        <div className="relative mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] p-4 border z-10">
          <div className="flex flex-col space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to create your account
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
