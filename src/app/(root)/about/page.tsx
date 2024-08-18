import React from 'react'
import Image from 'next/image';

const page = () => {
    return (
        <>
            <section className="flex flex-col justify-center items-center ">
               
                <div className="flex flex-col justify-center text-center  py-8">
                    <h1 className="text-4xl font-bold  sm:text-5xl mb-4 md:text-6xl">
                        Streamlined Event Registration for COMSATS Lahore
                    </h1>

                    <p className=" px-20 leading-relaxed  xl:text-lg">
                        Welcome to CUI Connect, your go-to platform for finding and registering for events at COMSATS Lahore. Our innovative website simplifies the process of discovering and signing up for campus events, making it easier for students to stay engaged and involved.
                    </p>
                </div>
                <div className=" overflow-hidden rounded-lg   p-4">
                    <Image
                        src="/assets/images/comsats.jpeg"
                        alt="Photo by Fakurian Design"
                        width={800}
                        height={530}
                        className="object-cover object-center"
                    />
                </div>
               

            </section>
            <div className=" py-6 sm:py-8 lg:py-12">
                <div className="mx-auto max-w-screen-2xl px-4 md:px-8">

                    <div className="mb-10 md:mb-16">
                        <h2 className="mb-4 text-center text-2xl font-bold  md:mb-6 lg:text-3xl">Our competitive advantage</h2>
                        <p className="mx-auto max-w-screen-md text-center dark:text-grey-500 md:text-lg">
                            At CUI Connect, we pride ourselves on delivering a superior event registration experience for COMSATS Lahore students.
                        </p>
                    </div>


                    <div className="grid gap-8 sm:grid-cols-2 md:gap-12 xl:grid-cols-3 xl:gap-16">

                        <div className="flex gap-4 md:gap-6">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-indigo-500 text-white shadow-lg md:h-14 md:w-14 md:rounded-xl">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="mb-2 text-lg font-semibold md:text-xl">Growth</h3>
                                <p className="mb-2 text-gray-500">Our platform is designed to evolve with the needs of students, offering a scalable solution that adapts as our community grows. We are committed to continuous improvement to enhance your event experience.</p>
                            </div>
                        </div>


                        <div className="flex gap-4 md:gap-6">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-indigo-500 text-white shadow-lg md:h-14 md:w-14 md:rounded-xl">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="mb-2 text-lg font-semibold md:text-xl">Security</h3>
                                <p className="mb-2 text-gray-500">We prioritize the security of your data. Our robust measures ensure that your personal information is protected, allowing you to register for events with confidence.</p>
                            </div>
                        </div>


                        <div className="flex gap-4 md:gap-6">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-indigo-500 text-white shadow-lg md:h-14 md:w-14 md:rounded-xl">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="mb-2 text-lg font-semibold md:text-xl">Cloud</h3>
                                <p className="mb-2 text-gray-500">Leveraging the power of cloud technology, we provide seamless access and real-time updates, ensuring that you always have the latest information about campus events at your fingertips.</p>
                            </div>
                        </div>


                        <div className="flex gap-4 md:gap-6">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-indigo-500 text-white shadow-lg md:h-14 md:w-14 md:rounded-xl">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="mb-2 text-lg font-semibold md:text-xl">Speed</h3>
                                <p className="mb-2 text-gray-500">Experience fast and efficient event registration. Our platform’s performance is optimized to handle high traffic, ensuring quick load times and smooth navigation.</p>
                            </div>
                        </div>


                        <div className="flex gap-4 md:gap-6">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-indigo-500 text-white shadow-lg md:h-14 md:w-14 md:rounded-xl">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="mb-2 text-lg font-semibold md:text-xl">Support</h3>
                                <p className="mb-2 text-gray-500">Our dedicated support team is here to assist you with any questions or issues. We offer reliable help to ensure your experience is as smooth as possible.</p>
                            </div>
                        </div>


                        <div className="flex gap-4 md:gap-6">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-indigo-500 text-white shadow-lg md:h-14 md:w-14 md:rounded-xl">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="mb-2 text-lg font-semibold md:text-xl">Dark Mode</h3>
                                <p className="mb-2 text-gray-500">Enjoy a visually comfortable experience with our dark mode feature. It’s easy on the eyes and perfect for late-night event browsing.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" py-6 sm:py-8 lg:py-12">
                <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
                    <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 dark:text-grey-50 md:mb-8 lg:text-3xl">
                        Trusted by the best
                    </h2>

                    <div className="grid grid-cols-2 gap-6 rounded-lg bg-gray-100 dark:bg-zinc-900  p-6 sm:h-40 sm:content-evenly md:grid-cols-4">
                        {/* Logo - 1 */}
                        <div className="flex justify-center text-gray-400">
                            <h1 className='text-6xl font-bold'>RAS </h1>
                        </div>
                        <div className="flex justify-center text-gray-400">
                            <h1 className='text-6xl font-bold'>ACM</h1>
                        </div>
                        <div className="flex justify-center text-gray-400">
                            <h1 className='text-6xl font-bold'>GDSC</h1>
                        </div>
                        <div className="flex justify-center text-gray-400">
                            <h1 className='text-6xl font-bold'>Youthe</h1>
                        </div>

                        {/* Repeat the above block for each logo */}
                        {/* ... */}
                    </div>
                </div>
            </div>
            <div className=" py-6 sm:py-8 lg:py-12">
                <div className="mx-auto max-w-screen-xl px-4 md:px-8">
                    {/* Text Section */}
                    <div className="mb-10 md:mb-16">
                        <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 dark:text-gray-100 md:mb-6 lg:text-3xl">
                            Our Team by the numbers
                        </h2>
                        <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">
                            This is a section of some simple filler text, also known as placeholder text. It shares some characteristics of a real written text but is random or otherwise generated.
                        </p>
                    </div>

                    {/* Stats Section */}
                    <div className="grid grid-cols-2 gap-8 md:grid-cols-3 md:gap-0 md:divide-x">
                       
                        {/* Stat - 2 */}
                        <div className="flex flex-col items-center md:p-4">
                            <div className="text-xl font-bold text-indigo-500 sm:text-2xl md:text-3xl">50+</div>
                            <div className="text-sm font-semibold sm:text-base">Events</div>
                        </div>

                        {/* Stat - 3 */}
                        <div className="flex flex-col items-center md:p-4">
                            <div className="text-xl font-bold text-indigo-500 sm:text-2xl md:text-3xl">1000+</div>
                            <div className="text-sm font-semibold sm:text-base">Students</div>
                        </div>

                        {/* Stat - 4 */}
                        <div className="flex flex-col items-center md:p-4">
                            <div className="text-xl font-bold text-indigo-500 sm:text-2xl md:text-3xl">Team</div>
                            <div className="text-sm font-semibold sm:text-base text-center">it’s just me (but that’s how great ideas start)!</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" py-6 sm:py-8 lg:py-12">
                <div className="mx-auto max-w-screen-xl px-4 md:px-8">
                    {/* Text Section */}
                    <div className="mb-10 md:mb-16">
                        <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 dark:text-gray-100 md:mb-6 lg:text-3xl">Meet the Person Behind It</h2>
                        <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">
                            Discover the driving force behind our innovation. Our team might be small, but we are packed with passion and creativity. Here’s a peek at the person who’s leading the charge:
                        </p>
                    </div>

                    {/* Team Members */}
                    <div className="flex justify-center items-center w-full">
                        {/* Team Member */}
                        <div className="flex flex-col items-center rounded-lg bg-gray-100 dark:bg-zinc-900 p-4 lg:p-8">
                            <div className="mb-2 h-24 w-24 overflow-hidden rounded-full bg-gray-200 dark:bg-zinc-800 shadow-lg md:mb-4 md:h-32 md:w-32">
                                <Image
                                    src="/assets/images/husnain.png"
                                    alt="John McCulling"
                                    width={256}
                                    height={256}
                                    className="object-cover object-center"
                                />
                            </div>

                            <div>
                                <div className="text-center font-bold text-indigo-500 md:text-lg">Husnain Ali</div>
                                <p className="mb-3 text-center text-sm text-gray-500 md:mb-4 md:text-base">Software Engineering Student </p>

                                {/* Social Icons */}
                                <div className="flex justify-center">
                                    <div className="flex gap-4">
                                        <a href="https://www.linkedin.com/in/husnainalyy/" target="_blank" className="text-gray-400 transition duration-100 hover:text-gray-500 active:text-gray-600">
                                            {/* LinkedIn Icon */}
                                            <svg className="h-5 w-5" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                            </svg>
                                        </a>
                                        <a href="https://husnaindev.me" target="_blank" className="text-gray-400 transition duration-100 hover:text-gray-500 active:text-gray-600">
                                            {/* URL Icon */}
                                            <svg className="h-6 w-6" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" strokeWidth="3" stroke="#9CA3AF">
                                                <path d="M49.78,31.63,32,49.39c-2.09,2.09-10.24,6-16.75-.45-4.84-4.84-5.64-11.75-.95-16.58,5-5.17,15.24-15.24,20.7-20.7,2.89-2.89,7.81-4.28,12.17.07s2.41,9.44,0,11.82L27.81,43a4.61,4.61,0,0,1-6.89-.06c-2.19-2.19-1.05-5.24.36-6.66l18-17.89" />
                                            </svg>
                                        </a>

                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Add more team members here */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default page