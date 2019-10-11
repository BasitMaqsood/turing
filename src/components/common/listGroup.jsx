import React from 'react';

const ListGroup = ({ items, textProperty, valueProperty, onItemSelect, selectedItem }) => {
    console.log('items',items)
    return ( 
        <ul className="list-group">
            { items.map(((item,index) => 
            <li onClick={ () => onItemSelect(item)}
             key={ item[valueProperty]}
              className={ item === selectedItem ? 'list-group-item list-group-item-action active' : 'list-group-item list-group-item-action'}>
            {item[textProperty]}
            </li>
            ))
            }
            
        </ul>
     );
}

ListGroup.defaultProps = {
    textProperty: "name",
    valueProperty: "_id"
}
 
export default ListGroup;