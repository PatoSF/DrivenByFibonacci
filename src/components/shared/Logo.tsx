import Image from 'next/image'
import Link from 'next/link'
import React from "react"


const Logo = ({ classname, image, href }: { classname: string, image: string, href: string }) => {
    return (
        <Link href={href} className="flex items-center gap-2">
            <Image src={image} alt="Logo" className={classname} width={955} height={1060} priority quality={100} />
            <span className='text-3xl text-color2 font-marcellus font-extrabold'>EulerFi</span>
        </Link>
    )
}

export default Logo