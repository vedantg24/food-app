import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize.min.js';
import { deleteMenuItem } from '../../actions/cartActions';

const CartDisplayItem = ({ citem, deleteMenuItem }) => {
    const {  _id, name, description, cost, image, quantity } = citem;

    const onDelete = () => {
        deleteMenuItem({ _id, name, description, cost, image, quantity});
        M.toast({ html: 'Item Deleted' })
    };

    return (
        <tbody>
          <tr>
            <td>{name}</td>
            <td>{quantity}</td>
            <td>{cost}</td>
            <td>
            <a href="#!" className='secondary-content' onClick={onDelete} >
              <i className="material-icons">delete</i>
            </a>
            </td>
          </tr>
        </tbody>
    )
};

CartDisplayItem.propTypes = {
    deleteMenuItem: PropTypes.func.isRequired
};

export default connect(null, { deleteMenuItem })(CartDisplayItem);
