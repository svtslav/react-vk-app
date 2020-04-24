import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { 
  compose, 
  withData, 
  withVkService, 
  withErrorBoundry 
} from '../HocHelpers';
import './ProfileBar.scss';

const ProfileBar = ({ data, history }) => {
  return (
    <div className="profile-bar">
      <img 
        className="profile-bar__photo"
        src={ data.photo } 
        alt={ `${ data.firstName } ${ data.lastName }` }
        title={ `${ data.firstName } ${ data.lastName }` } 
        onClick={ () => { history.push(`/profile/${data.id}`) } } />
      <div 
        className="profile-bar__name" 
        onClick={ () => { history.push(`/profile/${data.id}`) } }>
          { data.firstName } { data.lastName }
      </div>
    </div>
  );
}

ProfileBar.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    photo: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string
  })
}

const mapProfileMethodsToProps = (vkService) => {
  return {
    getData: vkService.getCurrentUser
  };
}

export default compose(
                  withVkService(mapProfileMethodsToProps),
                  withData,
                  withRouter,
                  withErrorBoundry 
                )(ProfileBar);