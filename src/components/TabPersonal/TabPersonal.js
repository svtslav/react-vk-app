import React from 'react';
import ProfileBar from '../ProfileBar';
import { UserProfile, PersonalList } from '../VkComponents';
import Tabs from '../Tabs';
import { compose, withErrorBoundry } from '../HocHelpers';
import { withRouter } from 'react-router-dom';


const TabPersonal = (props) => {

  const { match } = props;
  const userId = match.params.id;

  return (
    <React.Fragment>
      <ProfileBar />
      <UserProfile userId = { userId } />
      <Tabs userId = { userId } />
      <div className="tab-personal">
        <PersonalList userId = { userId } />
      </div>
    </React.Fragment>
  );

}

export default compose(withErrorBoundry, withRouter)(TabPersonal);