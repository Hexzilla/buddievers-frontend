import styled from '@emotion/styled';

export const LoaderOuter = styled('span')`
  display: inline-block;
  width: 30px;
  height: 30px;
  position: relative;
  border: 4px solid #ffffff;
  top: 50%;
  animation: loaderAnimation 2s infinite ease-in;

  @keyframes loaderAnimation {
    0% {
      transform: rotate(0deg);
    }
    25% {
      transform: rotate(180deg);
    }
    ,
    50% {
      transform: rotate(180deg);
    }
    75% {
      transform: rotate(360deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const LoaderInner = styled('span')`
  vertical-align: top;
  display: inline-block;
  width: 100%;
  background-color: #ffffff;
  animation: loaderInnerAnimation 2s infinite ease-in;

  @keyframes loaderInnerAnimation {
    0% {
      height: 0%;
    }
    25% {
      height: 0%;
    }
    50% {
      height: 100%;
    }
    75% {
      height: 100%;
    }
    100% {
      height: 0%;
    }
  }
`;
