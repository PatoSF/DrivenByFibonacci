import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { FaLinkedinIn } from 'react-icons/fa6';
import { RiTwitterXFill } from 'react-icons/ri';

const OurTeam = () => {
    return (
        <section className='w-full md:pb-28 pb-20 px-4 md:px-0 bg-color1 flex flex-col items-center'>
            <h1 className="text-color2 font-inter text-4xl text-center font-bold">Meet Our Team</h1>
            <p className="text-center font-nunitoSans text-base md:text-xl text-color2 mt-2 mb-8">The visionaries behind EulerFi</p>

            <main className='max-w-5xl flex md:flex-row md:flex-wrap flex-col justify-center items-center md:gap-10 gap-5'>
                {
                    teamMembers.map((item, index) => (
                        <div key={index} className="max-w-xl rounded-md bg-gradient-to-b from-color0 to-color1 border border-[#fee0cc] p-6 flex flex-col items-center">

                            <Image src={item.image} alt='teammember' className='object-cover rounded-md' quality={100} priority width={244} height={244} />
                            <h2 className='text-center font-nunitoSans mt-2 text-lg font-semibold'>{item.name}</h2>
                            <h4 className='text-center font-marcellus text-sm'>{item.role}</h4>
                            <div className="flex justify-center items-center gap-2 mt-4">
                                <Link href={item.twitter} className="text-color2 hover:text-color5 p-1 border-[0.5px] border-color2 hover:border-color5 rounded-md text-lg" target="_blank">
                                    <RiTwitterXFill />
                                </Link>
                                <Link href={item.linkedin} className="text-color2 hover:text-color5 p-1 border-[0.5px] border-color2 hover:border-color5 rounded text-lg" target="_blank">
                                    <FaLinkedinIn />
                                </Link>
                            </div>
                        </div>
                    ))
                }

            </main>
        </section>
    )
}

export default OurTeam

const teamMembers = [
    {
        name: "Patrick Seir",
        role: "Lead Protocol Engineer",
        image: "/team/signor.jpeg",
        twitter: "https://x.com/patrick__sfeir",
        linkedin: "https://www.linkedin.com/in/patrick-sfeir-353260174/"
    },
    {
        name: "Jeffrey Owoloko",
        role: "Blockchain Developer",
        image: "/team/signor.jpeg",
        twitter: "https://x.com/thebadmandev",
        linkedin: "https://www.linkedin.com/in/jeffrey-owoloko/"
    },
    {
        name: "Emmanuel Omemgboji",
        role: "Web3 Developer",
        image: "/team/signor.jpeg",
        twitter: "https://x.com/OneSignor",
        linkedin: "https://www.linkedin.com/in/emmanuel-omemgboji-4b92b3140/"
    },
];
