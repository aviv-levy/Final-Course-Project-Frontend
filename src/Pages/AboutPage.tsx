import AboutRowImg from "../Components/AboutRowImg";
import aboutImg1 from "../Images/about1.avif";
import aboutImg2 from "../Images/about2.avif";
import aboutImg3 from "../Images/about3.avif";
import aboutImg4 from "../Images/about4.avif";
import aboutImg5 from "../Images/about5.avif";
import Title from "../Components/Title";

function AboutPage() {
    return (
        <>
            <Title title='About us' />

            <div className="container">
                <h1 className="text-center"><strong>The FreeStyle Brands</strong></h1>
                <div className="row mt-5">
                    <div className="col-3"></div>
                    <div className="col-6 text-start">
                        <p>We don't do fashion like anyone else does fashion. Our FreeStyle Brands, created by our London design team,
                            look between the lines to bring you the freshest clothing, shoes, accessories and gifts.
                            When it comes to our curation of brands at FreeStyle, we select the best of those to give you the biggest variety,
                            amazing exclusives and coolest collaborations. And in case that wasn't enough, we've also got a range of first-rate Face +
                            Body products you can express yourself with, too. There are no rules – just endless ways to be you.</p>
                    </div>
                </div>
                <div className="col-3"></div>

                <AboutRowImg title="FREESTYLE DESIGN" img={aboutImg1}>
                    Giving you the confidence to express your individuality, FREESTYLE DESIGN interprets major trends,
                    adding that next-level FreeStyle spin. Representing in our size ranges (FreeStyle Curve, Tall, Petite and Maternity),
                    we've got all the stuff you need to invent a style that’s all yours… making every day, night and everything in-between
                    as extraordinary as you are.
                </AboutRowImg>

                <AboutRowImg direction="Right" title="FREESTYLE EDITION" img={aboutImg2}>
                    FREESTYLE EDITION is designed for the most memorable moments of your life so you can turn up and stand out in occasionwear that’s
                    as unique as you. In our size ranges and including our beautiful FREESTYLE EDITION Wedding Collection, we'll have you dancing before
                    the party's even begun.
                </AboutRowImg>
                <AboutRowImg title="FREESTYLE WHITE" img={aboutImg3}>
                    Backing oversized fits with a minimal, clean aesthetic, FREESTYLE WHITE is here to elevate your every day.
                    Believing investment pieces don’t have to compromise on individuality,
                    it creates understated staples with a modern twist that you’ll be proud to wear – not to mention look damn cool in.
                </AboutRowImg>

                <AboutRowImg direction="Right" title="FREESTYLE MADE IN KENYA" img={aboutImg4}>
                    No longer a choice between conscience and self-expression, we believe fashion has the power to build futures.
                    That’s why our exclusive FREESTYLE MADE IN KENYA collection works with SOKO Kenya to improve the lives of local
                    communities by offering skills and support to drive sustainable development. Does good, looks good.
                </AboutRowImg>

                <AboutRowImg title="FREESTYLE 4505" img={aboutImg5}>
                    Our new activewear brand offers pieces for all your adventures. Whether you're running or raving,
                    FREESTYLE 4505 has the very best kit to ensure your playtime has serious style and personality.
                    It’s our movement for movement (and you’re all invited) 💪
                </AboutRowImg>
            </div>
        </>
    );
}

export default AboutPage;