import { ReactNode } from 'react';
import '../CSS/Navbar.css'

interface Props{
    children: ReactNode;
}

function Badge({children}:Props) {
    return (
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {children}
            <span className="visually-hidden">unread messages</span>
        </span>
    );
}

export default Badge;