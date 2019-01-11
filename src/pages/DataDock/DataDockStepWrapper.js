import React from 'react';
import PropTypes from 'prop-types';
import { Card, Steps } from 'antd';

const { Step } = Steps;

function DataDockStepWrapper (props) {
  const { children, step } = props;
  return (
    <Card bordered={false} >
      <Steps current={step} >
        <Step title="配置" />
        <Step title="下一轮配置" />
        <Step title="完成" />
      </Steps>
      {children}
    </Card>
  );
}
DataDockStepWrapper.propTypes = {
  step: PropTypes.number.isRequired,
}

DataDockStepWrapper.defaultProps = {
  step: 0,

}
export default DataDockStepWrapper;