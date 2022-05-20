import React from 'react';
import './LandingPage.css';

const LandingPage = () => {
    return (
        <div className="pt-10 top-48 h-auto">
            <div className="landing-about-flex-center bg-white">
                <div className="landing-about pt-10 top-56">
                    <span className="border-b border-color-primary">
                        WHO WE ARE
                    </span>
                    <span className="pt-10 font-bold sub-heading">
                        Client-Centric to the bone
                    </span>
                    <div className="pt-10 landing-about-desc">
                        We are a global digital consulting company, founded in
                        2008 in Singapore with 8 offices in the USA, UK, Middle
                        East and APAC regions. We leverage the power of platform
                        partnerships, experience design and cutting-edge
                        software technologies to drive digital transformation,
                        eCommerce and product engineering initiatives.
                    </div>
                </div>
            </div>
            <div className="pt-10 bg-gray-400 top-56 landing-row-images">
                <img src="https://www.ranosys.com/in/_jcr_content/root/container/container/container/teaser_ranosys.coreimg.jpeg/1652940954746/portfolio1.jpeg" />
                <img src="https://www.ranosys.com/in/_jcr_content/root/container/container/container/teaser_ranosys_copy.coreimg.jpeg/1652940954780/portfolio2.jpeg" />
                <img src="https://www.ranosys.com/in/_jcr_content/root/container/container/container/teaser_ranosys_copy_.coreimg.jpeg/1652940954811/digitaltransformation.jpeg" />
            </div>
            <div className='pt-10 flex flex-col-vertical-center bg-white'>
                <span className='border-b border-color-primary font-30px'>Industry leading digital platforms</span>
                <span className='pt-10 font-bold sub-heading'>Curating value for our clients with our strong network of platform partnerships</span>
                <div className='flex pt-10'>
                    <div className='pt-10 line-height-desc'>
                        <div className='flex justify-center'><img src='https://www.ranosys.com/in/_jcr_content/root/container/container/container_1555272301/teaser_ranosys_20751_515086303.coreimg.png/1652940954878/adobe-magento.png' /></div>
                        <div className='pt-10'>Grow your business withscalable, reliable and affordable eCommerce service by an Award winning, Magento Commerce agency.</div>
                    </div>
                    <div className='pt-10 line-height-desc'>
                        <div className='flex justify-center'><img src='https://www.ranosys.com/in/_jcr_content/root/container/container/container_1555272301/teaser_ranosys_20751_616102828.coreimg.png/1652940954911/salesforce-new.png' /></div>
                        <div className='pt-10'>Grow your business withscalable, reliable and affordable eCommerce service by an Award winning, Magento Commerce agency.</div>
                    </div>
                    <div className='pt-10 line-height-desc'>
                        <div className='flex justify-center'><img src='https://www.ranosys.com/in/_jcr_content/root/container/container/container_1555272301/teaser_ranosys_20751_1014389868.coreimg.png/1652940954945/outsystems2.png' /></div>
                        <div className='pt-10'>Grow your business withscalable, reliable and affordable eCommerce service by an Award winning, Magento Commerce agency.</div>
                    </div>
                    <div className='pt-10 line-height-desc'>
                        <div className='flex justify-center'><img src='https://www.ranosys.com/in/_jcr_content/root/container/container/container_1555272301/teaser_ranosys_20751.coreimg.png/1652940954978/microsoft-logo.png' /></div>
                        <div className='pt-10'>Grow your business withscalable, reliable and affordable eCommerce service by an Award winning, Magento Commerce agency.</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
