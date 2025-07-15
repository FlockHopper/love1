// Utility functions for dashboard data processing

export function formatNumber(value: number, options?: {
  decimals?: number;
  prefix?: string;
  suffix?: string;
}): string {
  const { decimals = 0, prefix = '', suffix = '' } = options || {};
  
  if (value >= 1000000) {
    return `${prefix}${(value / 1000000).toFixed(decimals)}M${suffix}`;
  } else if (value >= 1000) {
    return `${prefix}${(value / 1000).toFixed(decimals)}K${suffix}`;
  }
  
  return `${prefix}${value.toFixed(decimals)}${suffix}`;
}

export function calculatePercentageChange(current: number, previous: number): {
  value: number;
  type: "increase" | "decrease";
} {
  const change = ((current - previous) / previous) * 100;
  return {
    value: Math.abs(change),
    type: change >= 0 ? "increase" : "decrease"
  };
}

export function generateTimeSeriesData(
  days: number,
  baseValue: number,
  variance: number = 0.1
): Array<{ date: string; value: number }> {
  const data = [];
  const now = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    const randomVariance = (Math.random() - 0.5) * 2 * variance;
    const value = baseValue * (1 + randomVariance);
    
    data.push({
      date: date.toISOString().split('T')[0],
      value: Math.round(value * 100) / 100
    });
  }
  
  return data;
}

export function processChartData(rawData: any[], config: {
  xKey: string;
  yKey: string;
  formatX?: (value: any) => string;
  formatY?: (value: any) => number;
}) {
  return rawData.map(item => ({
    x: config.formatX ? config.formatX(item[config.xKey]) : item[config.xKey],
    y: config.formatY ? config.formatY(item[config.yKey]) : item[config.yKey]
  }));
}