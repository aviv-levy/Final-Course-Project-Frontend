import { ReactNode, useLayoutEffect, useState } from "react";

interface Props {
    children: ReactNode;
}

function ProductsLayout({ children }: Props) {

    const [windowSize, setWindowSize] = useState<number>(1200);

    useLayoutEffect(() => {
        function updateSize() {
            setWindowSize(window.innerWidth);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, [])

    return (
        <div className='container-fluid my-4'>
            <div className={`row row-cols-1 row-cols-md-3 mx-4 g-4 ${windowSize > 768 ? 'w-75' : 'mx-5'}`}>

                {children}

            </div>
            {
                windowSize > 768 &&
                <div className="w-25">

                </div>
            }
        </div>
    );
}

export default ProductsLayout;