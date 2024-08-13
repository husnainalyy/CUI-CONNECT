import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

const page = () => {
    return (
        <div className=''>
            <section className="text-gray-600 body-font">
                <div className="container flex justify-between items-center px-5 py-24 md:flex-row flex-col ">
                    <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                        <h1 className="title-font sm:text-4xl text-4xl mb-4 font-semibold text-gray-900">Connect, Engage, Succeed
                            <br className=" lg:inline-block" /> Discover and Register for Campus Events
                        </h1>
                        <p className="mb-8 leading-relaxed">Find out whats happening around campus and sign up for events that interest you. Keep track of all your activities and stay engaged with university life.</p>
                        <div className="flex justify-center">
                            <Button variant="secondary" className="border hover:bg-black hover:text-white  ">Explore More</Button>
                        </div>
                    </div>
                    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6  flex justify-end">
                        <Image src='/assets/hero.jpg' alt='log img' height={100} width={400} />
                    </div>
                </div>
            </section>
            <section className='w-full'>
                <h1 className='text-4xl w-1/3 font-semibold '>Trusted By Thousand of Events and Students</h1>
                <div>
                    search 
                    categories
                </div>
            </section>
        </div>
    )
}

export default page