import { Link, useLocation } from "react-router-dom";
import Bestbrands from "../Components/Bestbrands";
import menShoesImg from "../Images/Categories/menshoes.jpg"
import menPantsImg from "../Images/Categories/menpants.jpg"
import menUnderWearImg from "../Images/Categories/menunderwear.jpg"
import menShirtsImg from "../Images/Categories/menshirs.jpg"
import womenTopsImg from "../Images/Categories/womentops.jpg"
import womenPantsImg from "../Images/Categories/womenpants.jpg"
import womenDressesImg from "../Images/Categories/womendresses.jpg"
import womenShoesImg from "../Images/Categories/womenshoes.jpg"

function GenderPage() {

    const location = useLocation();

    return (
        <div className="container">
            <h1>Categories</h1>

            {
                location.pathname === '/men' ?
                    //Men Categories
                    <div className="row">
                        <div className="col">
                            <Link to='/men/shoes'>
                                <img src={menShoesImg} className="img-thumbnail border-0" alt="" />
                            </Link>
                        </div>
                        <div className="col">
                            <Link to='/men/pants'>
                                <img src={menPantsImg} className="img-thumbnail border-0" alt="" />
                            </Link>
                        </div>
                        <div className="col">
                            <Link to='/men/underwear'>
                                <img src={menUnderWearImg} className="img-thumbnail border-0" alt="" />
                            </Link>
                        </div>
                        <div className="col">
                            <Link to='/men/shirts'>
                                <img src={menShirtsImg} className="img-thumbnail border-0" alt="" />
                            </Link>
                        </div>
                    </div>
                    :
                    //Women Categories
                    <div className="row">
                        <div className="col">
                            <Link to='/women/tops'>
                                <img src={womenTopsImg} className="img-thumbnail border-0" alt="" />
                            </Link>
                        </div>
                        <div className="col">
                            <Link to='/women/pants'>
                                <img src={womenPantsImg} className="img-thumbnail border-0" alt="" />
                            </Link>
                        </div>
                        <div className="col">
                            <Link to='/women/dresses'>
                                <img src={womenDressesImg} className="img-thumbnail border-0" alt="" />
                            </Link>
                        </div>
                        <div className="col">
                            <Link to='/women/shoes'>
                                <img src={womenShoesImg} className="img-thumbnail border-0" alt="" />
                            </Link>
                        </div>
                    </div>
            }

            <h1 className='mt-5'>Best Brands</h1>
            <Bestbrands />

        </div>
    );
}

export default GenderPage;