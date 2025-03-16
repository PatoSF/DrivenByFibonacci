import React from 'react'
import Add from './Add'
import Remove from './Remove'

const AddRemoveListing = () => {
    return (
        <section className="w-full py-20 md:py-28 md:px-10 px-4 grid md:grid-cols-2 md:gap-10 gap-8">
            <Add />
            <Remove />
        </section>
    )
}

export default AddRemoveListing