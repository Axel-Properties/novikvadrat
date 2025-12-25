'use client'

import { useMemo } from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import type { ProjectPriceHistory } from '@/types/database'

interface PriceDynamicsChartProps {
  priceHistory: ProjectPriceHistory[]
  currency?: string
  title?: string
}

export function PriceDynamicsChart({ 
  priceHistory, 
  currency = '€',
  title = 'Minimal price change dynamics'
}: PriceDynamicsChartProps) {
  // Transform and sort data for the chart
  const chartData = useMemo(() => {
    return priceHistory
      .map(item => ({
        date: new Date(item.recorded_at).getTime(),
        price: item.price_min,
        pricePerSqm: item.price_per_sqm_min,
        formattedDate: new Date(item.recorded_at).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        })
      }))
      .sort((a, b) => a.date - b.date)
  }, [priceHistory])

  // Calculate price trend
  const priceTrend = useMemo(() => {
    if (chartData.length < 2) return { direction: 'stable' as const, percentage: 0 }
    
    const firstPrice = chartData[0].price
    const lastPrice = chartData[chartData.length - 1].price
    const change = ((lastPrice - firstPrice) / firstPrice) * 100
    
    return {
      direction: change > 0.5 ? 'up' as const : change < -0.5 ? 'down' as const : 'stable' as const,
      percentage: Math.abs(change)
    }
  }, [chartData])

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }

  const formatAxisDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric'
    })
  }

  if (chartData.length === 0) {
    return null
  }

  const TrendIcon = priceTrend.direction === 'up' 
    ? TrendingUp 
    : priceTrend.direction === 'down' 
      ? TrendingDown 
      : Minus

  const trendColor = priceTrend.direction === 'up' 
    ? 'text-red-500' 
    : priceTrend.direction === 'down' 
      ? 'text-green-500' 
      : 'text-gray-500'

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">
            {title} in {currency}
          </CardTitle>
          {priceTrend.percentage > 0 && (
            <div className={`flex items-center gap-1 text-sm ${trendColor}`}>
              <TrendIcon className="h-4 w-4" />
              <span>{priceTrend.percentage.toFixed(1)}%</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid 
                strokeDasharray="3 3" 
                vertical={false} 
                stroke="#e5e7eb"
              />
              <XAxis
                dataKey="date"
                tickFormatter={formatAxisDate}
                tick={{ fontSize: 11, fill: '#6b7280' }}
                axisLine={{ stroke: '#e5e7eb' }}
                tickLine={false}
                minTickGap={50}
              />
              <YAxis
                tickFormatter={(value) => `${formatPrice(value)}`}
                tick={{ fontSize: 11, fill: '#6b7280' }}
                axisLine={false}
                tickLine={false}
                width={70}
                domain={['dataMin - 100', 'dataMax + 100']}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload
                    return (
                      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
                        <p className="text-sm text-gray-600 mb-1">
                          {data.formattedDate}
                        </p>
                        <p className="text-lg font-bold text-gray-900">
                          {currency} {formatPrice(data.price)}
                        </p>
                        {data.pricePerSqm && (
                          <p className="text-sm text-gray-500">
                            {currency} {formatPrice(data.pricePerSqm)}/m²
                          </p>
                        )}
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Area
                type="monotone"
                dataKey="price"
                stroke="#f97316"
                strokeWidth={2}
                fill="url(#priceGradient)"
                dot={{ fill: '#f97316', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: '#f97316' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        {/* Timeline indicator */}
        <div className="mt-4 relative">
          <div className="h-1 bg-gradient-to-r from-orange-200 via-orange-300 to-orange-400 rounded-full" />
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span>{chartData[0]?.formattedDate}</span>
            <span>{chartData[chartData.length - 1]?.formattedDate}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}




