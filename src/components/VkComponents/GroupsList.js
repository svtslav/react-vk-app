import React from 'react';
import ItemList, { Record } from '../ItemList/ItemList';
import { compose, withData, withVkService } from '../HocHelpers';

const GroupsList = ({ userId }) => {

  const mapMethodsToProps = (vkService) => {
    return {
      getData: () => vkService.getGroups(userId)
    };
  }
  const List = compose(
    withVkService(mapMethodsToProps), 
    withData
  )(ItemList);

  return (
    <List userId = { userId }>
      <Record 
        getLable = { (item) => item.name } />
    </List>
  );
};

export default GroupsList;