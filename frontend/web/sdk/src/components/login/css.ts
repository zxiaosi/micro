import { Interpolation, keyframes } from '@emotion/react';

const gradientBg = keyframes`
  0% {
    background-position: 0 50%;
  }
  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0 50%;
  }
`;

const moveForever = keyframes`
  0% {
    transform: translate3d(-90px, 0, 0);
  }

  100% {
    transform: translate3d(85px, 0, 0);
  }
`;

export const loginPage: Interpolation = {
  width: '100%',
  height: '100%',
  background: 'linear-gradient(to right, #ffcdcd, #4ecdc4, #45b7d1)',
  animation: `${gradientBg} 25s ease infinite`,
  backgroundSize: '300% 300%',
};

export const loginPageContentWapper: Interpolation = {
  width: '100%',
  height: '70vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export const loginPageContent: Interpolation = {
  width: '380px',
  boxSizing: 'border-box',
  padding: '40px',
  background: 'rgba(255, 255, 255, 0.95)',
  borderRadius: '20px',
  boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)',
  backdropFilter: 'blur(10px)',
};

export const loginPageContentHeader: Interpolation = {
  textAlign: 'center',
  fontSize: '24px',
  color: '#333',
  fontWeight: '600',
  marginBottom: '30px',
};

export const loginPageContentForm: Interpolation = {
  div: {
    marginBottom: '30px',
    padding: '12px 20px 12px 40px',
    border: '0',
    borderRadius: '25px',
    background: 'rgba(255, 255, 255, 0.9)',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
    fontSize: '16px',
    transition: 'all 0.3s ease',
  },
};

export const loginPageContentButton: Interpolation = {
  textAlign: 'center',
  padding: '12px',
  background: 'linear-gradient(45deg, #ff6b6b, #ff8e8e)',
  border: '0',
  borderRadius: '25px',
  color: 'white',
  fontSize: '16px',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'transform 0.3s ease',
};

export const loginPageContentTip: Interpolation = {
  textAlign: 'center',
  marginTop: '20px',
};

export const loginPageContentTipSpan: Interpolation = {
  color: '#666',
  textDecoration: 'none',
  fontSize: '14px',
  margin: '0 10px',
  transition: 'color 0.3s ease',
};

export const loginPageContentQrcode: Interpolation = {
  width: '100%',
  img: {
    width: '100%',
  },
};

export const loginPageFooter: Interpolation = {
  position: 'fixed',
  bottom: 0,
  width: '100%',
  height: '30vh',
  textAlign: 'center',
  fontSize: '14px',
};

export const loginPageFooterFg: Interpolation = {
  width: '100%',
  position: 'absolute',
  bottom: 0,
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 1,
};

export const loginPageFooterFgLine: Interpolation = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '10px',
  gap: '6px',
};

export const loginPageFooterFgLineItem: Interpolation = {
  cursor: 'pointer',
  '&:hover': {
    textDecoration: 'underline',
  },
};

export const loginPageFooterBg: Interpolation = {
  width: '100%',
  height: '100%',
  position: 'absolute',
};

export const loginPageFooterBgWaves: Interpolation = {
  width: '100%',
  height: '100%',
};

export const loginPageFooterBgWavesParallax: Interpolation = {
  use: {
    animation: `${moveForever} 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite`,

    '&:nth-child(1)': {
      /* 延迟2秒启动动画  */
      animationDelay: '-2s',
      /* 设置动画持续时间为7秒 */
      animationDuration: '7s',
    },
    '&:nth-child(2)': {
      animationDelay: '-3s',
      animationDuration: '10s',
    },
    '&:nth-child(3)': {
      animationDelay: '-4s',
      animationDuration: '13s',
    },
    '&:nth-child(4)': {
      animationDelay: '-5s',
      animationDuration: '20s',
    },
  },
};
