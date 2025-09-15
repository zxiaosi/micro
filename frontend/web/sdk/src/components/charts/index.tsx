import { sdk } from '@/core';
import { EChartsType } from 'echarts';
import ReactECharts, { EChartsReactProps } from 'echarts-for-react';
import { forwardRef, Ref, useImperativeHandle, useMemo, useRef } from 'react';
import { useStore } from 'zustand';
import { useShallow } from 'zustand/shallow';

/**
 * ReactEcharts
 */
const Charts = forwardRef((props: EChartsReactProps, ref: Ref<EChartsType>) => {
  const echartRef = useRef<InstanceType<typeof ReactECharts>>(null);

  const [locale, theme] = useStore(
    sdk.store,
    useShallow((state) => [state.locale, state.theme]),
  );

  const chartLang = useMemo(() => {
    const defaultLang = 'zh';

    if (!locale) return defaultLang;

    const lang = locale.split('-')[0];
    if (!lang) return defaultLang;

    return lang.toUpperCase();
  }, [locale]);

  const chartTheme = useMemo(() => {
    return theme === 'dark' ? 'dark' : undefined;
  }, [theme]);

  useImperativeHandle(
    ref,
    () => echartRef.current?.getEchartsInstance?.() ?? null,
  );

  if (!locale || !theme) return <>Loading...</>;

  return (
    <ReactECharts
      ref={echartRef}
      theme={chartTheme}
      opts={{ locale: chartLang }}
      {...props}
    />
  );
});

export { Charts };
