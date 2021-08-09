import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { moveLink } from '../../utils/handler';
import { loginLabels } from '../../data/labelType';
import LabelContainer from '../molecules/LabelContainer';

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function LoginTemplate({ isLogin, history }) {
  useEffect(() => {
    isLogin && moveLink("/main", history.push)
  }, []);

  return (
    <LoginWrapper>
      { loginLabels.map(value => <LabelContainer key={value.label} type={value} />) }
    </LoginWrapper>
  );
}

export default withRouter(LoginTemplate);