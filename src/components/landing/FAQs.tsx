import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/faq"
import { faqsData } from '@/utils/FaqsData'


const FAQs = () => {
    return (
        <section className="bg-color1">
            <div className="max-w-6xl px-4 py-20 md:py-28 mx-auto">
                <h1 className="text-2xl font-inter font-semibold text-color2 lg:text-4xl">FAQ&apos;s</h1>

                <hr className="mt-16 mb-6 border-[#E6D2C0]" />
                <Accordion type="single" collapsible className='w-full'>
                    {
                        faqsData.map((faq, index) => (
                            <React.Fragment key={index}>
                                <AccordionItem key={index} value={`item-${index}`} className='border-0'>
                                    <AccordionTrigger>
                                        <h1 className="mx-4 text-xl text-color2 font-sora font-medium">{faq.question}</h1>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <span className="border border-[#E6D2C0]"></span>
                                        <p className="max-w-3xl px-4 text-color2 md:text-lg font-nunitoSans">
                                            {faq.answer}
                                        </p>
                                    </AccordionContent>
                                </AccordionItem>
                                <hr className="my-6 border-[#E6D2C0]" />
                            </React.Fragment>
                        ))
                    }
                </Accordion>
            </div>
        </section>
    )
}

export default FAQs