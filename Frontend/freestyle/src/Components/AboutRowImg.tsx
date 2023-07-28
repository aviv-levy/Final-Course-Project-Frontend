import '../CSS/About.css'
import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props {
    title: string;
    img: string;
    alt?: string
    direction?: 'Right';
    children: ReactNode;
}

function AboutRowImg({ title, img, alt, direction, children }: Props) {
    return (
        <div dir={direction === 'Right' ? 'rtl' : ''} className="row gx-5 my-5">
            <div className="col">
                <img src={img} alt={alt} />
            </div>
            <div className="col">
                <h2>{title}</h2>
                <p className="mt-4 mb-5">
                    {children}
                </p>
                
                <Link to='/women' className={`aboutBtn btn btn-outline-dark rounded-0 border-2 ${direction === 'Right' ? 'ms-3' : 'me-3'}`}><strong>SHOP WOMEN</strong></Link>
                <Link to='/men' className="aboutBtn btn btn-outline-dark rounded-0 border-2 "><strong>SHOP MEN</strong></Link>
            </div>
        </div>
    );
}

export default AboutRowImg;