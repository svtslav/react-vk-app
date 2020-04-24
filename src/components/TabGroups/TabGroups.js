import React from 'react';
import ProfileBar from '../ProfileBar';
import { UserProfile, GroupsList } from '../VkComponents';
import Tabs from '../Tabs';
import { compose, withErrorBoundry } from '../HocHelpers';
import './TabGroups.scss';
import { withRouter } from 'react-router-dom';

const TabGroups = (props) => {
  const { match } = props;
  const userId = match.params.id;
  return (
    <React.Fragment>
      <ProfileBar />
      <UserProfile userId = { userId } />
      <Tabs userId = { userId } />
      <div className="tab-groups">
        <GroupsList userId = { userId } />
      </div>
    </React.Fragment>
  )
}

export default compose(withErrorBoundry, withRouter)(TabGroups);