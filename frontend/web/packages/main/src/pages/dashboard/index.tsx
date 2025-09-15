import { Charts, Crumb, sdk, useIntl } from '@zxiaosi/sdk';
import { Alert, Button, Card, DatePicker, Space } from 'antd';
import { EChartsOption } from 'echarts';
import { useEffect, useState } from 'react';
import { useStore } from 'zustand';
import { useShallow } from 'zustand/shallow';
import './index.less';

/** 首页 */
const Dashboard = () => {
  const [theme, setTheme, locale, setLocale] = useStore(
    sdk.store,
    useShallow((state) => [
      state.theme,
      state.setTheme,
      state.locale,
      state.setLocale,
    ]),
  );

  const intl = useIntl();

  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<EChartsOption['series']>([]);

  const defaultOption: EChartsOption = {
    title: {
      text: '堆叠区域图',
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['邮件营销', '联盟广告', '视频广告'],
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '13%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: options,
  };

  /** 更新主题 */
  const handleChangeTheme = () => {
    setTheme?.(theme === 'light' ? 'dark' : 'light');
  };

  /** 更新语言包 */
  const handleChangeLocale = () => {
    setLocale?.(locale === 'zh-CN' ? 'en-US' : 'zh-CN');
  };

  /** 获取图标数据 */
  const getChartData = async () => {
    setLoading(() => true);
    const [resp, err, cancel] = await sdk.api.request2('/chart', {
      method: 'GET',
    });
    setOptions(resp?.data || []);
    setLoading(() => false);
  };

  useEffect(() => {
    getChartData();
  }, []);

  const handleChangeChart = () => {
    getChartData();
  };

  return (
    <div className="dashboard">
      <Space direction="vertical" style={{ display: 'flex' }}>
        <Crumb />

        <Card title="CSS 变量、Token 变量">
          <Space wrap>
            <div style={{ color: 'var(--primary)' }}>CSS 变量</div>
            <Alert message="品牌色" type="info" />
            <Alert message="成功色" type="success" />
            <Alert message="警戒色" type="warning" />
            <Alert message="错误色" type="error" />
          </Space>
        </Card>

        <Card title="全局样式、样式隔离">
          <Space wrap>
            <div className="global-style">全局样式</div>
            <div className="postcss-prefix-selector">样式隔离</div>
          </Space>
        </Card>

        <Card title="Antd 语言包、React Intl 国际化">
          <Space>
            <DatePicker />
            {intl.get('hello')}
          </Space>
        </Card>

        <Card title="全局状态管理">
          <Space wrap>
            <Button type="dashed" danger onClick={handleChangeTheme}>
              更新主题
            </Button>

            <Button type="dashed" danger onClick={handleChangeLocale}>
              更新语言包
            </Button>
          </Space>
        </Card>

        <Card
          title="图表"
          extra={
            <Button type="primary" onClick={handleChangeChart}>
              更新图表
            </Button>
          }
        >
          <Charts
            showLoading={loading}
            option={defaultOption}
            style={{ height: 400 }}
          />
        </Card>
      </Space>
    </div>
  );
};

export default Dashboard;
