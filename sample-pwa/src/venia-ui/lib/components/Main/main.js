import React from 'react';
import { bool, shape, string } from 'prop-types';
import { useScrollLock } from '@magento/peregrine';

import { useStyle } from '../../classify';
import Footer from '../Footer';
import Header from '../Header';
import defaultClasses from './main.module.css';
// import CustomHeader from '../customHeader/customHeader';
// import CustomFooter from '../CustomFooter/customFooter';
import CustomHeader from '../../../../Components/CustomHeader/customHeader';
import CustomFooter from '../../../../Components/CustomFooter/customFooter';

const Main = props => {
    const { children, isMasked } = props;
    const classes = useStyle(defaultClasses, props.classes);

    const rootClass = isMasked ? classes.root_masked : classes.root;
    const pageClass = isMasked ? classes.page_masked : classes.page;

    useScrollLock(isMasked);

    return (
        <main className={rootClass}>
            {/* <Header /> */}
            <CustomHeader />
            <div className={pageClass}>{children}</div>
            <CustomFooter />
            {/* <Footer /> */}
        </main>
    );
};

export default Main;

Main.propTypes = {
    classes: shape({
        page: string,
        page_masked: string,
        root: string,
        root_masked: string
    }),
    isMasked: bool
};
