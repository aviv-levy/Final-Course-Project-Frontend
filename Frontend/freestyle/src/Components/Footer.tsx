import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";


function Footer() {

    
    return (
        <footer className="footer bg-dark text-light p-4">
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <h4>Navigation</h4>
                        <div><Link to='/' className="text-decoration-none text-light">Homepage</Link></div>
                        <div><Link to='/about' className="text-decoration-none text-light">About us</Link></div>
                        <div><Link to='/contact' className="text-decoration-none text-light">Contact us</Link></div>
                    </div>
                    <div className="col-md-4">
                        <h4>Contact us</h4>
                        <div>
                            <FontAwesomeIcon icon={faPhone} className="me-2" /><span>052-6393304</span>
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faEnvelope} className="me-2" /><span>avvvviv@gmail.com</span>
                        </div>
                    </div>
                    <div className="col-md-4 text-center my-auto">
                        <h2>FreeStyle</h2>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;