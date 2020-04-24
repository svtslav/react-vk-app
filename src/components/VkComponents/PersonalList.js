import React from 'react';
import PersonalInfo from '../PersonalInfo';
import { compose, withVkService, withData } from '../HocHelpers';


const PersonalList = (props) => {

  const { userId } = props;

  const mapMethodsToProps = (vkService) => {
    return {
      getData: () => vkService.getUser(userId)
    };
  }

  const PersonalInfoWithData = compose(
    withVkService(mapMethodsToProps), 
    withData
  )(PersonalInfo);

  return (
    <PersonalInfoWithData />
  );
}

export default PersonalList;