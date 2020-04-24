import React from 'react';
import './UserInfo.scss';

const UserInfo = (props) => {

  const { data } = props;
  const { firstName, lastName, photo, online, status } = data;

  const userFields = {
    city: 'Город',
    sex: 'Пол',
    birthday: 'Дата рождения',
    relation: 'Семейное положение',
  };

  const renderUserFields = Object.entries(userFields).map(([ key, label ]) => {
    return !data[key] ? null :
    (
      <div className="user-info__item" key = { key }>
        <span className="user-info__item-name">{ label }</span>
        <span className="user-info__item-value">{ data[key] }</span>
      </div>
    )
  })

  return (
    <div className="user-info">
      <img className="user-info__photo" 
        alt={ `${ firstName } ${ lastName }` }
        title={ `${ firstName } ${ lastName }` }
        src={ photo } />


      <div className="user-info__info">

        <div className="user-info__name">
          { firstName } { lastName }
          { online ? 
          <span role="img" aria-label="Онлайн">🌝</span> 
          : <span role="img" aria-label="Оффлайн">🌚</span> }
        </div>

        { status ? <div className="user-info__status">{ status }</div> : null }

        { renderUserFields }
      </div>
    </div>
  );
}

export default UserInfo;
