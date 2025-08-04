const brandDetails = [
    {
        brand: 'Nike',
        details: 'Nike, Inc. is an American multinational association that is involved in the design, development, manufacturing and worldwide marketing and sales of apparel, footwear, accessories, equipment and services.'
    },
    {
        brand: 'GAP',
        details: 'The Gap, Inc., commonly known as Gap Inc. or Gap (stylized as GAP), is an American worldwide clothing and accessories retailer. Gap was founded in 1969 by Donald Fisher and Doris F. Fisher and is headquartered in San Francisco, California. The company operates four primary divisions: Gap (the namesake banner), Banana Republic, Old Navy, and Athleta. Gap Inc. is the largest specialty retailer in the United States, and is 3rd in total international locations, behind Inditex Group and H&M. As of early 2023, Gap employs about 95,000 people.'
    },
    {
        brand: 'Adidas',
        details: 'German brand adidas is one of the world’s two biggest sportswear companies alongside Nike, but its greatest historical rival was fraternal. Shoemaking brothers Adolf and Rudolf Dassler founded Gebrüder Dassler Schuhfabrik in 1924 before becoming estranged and founding their own companies, adidas and PUMA. The Brand with the Three Stripes is not only a behemoth in sports such as football; its Run-DMC-driven popularity in ’80s NYC helped adidas become a lifestyle giant, too.'
    },
    {
        brand: 'American Eagle',
        details: 'American Eagle Outfitters, Inc. is an American clothing and accessories retailer headquartered at SouthSide Works in Pittsburgh, Pennsylvania. It was founded in 1977 by brothers Jerry and Mark Silverman as a subsidiary of Retail Ventures, Inc., a company that also owned and operated Silvermans Menswear. The Silvermans sold their ownership interests in 1991 to Jacob Price of Knoxville, Tennessee. American Eagle Outfitters is the parent company of Aerie and Todd Snyder.'
    },
    {
        brand: 'BillaBong',
        details: 'Billabong International Limited is an Australian company focused on surfing, primarily a clothing retailer that also produces accessories, such as watches and backpacks, and skateboard and snowboard products under other brand names. Founded in 1973 by Gordon and Rena Merchant, the company first traded on the Australian Securities Exchange in August 2000. The name "billabong" is derived from the Wiradjuri word bilabaŋ that refers to a "creek that runs only during the rainy season". As of September 2013, Von Zipper, and Element were two of the prominent brands that Billabong owns. Honolua Surf Company, Kustom, Palmers Surf, Xcel, Tigerlily, Sector 9, and RVCA were the companys other brands. In 2018, Billabong International Limited was acquired by Boardriders, Inc, owner of rival brand Quiksilver.'
    },
    {
        brand: 'JACK&JONES',
        details: 'While Jeans are the life-blood of JACK & JONES, the brand prides itself in offering a carefully curated selection of fashion forward apparel, accessories and footwear for the modern man. With more than 1000 stores across 38 countries, the brand has carved an indomitable niche for itself, and continues to build fashion inroads across the globe. Within India, currently the brand stands proud at 69 Exclusive Brand Outlets and a whopping 221 Shop-In-Shop.'
    },
    {
        brand: 'GANT',
        details: 'Gant Inc., stylized as GANT, is a Swedish clothing retailer with American roots, headquartered in Stockholm, Sweden. The company was founded in 1949 by Bernard Gantmacher and was originally based in New Haven, Connecticut. Gant operates in 70 markets and its products are available at over 4 000 retailers and Gant-stores all over the world. "House of Gant" has three different collections: GANT, GANT Diamond G and GANT Rugger.'
    },
    {
        brand: 'Terminal X',
        details: 'TERMINAL X is the pioneer, major multi brand e-commerce platform in israel, offering real time fashion from brands all over the world.'
    }
]

export function getBrandDetails(brand: string): string {
    let details = '';
    brandDetails.forEach((item) => {
        if (item.brand === brand)
            details = item.details;
    })
    return details;
}

export const returns = `You can return your purchase within 28 days of receipt for a full refund. Any returns must be unworn and in their original condition and packaging, and you must have your delivery documents as proof of purchase.

We cannot accept items purchased on this website for return at either our Outlet or Full Price stores.

Please note: Returned pairs will take at least 1 week to be delivered back to Clarks.

Please note: We cannot accept any returns back to our Outlet Warehouse that were originally purchased on clarks.co.uk

Please allow at least 14 days for the refund to be credited to your bank account. This may take a little longer depending on how long it takes your bank/building society to process the payment.`