import { Charts, sdk } from '@zxiaosi/sdk';
import { EChartsOption } from 'echarts';
import { memo, useEffect, useState } from 'react';
import { useStore } from 'zustand';

const defaultOption: EChartsOption = {
  title: { text: '' },
  tooltip: { trigger: 'axis' },
  legend: {},
  toolbox: { feature: { saveAsImage: {} } },
  grid: { left: '3%', right: '4%', bottom: '13%', containLabel: true },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: [],
    },
  ],
  yAxis: [
    {
      type: 'value',
    },
  ],
  series: {
    type: 'line',
    areaStyle: {},
    stack: '总量',
  },
};

const Chart = () => {
  const locale = useStore(sdk.store, (state) => state.locale);

  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<EChartsOption>({});

  /** 获取图标数据 */
  const getChartData = async () => {
    setLoading(() => true);
    const [resp, err, cancel] = await sdk.api.request2('/chart', {
      method: 'GET',
    });
    const data = resp?.data || {};

    const newOptions: any = { ...defaultOption };
    newOptions.title.text = data?.name;
    const xAxisData = data?.list?.[0]?.source?.map((item: any) => item.name);
    newOptions.xAxis[0].data = xAxisData;
    newOptions.series = data?.list?.map((item: any) => {
      return {
        name: item.groupName,
        ...newOptions.series,
        data: item.source?.map((subItem: any) => subItem.value),
      };
    });

    setOptions(newOptions);
    setLoading(() => false);
  };

  useEffect(() => {
    getChartData();
  }, [locale]);

  return (
    <Charts
      showLoading={loading}
      option={options}
      style={{ height: 400 }}
    />
  );
};

export default memo(Chart);
