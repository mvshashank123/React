import React from 'react';
//import numeral from 'numeral';
import './Table.css';

function Table({countries}) {
    return (
        <div className="table">
            {countries.map(({name,cases})=>(
                <tr>
                    <td>{name}</td>
                    <td>
                        <strong>{cases}</strong>
                    </td>
                </tr>
            ))}
        </div>
    )
}

export default Table
