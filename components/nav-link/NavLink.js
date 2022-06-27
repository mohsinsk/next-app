import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

const NavLink = ({ href, exact, children, activeClassName, ...props }) => {
    // const router = useRouter();
    // console.log(router);

    const { asPath } = useRouter();

    const isActive = exact ? asPath === href : asPath.startsWith(href);

    if (isActive) {
        props.className = `${props.className} ${activeClassName}`;
    }

    return (
        <Link href={href}>
            <a {...props}>
                {children}
            </a>
        </Link>
    );
};

NavLink.propTypes = {
    href: PropTypes.string.isRequired,
    exact: PropTypes.bool
};

NavLink.defaultProps = {
    exact: false
};

export default NavLink;