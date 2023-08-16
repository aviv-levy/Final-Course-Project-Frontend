import { Link } from 'react-router-dom';
import '../CSS/Homepage.css'

function HomePage() {
    return (
        <>
            <div className="container my-5">
                <div className="row g-0">
                    <div className="col position-relative text-center">
                        <Link to='/men'>
                            <div className="z-1 position-absolute top-50 start-50 translate-middle text-white fs-1">
                                <strong>MEN</strong>
                            </div>
                            <img
                                className="img-thumbnail z-0 pic border-0 h-100"
                                src="https://avatars.dzeninfra.ru/get-zen_doc/4888095/pub_60aa926a27a3a31d01cfd189_60ad4dba7b4dfc53cfa953a3/scale_2400"
                                alt="men" />
                        </Link>
                    </div>

                    <div className="col position-relative text-center">
                        <Link to='/women'>
                            <div className="z-1 position-absolute top-50 start-50 translate-middle text-white fs-1">
                                <strong>WOMEN</strong>
                            </div>
                            <img
                                className="img-thumbnail pic border-0 h-100"
                                src="https://avatars.dzeninfra.ru/get-zen_doc/3512851/pub_60049b8ffd62ee068992eff6_6005972ae0a5593cf7217f97/scale_2400" alt="women" />
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HomePage;