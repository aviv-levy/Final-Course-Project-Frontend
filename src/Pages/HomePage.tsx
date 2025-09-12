import { Link } from 'react-router-dom';
import menImg from '../Images/men.jpeg'
import womenImg from '../Images/women.png'
import '../CSS/Homepage.css'

function HomePage() {
    return (
        <>
            <div className="container my-5">
                <div className="row g-0">
                    <div className="col-md position-relative text-center">
                        <Link to='/men'>
                            <div className="z-1 position-absolute top-50 start-50 translate-middle text-white fs-1">
                                <strong>MENNNNNN</strong>
                            </div>
                            <img
                                className="img-thumbnail z-0 pic border-0 h-100"
                                src={menImg}
                                alt="men" />
                        </Link>
                    </div>

                    <div className="col-md position-relative text-center">
                        <Link to='/women'>
                            <div className="z-1 position-absolute top-50 start-50 translate-middle text-white fs-1">
                                <strong>WOMEN</strong>
                            </div>
                            <img
                                className="img-thumbnail pic border-0 h-100"
                                src={womenImg} alt="women" />
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HomePage;