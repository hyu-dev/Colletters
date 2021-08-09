import React from 'react';
import FindAccountTemplate from '../components/templates/FindAccountTemplate';
import LoginTemplate from '../components/templates/LoginTemplate';
import { useLoginUserState } from '../data/LoginUserContext';
import { useToggleState } from '../data/_reducers/toggleComponent';

function Login() {
  const loginUserState = useLoginUserState();
  const { findAccount } = useToggleState();
  return (
    <>
      { findAccount && <FindAccountTemplate type={findAccount}/> }
      <LoginTemplate isLogin={!!loginUserState.id} />
    </>
  );
}

export default Login;