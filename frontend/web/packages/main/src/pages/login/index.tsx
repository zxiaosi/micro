import beian from '@/assets/beian.png';
import axios from 'axios';
import { Fragment, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import './index.less';
import { qrcodeBase } from './qrcode';

/** 页脚信息 */
const footerInfo = [
  [
    { key: 'copyright', label: `©2020 - ${new Date().getFullYear()}` },
    { key: 'by', label: 'By' },
    { key: 'author', label: 'Mr.XiaoSi', url: 'https://github.com/zxiaosi' },
  ],
  [
    {
      key: 'beian',
      label: '豫ICP备2022013376号-2',
      url: 'https://beian.miit.gov.cn/',
    },
  ],
  [
    { key: 'icon', label: '', img: beian },
    {
      key: 'gongan',
      label: '豫公网安备 41162502150050号',
      url: 'http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=41162502150118',
    },
  ],
];

/** 登录状态 */
const loginStatus = {
  '-1': '请稍等...',
  '0': '请扫码',
  '1': '成功扫码',
  '2': '用户授权成功',
  '3': '用户取消授权',
} as any;

/** 标识 */
const scene = 1749756926882;

/** 获取小程序二维码 */
const getWeappQrcode = async () => {
  return await axios.get('http://localhost:8080/api/weapp/qrcode', {
    params: { scene },
  });
};

/**
 * @name 登录页
 * @see 流动波浪页脚 https://www.bilibili.com/video/BV1Ax4y157AB/
 */
const Login = () => {
  const navicate = useNavigate();
  const eventRef = useRef<EventSource>(null);

  const [qrCode, setQrCode] = useState('');
  const [qrcodeStatus, setQrcodeStatus] = useState('-1');

  /** 跳转去外部链接 */
  const handleWindowOpen = (url?: string) => {
    if (!url) return;
    window.open(url, '_blank');
  };

  /** 轮询获取小程序二维码状态 */
  const subscribeQrcodeStatus = async () => {
    eventRef.current = new EventSource(
      `http://localhost:8080/api/weapp/qrcode/status/subscribe?scene=${scene}`,
    );
    eventRef.current.onopen = (e) => {
      console.log('SSE连接成功', e);
    };
    eventRef.current.onmessage = (e) => {
      console.log('监听到小程序二维码状态变化', e);
      setQrcodeStatus(e.data);
    };
    eventRef.current.onerror = (e) => {
      console.log('SSE连接失败', e);
    };
  };

  useEffect(() => {
    // getWeappQrcode().then((res) => {
    //   console.log('获取小程序二维码成功', res);
    //   setQrCode(res.data.data);
    // });
    setQrCode(qrcodeBase);
    subscribeQrcodeStatus();

    return () => {
      eventRef.current?.close();
    };
  }, []);

  return (
    <div className="login-page">
      {/* 内容 */}
      <div className="login-page-content-wapper">
        <div className="login-page-content">
          <Link to={'/'}>回首页</Link>
          <div className="login-page-content-header">小四先生的栈</div>

          <div className="login-page-content-form">
            <div>用户名</div>
            <div>密码</div>
          </div>

          <div className="login-page-content-button">立即登录</div>

          <div className="login-page-content-tip">
            <span>忘记密码？</span>
            <span>注册账号</span>
          </div>

          <div className="login-page-content-qrcode">
            {loginStatus[qrcodeStatus]}
            {qrCode && <img src={'data:image/jpeg;base64,' + qrCode} />}
          </div>
        </div>
      </div>

      {/* 页脚 */}
      <div className={'login-page-footer'}>
        <div className="login-page-footer-fg">
          {footerInfo.map((item, idx) => {
            return (
              <div key={idx} className="login-page-footer-fg-line">
                {item.map((subItem) => {
                  const { key, label, url, img } = subItem;
                  return (
                    <Fragment key={key}>
                      {img ? (
                        <img src={beian} />
                      ) : (
                        <span
                          onClick={() => handleWindowOpen(url)}
                          className={url && 'login-page-footer-fg-line-item'}
                        >
                          {label}
                        </span>
                      )}
                    </Fragment>
                  );
                })}
              </div>
            );
          })}
        </div>

        <div className="login-page-footer-bg">
          <svg
            className="login-page-footer-bg-waves"
            viewBox="0 24 150 28"
            preserveAspectRatio="none"
            shape-rendering="auto"
          >
            <defs>
              <path
                id="gentle-wave"
                d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
              />
            </defs>

            <g className="login-page-footer-bg-waves-parallax">
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="0"
                fill="rgba(255,255,255,0.5)"
              />
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="3"
                fill="rgba(255,255,255,0.3)"
              />
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="5"
                fill="rgba(255,255,255,0.1)"
              />
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="7"
                fill="rgba(255,255,255,0.7)"
              />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Login;
