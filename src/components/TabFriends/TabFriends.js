import React from 'react';
import ProfileBar from '../ProfileBar';
import Tabs from '../Tabs';
import { withRouter } from 'react-router-dom';
import { compose, withErrorBoundry  } from '../HocHelpers';
import { UserProfile, FriendsList } from '../VkComponents';
import './TabFriends.scss';


const TabFriends = (props) => {

  const { match, history } = props;
  const userId = match.params.id;

  return (
    <React.Fragment>
      <ProfileBar />
      <UserProfile userId = { userId } />
      <Tabs userId = { userId } />
      <div className="tab-friends">
        <FriendsList 
          userId = { userId } 
          onUserClick = { (userId) => history.push(`/profile/${userId}`)  } />
      </div>
    </React.Fragment>
  );
}

export default compose(withRouter, withErrorBoundry)(TabFriends);