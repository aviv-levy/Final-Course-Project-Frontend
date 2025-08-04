import React, { useState } from 'react';

interface AccordionItem {
    title: string;
    content: React.ReactNode;
}

interface AccordionProps {
    items: AccordionItem[];
}

const Accordion: React.FC<AccordionProps> = ({ items }) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const onTitleClick = (index: number) => {
        // Toggle the clicked section
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="accordion">
            {items.map((item, index) => (
                <section key={index}>
                    <hr />
                    <div
                        style={{ cursor: "pointer" }}
                        className={`d-flex justify-content-between accordion-title ${index === activeIndex ? 'active' : 'notactive'}`}
                        onClick={() => onTitleClick(index)}
                    >
                        {item.title}
                        <span className='text-center me-3'>{activeIndex === index ? '-' : '+'}</span>

                    </div>
                    <div className="accordion-content active" style={{ display: index === activeIndex ? 'block' : 'none' }}>
                        <hr style={{ opacity: "10%" }} />
                        {item.content}
                    </div>
                </section>
            ))}
        </div>
    );
};

export default Accordion;