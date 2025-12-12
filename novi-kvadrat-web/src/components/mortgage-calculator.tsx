'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Calculator, Euro } from 'lucide-react'
import { useTranslations } from '@/hooks/use-translations'

interface MortgageCalculatorProps {
  defaultPrice?: number
}

export default function MortgageCalculator({ defaultPrice = 150000 }: MortgageCalculatorProps) {
  const { t } = useTranslations()
  
  const [propertyPrice, setPropertyPrice] = useState(defaultPrice)
  const [downPaymentPercent, setDownPaymentPercent] = useState(20)
  const [loanTermYears, setLoanTermYears] = useState(20)
  const [interestRate, setInterestRate] = useState(3.5)
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null)
  
  const downPaymentAmount = (propertyPrice * downPaymentPercent) / 100
  const loanAmount = propertyPrice - downPaymentAmount
  
  const calculatePayment = () => {
    const principal = loanAmount
    const monthlyRate = interestRate / 100 / 12
    const numberOfPayments = loanTermYears * 12
    
    if (monthlyRate === 0) {
      setMonthlyPayment(principal / numberOfPayments)
    } else {
      const payment = principal * 
        (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
      setMonthlyPayment(payment)
    }
  }
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('sr-RS', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }
  
  useEffect(() => {
    if (monthlyPayment) {
      calculatePayment()
    }
  }, [propertyPrice, downPaymentPercent, loanTermYears, interestRate])
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          {t('projectDetail.mortgageCalculator')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Property Price */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-gray-700">
              {t('projectDetail.propertyPrice')}
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={propertyPrice}
                onChange={(e) => setPropertyPrice(Number(e.target.value))}
                className="w-32 px-3 py-1.5 text-right border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
              />
              <span className="text-gray-600">€</span>
            </div>
          </div>
          <Slider
            value={[propertyPrice]}
            onValueChange={([value]) => setPropertyPrice(value)}
            min={50000}
            max={500000}
            step={5000}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>€50,000</span>
            <span>€500,000</span>
          </div>
        </div>
        
        {/* Down Payment */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-gray-700">
              {t('projectDetail.downPayment')}
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="w-20 px-3 py-1.5 text-right border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                min={5}
                max={90}
              />
              <span className="text-gray-600">%</span>
              <span className="text-sm text-gray-500 ml-2">
                ({formatCurrency(downPaymentAmount)})
              </span>
            </div>
          </div>
          <Slider
            value={[downPaymentPercent]}
            onValueChange={([value]) => setDownPaymentPercent(value)}
            min={5}
            max={90}
            step={5}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>5%</span>
            <span>90%</span>
          </div>
        </div>
        
        {/* Loan Term */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-gray-700">
              {t('projectDetail.loanTerm')}
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={loanTermYears}
                onChange={(e) => setLoanTermYears(Number(e.target.value))}
                className="w-20 px-3 py-1.5 text-right border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                min={5}
                max={30}
              />
              <span className="text-gray-600">{t('projectDetail.years')}</span>
            </div>
          </div>
          <Slider
            value={[loanTermYears]}
            onValueChange={([value]) => setLoanTermYears(value)}
            min={5}
            max={30}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>5 {t('projectDetail.years')}</span>
            <span>30 {t('projectDetail.years')}</span>
          </div>
        </div>
        
        {/* Interest Rate */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-gray-700">
              {t('projectDetail.interestRate')}
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-20 px-3 py-1.5 text-right border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                min={0}
                max={15}
                step={0.1}
              />
              <span className="text-gray-600">%</span>
            </div>
          </div>
          <Slider
            value={[interestRate]}
            onValueChange={([value]) => setInterestRate(value)}
            min={0}
            max={15}
            step={0.1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>0%</span>
            <span>15%</span>
          </div>
        </div>
        
        {/* Summary */}
        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">{t('projectDetail.propertyPrice')}:</span>
            <span className="font-medium">{formatCurrency(propertyPrice)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">{t('projectDetail.downPayment')}:</span>
            <span className="font-medium">{formatCurrency(downPaymentAmount)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">{t('projectDetail.loanAmount')}:</span>
            <span className="font-medium">{formatCurrency(loanAmount)}</span>
          </div>
        </div>
        
        {/* Calculate Button */}
        <Button 
          className="w-full" 
          size="lg"
          onClick={calculatePayment}
        >
          <Calculator className="h-4 w-4 mr-2" />
          {t('projectDetail.calculatePayment')}
        </Button>
        
        {/* Monthly Payment Result */}
        {monthlyPayment && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">{t('projectDetail.monthlyPayment')}</p>
              <p className="text-3xl font-bold text-blue-600">
                {formatCurrency(monthlyPayment)}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                {t('projectDetail.total')}: {formatCurrency(monthlyPayment * loanTermYears * 12)}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}