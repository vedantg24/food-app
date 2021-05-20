import React from 'react';
import { Link } from 'react-router-dom';

const AddBtn = () => {

    return (
        <div className="fixed-action-btn">
            <a className="btn-floating btn-large red modal-trigger">
              <i className="large material-icons">local_grocery_store</i>
            </a>
            <ul>
                <li>
                    <Link to ='/cart-display' className="btn-floating red modal-trigger">
                        <i className="material-icons">local_grocery_store</i>
                    </Link>
                </li>
                <li>
                    <Link to ='/cart-history' className="btn-floating red modal-trigger">
                        <i className="material-icons">history</i>
                    </Link>
                </li>
            </ul>
        </div>
    )
};

export default AddBtn