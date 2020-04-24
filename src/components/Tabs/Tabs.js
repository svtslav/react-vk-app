import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './Tabs.scss';

const Tabs = (props) => {
  
  const isFriendsTabActive = props.history.location.pathname.includes('/friends');
  const isGroupsTabActive = props.history.location.pathname.includes('/groups');
  const isPersonalTabActive = !(isFriendsTabActive || isGroupsTabActive);

  return (
    <div className="tabs">
      <Link to = { `/profile/${props.userId}/` }>
        <div className={ isPersonalTabActive ? 'tabs__tab tabs__tab_active' : 'tabs__tab' }>Информация</div>
      </Link>
      <Link to = { `/profile/${props.userId}/friends` }>
        <div className={ isFriendsTabActive ? 'tabs__tab tabs__tab_active' : 'tabs__tab' }>Друзья</div>
      </Link>
      <Link to = { `/profile/${props.userId}/groups` }>
        <div className={ isGroupsTabActive ? 'tabs__tab tabs__tab_active' : 'tabs__tab' }>Сообщества</div>
      </Link>
    </div>
  )
}

export default withRouter(Tabs);