import React from 'react';
import './ItemList.scss';

const ItemList = (props) => {
  const { data } = props;
  return (
    <div className="item-list">
      { data.slice(0, 10)
        .map((item) => {
          return React.cloneElement(
            props.children, { item, key: item.id }
          ) 
        }) }
    </div>
  )
}

const Record = ({ item, getLable, onRecordClick }) => {
  const label = getLable(item);
  return (
    <div className="item-list__item" 
      onClick={ () => onRecordClick(item.id) } >
      <img className="item-list__photo" src={ item.photo } alt={ label } />
      <div className="item-list__name">{ label }</div>
    </div>
  )
}

Record.defaultProps = {
  onRecordClick: () => {}
}

export { Record }

export default ItemList;