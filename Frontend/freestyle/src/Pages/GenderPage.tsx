import { Link, useLocation } from "react-router-dom";
import Bestbrands from "../Components/Bestbrands";

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
                                <img src="https://media.terminalx.com/pub/media/banners/2023July26500/MEN_DESK_260723_P1.jpg" className="img-thumbnail border-0" alt="" />
                            </Link>
                        </div>
                        <div className="col">
                            <Link to='/men/pants'>
                                <img src="https://media.terminalx.com/pub/media/banners/2023July26500/MEN_DESK_260723_P3.jpg" className="img-thumbnail border-0" alt="" />
                            </Link>
                        </div>
                        <div className="col">
                            <Link to='/men/underwear'>
                                <img src="https://media.terminalx.com/pub/media/banners/2023July26500/MEN_DESK_260723_P4.jpg" className="img-thumbnail border-0" alt="" />
                            </Link>
                        </div>
                        <div className="col">
                            <Link to='/men/shirts'>
                                <img src="https://media.terminalx.com/pub/media/banners/2023July26500/MEN_DESK_260723_P7.jpg" className="img-thumbnail border-0" alt="" />
                            </Link>
                        </div>
                    </div>
                    :
                    //Women Categories
                    <div className="row">
                        <div className="col">
                            <Link to='/women/tops'>
                                <img src="https://media.terminalx.com/pub/media/banners/2023-06-25/WOMEN_DESK_250623_P1.jpg" className="img-thumbnail border-0" alt="" />
                            </Link>
                        </div>
                        <div className="col">
                            <Link to='/women/pants'>
                                <img src="https://media.terminalx.com/pub/media/banners/2023-06-25/WOMEN_DESK_250623_P2.jpg" className="img-thumbnail border-0" alt="" />
                            </Link>
                        </div>
                        <div className="col">
                            <Link to='/women/dresses'>
                                <img src="https://media.terminalx.com/pub/media/banners/2023-06-25/WOMEN_DESK_250623_P3.jpg" className="img-thumbnail border-0" alt="" />
                            </Link>
                        </div>
                        <div className="col">
                            <Link to='/women/shoes'>
                                <img src="https://media.terminalx.com/pub/media/banners/2023-06-25/WOMEN_DESK_250623_P4.jpg" className="img-thumbnail border-0" alt="" />
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