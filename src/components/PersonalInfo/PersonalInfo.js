import React from 'react';
import './PersonalInfo.scss';

const PersonalInfo = (props) => {

  const { data } = props;

  const personalFields = {
    about: 'О себе',
    activities: 'Деятельность',
    books: 'Любимые книги',
    movies: 'Любимые фильмы',
    tv: 'Любимые шоу',
    games: 'Любимые игры',
    music: 'Любимая музыка'
  };

  const renderPersonalFields = Object.entries(personalFields)
    .map(([key, label]) => {
      return !data[key] ? null :
      (
        <div className="personal-info__item" key = { key }>
          <span className="personal-info__item-name">{ label }</span>
          <span className="personal-info__item-value">{ data[key] }</span>
        </div>
      )
    })
    .filter((value) => value);

  return (
    <div className="personal-info">
      { renderPersonalFields.length 
        ? renderPersonalFields 
        : <div className="personal-info__message">Информация не указана</div>
      }
    </div>
  )
}

export default PersonalInfo;