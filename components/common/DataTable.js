import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/router';


const Ths = ({ item }) => {
    var allHeads = Object.keys(item).concat("", "Actions", "");

    var ths = allHeads.map((item, index) => {
        return <th key={index}>{item.toUpperCase()}</th>
    });

    return (
        <tr>
            {ths}
        </tr>
    );
}

const Trs = ({ item, onSelect, onDelete }) => {
    var allValues = Object.values(item).concat(
        <Link href="/#" className='text-primary' onClick={
            (e) => {
                e.preventDefault();
                if (onSelect)
                    onSelect(item, false);
            }
        }>Details</Link>,
        <Link href="/#" className='text-warning' onClick={
            (e) => {
                e.preventDefault();
                if (onSelect)
                    onSelect(item, true);
            }
        }>Edit</Link>,
        <Link href="/#" className='text-danger' onClick={
            (e) => {
                e.preventDefault();
                if (onDelete)
                    if (window.confirm('Are you sure, you want to delete the record?')) {
                        onDelete(item.id);
                    }
            }
        }>Delete</Link>
    );

    var tds = allValues.map((item, index) => {
        return <td key={index}>{item}</td>
    });

    return (
        <tr>
            {tds}
        </tr>
    );
}

const DataTable = ({ items, children, onSelect, onDelete }) => {
    if (items && items.length) {
        var [item] = items;
        var ths = <Ths item={item} />;
        var trs = items.map((item, index) => {
            return <Trs key={index} item={item} onSelect={onSelect} onDelete={onDelete} />
        });
    }

    return (
        <>
            {children ? children : null}
            <table className='table table-striped table-hover'>
                <thead>
                    {ths}
                </thead>
                <tbody>
                    {trs}
                </tbody>
            </table>
        </>
    );
};

DataTable.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default DataTable;