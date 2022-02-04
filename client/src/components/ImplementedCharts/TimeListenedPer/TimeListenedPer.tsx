import React, { useCallback } from 'react';
import { api } from '../../../services/api';
import { useAPI } from '../../../services/hooks';
import {
  buildXYData,
  formatDateToString,
  formatXAxisDateTooltip,
  msToMinutes,
  useFormatXAxis,
} from '../../../services/stats';
import { DateId } from '../../../services/types';
import Line from '../../charts/Line';
import ChartCard from '../../ChartCard';
import LoadingImplementedChart from '../LoadingImplementedChart';
import { ImplementedChartProps } from '../types';

interface TimeListenedPerProps extends ImplementedChartProps {}

export default function TimeListenedPer({ className, interval }: TimeListenedPerProps) {
  const result = useAPI(api.timePer, interval.start, interval.end, interval.timesplit);

  const data = buildXYData(
    result?.map((r) => ({
      _id: r._id as DateId,
      value: r.count,
    })) ?? [],
    interval.start,
    interval.end,
  );

  const formatX = useFormatXAxis(data, interval.start, interval.end);
  const formatY = useCallback((value: number) => {
    return `${msToMinutes(value)}m`;
  }, []);
  const formatYTooltip = useCallback((value: number) => {
    return `${msToMinutes(value)} minutes listened`;
  }, []);

  if (!result) {
    return <LoadingImplementedChart title="Time listened" className={className} />;
  }

  if (result.length > 0 && result[0]._id == null) {
    return null;
  }

  return (
    <ChartCard title="Time listened" className={className}>
      <Line
        data={data}
        xFormat={formatX}
        yFormat={formatY}
        tooltipLabelFormatter={formatXAxisDateTooltip}
        tooltipValueFormatter={formatYTooltip}
      />
    </ChartCard>
  );
}
