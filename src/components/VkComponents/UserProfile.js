import React from 'react';
import UserInfo from '../UserInfo';
import { 
  compose, 
  withData, 
  withVkService, 
  withErrorBoundry 
} from '../HocHelpers';

const UserProfile = (props) => {
  
  const mapMethodsToProps = (vkService) => {
    return {
      getData: () => vkService.getUser(props.userId)
    };
  }

  const UserInfoWithData = compose(withVkService(mapMethodsToProps), 
                          withData)(UserInfo);

  return (
    <UserInfoWithData />
  );
}

export default withErrorBoundry(UserProfile);