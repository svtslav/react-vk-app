import React from 'react';
import ItemList, { Record } from '../ItemList/ItemList';
import { compose, withData, withVkService } from '../HocHelpers';

const FriendsList = ({ userId, onUserClick }) => {

  const mapMethodsToProps = (vkService) => {
    return {
      getData: () => vkService.getFriends(userId)
    };
  }
  
  const List = compose(
    withVkService(mapMethodsToProps), 
    withData
  )(ItemList);

  return (
    <List userId = { userId }>
      <Record 
        getLable = { (item) => `${item.firstName} ${item.lastName}`} 
        onRecordClick = { onUserClick } />
    </List>
  );
};

export default FriendsList;

