import React from 'react';
import { VkServiceConsumer } from '../VkServiceContext';

const withVkService = (mapMethodsToProps = () => { }) => (Wrapped) => {
  return (props) => {
    return (
      <VkServiceConsumer>
        {
          (vkService) => {
            const serviceProps = mapMethodsToProps(vkService);
            return <Wrapped { ...props } { ...serviceProps } vkService = { vkService } />;
          }
        }
      </VkServiceConsumer>
    )
  }
};

export default withVkService;