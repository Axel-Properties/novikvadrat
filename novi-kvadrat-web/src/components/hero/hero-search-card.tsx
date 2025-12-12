'use client'

import * as React from 'react'
import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTranslations } from '@/hooks/use-translations'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { PurposeToggle } from './filters/purpose-toggle'
import { CompletionStatusFilter } from './filters/completion-status-filter'
import { PropertyTypeDropdown } from './filters/property-type-dropdown'
import { BedsAndBathsFilter } from './filters/beds-and-baths-filter'
import { PriceRangeFilter } from './filters/price-range-filter'

import type {
  HeroSearchCardProps,
  PropertiesFormData,
  NewProjectsFormData,
  AgentsFormData,
  HandoverYear,
  PaymentPlan,
  CompletionLevel,
} from './types'
import {
  defaultPropertiesFormData,
  defaultNewProjectsFormData,
  defaultAgentsFormData,
  HANDOVER_YEARS,
  PAYMENT_PLANS,
  COMPLETION_LEVELS,
} from './types'

type TabValue = 'properties' | 'newProjects' | 'agents'

export function HeroSearchCard({
  currentCity,
  onSearchProperties,
  onSearchProjects,
  onSearchAgents,
  className,
}: HeroSearchCardProps) {
  const { t } = useTranslations()
  const [activeTab, setActiveTab] = React.useState<TabValue>('properties')

  // Form states for each tab
  const [propertiesForm, setPropertiesForm] = React.useState<PropertiesFormData>(
    defaultPropertiesFormData
  )
  const [newProjectsForm, setNewProjectsForm] = React.useState<NewProjectsFormData>(
    defaultNewProjectsFormData
  )
  const [agentsForm, setAgentsForm] = React.useState<AgentsFormData>(defaultAgentsFormData)

  const handlePropertiesSearch = () => {
    onSearchProperties?.(propertiesForm)
  }

  const handleProjectsSearch = () => {
    onSearchProjects?.(newProjectsForm)
  }

  const handleAgentsSearch = () => {
    onSearchAgents?.(agentsForm)
  }

  return (
    <div
      className={cn(
        'w-full max-w-4xl mx-auto rounded-2xl bg-white/95 backdrop-blur-sm shadow-xl',
        // Mobile optimizations
        'p-0',
        className
      )}
    >
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as TabValue)}
        className="w-full"
      >
        {/* Tab Navigation */}
        <div className="px-3 sm:px-4 pt-3 sm:pt-4">
          <TabsList className="w-full h-auto p-1 bg-secondary-100 rounded-full overflow-x-auto">
            <TabsTrigger
              value="properties"
              className={cn(
                'flex-1 px-3 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap',
                'data-[state=active]:bg-white data-[state=active]:text-success-600 data-[state=active]:shadow-sm',
                'data-[state=inactive]:text-secondary-600 data-[state=inactive]:hover:text-secondary-900'
              )}
            >
              {t('heroSearch.tabs.properties')}
            </TabsTrigger>
            <TabsTrigger
              value="newProjects"
              className={cn(
                'flex-1 px-3 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap',
                'data-[state=active]:bg-white data-[state=active]:text-success-600 data-[state=active]:shadow-sm',
                'data-[state=inactive]:text-secondary-600 data-[state=inactive]:hover:text-secondary-900'
              )}
            >
              {t('heroSearch.tabs.newProjects')}
            </TabsTrigger>
            <TabsTrigger
              value="agents"
              className={cn(
                'flex-1 px-3 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap',
                'data-[state=active]:bg-white data-[state=active]:text-success-600 data-[state=active]:shadow-sm',
                'data-[state=inactive]:text-secondary-600 data-[state=inactive]:hover:text-secondary-900'
              )}
            >
              {t('heroSearch.tabs.agents')}
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Properties Tab */}
        <TabsContent value="properties" className="p-3 sm:p-4 mt-0">
          {/* Row 1: Purpose Toggle + Search + Button */}
          <div className="flex flex-col md:flex-row gap-2 sm:gap-3 mb-2 sm:mb-3">
            <PurposeToggle
              value={propertiesForm.purpose}
              onChange={(purpose) => setPropertiesForm((prev) => ({ ...prev, purpose }))}
              className="w-full md:w-auto"
            />
            <div className="flex-1">
              <Input
                placeholder={t('heroSearch.search.placeholder')}
                value={propertiesForm.searchQuery}
                onChange={(e) =>
                  setPropertiesForm((prev) => ({ ...prev, searchQuery: e.target.value }))
                }
                leftIcon={<Search className="h-5 w-5 text-primary-500" />}
                className="h-[44px]"
              />
            </div>
            <Button
              onClick={handlePropertiesSearch}
              className="h-[44px] w-full md:w-auto px-6 sm:px-8 bg-primary-500 hover:bg-primary-600 text-white rounded-lg"
            >
              <Search className="h-4 w-4 mr-2" />
              {t('heroSearch.actions.search')}
            </Button>
          </div>

          {/* Row 2: Filters */}
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <CompletionStatusFilter
              value={propertiesForm.completionStatus}
              onChange={(completionStatus) =>
                setPropertiesForm((prev) => ({ ...prev, completionStatus }))
              }
              className="w-full sm:w-auto"
            />
            <PropertyTypeDropdown
              category={propertiesForm.propertyCategory}
              selectedTypes={propertiesForm.propertyTypes}
              onCategoryChange={(propertyCategory) =>
                setPropertiesForm((prev) => ({ ...prev, propertyCategory }))
              }
              onTypesChange={(propertyTypes) =>
                setPropertiesForm((prev) => ({ ...prev, propertyTypes }))
              }
              className="flex-1 sm:flex-none"
            />
            <BedsAndBathsFilter
              beds={propertiesForm.beds}
              baths={propertiesForm.baths}
              onBedsChange={(beds) => setPropertiesForm((prev) => ({ ...prev, beds }))}
              onBathsChange={(baths) => setPropertiesForm((prev) => ({ ...prev, baths }))}
              className="flex-1 sm:flex-none"
            />
            <PriceRangeFilter
              minPrice={propertiesForm.minPrice}
              maxPrice={propertiesForm.maxPrice}
              onMinPriceChange={(minPrice) => setPropertiesForm((prev) => ({ ...prev, minPrice }))}
              onMaxPriceChange={(maxPrice) => setPropertiesForm((prev) => ({ ...prev, maxPrice }))}
              className="flex-1 sm:flex-none"
            />
          </div>
        </TabsContent>

        {/* New Projects Tab */}
        <TabsContent value="newProjects" className="p-3 sm:p-4 mt-0">
          {/* Row 1: Search + Button */}
          <div className="flex flex-col md:flex-row gap-2 sm:gap-3 mb-2 sm:mb-3">
            <div className="flex-1">
              <Input
                placeholder={t('heroSearch.search.placeholder')}
                value={newProjectsForm.searchQuery}
                onChange={(e) =>
                  setNewProjectsForm((prev) => ({ ...prev, searchQuery: e.target.value }))
                }
                leftIcon={<Search className="h-5 w-5 text-primary-500" />}
                className="h-[44px]"
              />
            </div>
            <Button
              onClick={handleProjectsSearch}
              className="h-[44px] w-full md:w-auto px-6 sm:px-8 bg-primary-500 hover:bg-primary-600 text-white rounded-lg"
            >
              <Search className="h-4 w-4 mr-2" />
              {t('heroSearch.actions.search')}
            </Button>
          </div>

          {/* Row 2: Filters */}
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <PropertyTypeDropdown
              category={newProjectsForm.propertyCategory}
              selectedTypes={newProjectsForm.propertyTypes}
              onCategoryChange={(propertyCategory) =>
                setNewProjectsForm((prev) => ({ ...prev, propertyCategory }))
              }
              onTypesChange={(propertyTypes) =>
                setNewProjectsForm((prev) => ({ ...prev, propertyTypes }))
              }
              className="flex-1 min-w-[140px]"
            />
            
            {/* Handover By */}
            <Select
              value={newProjectsForm.handoverBy || ''}
              onValueChange={(value) =>
                setNewProjectsForm((prev) => ({
                  ...prev,
                  handoverBy: (value || null) as HandoverYear | null,
                }))
              }
            >
              <SelectTrigger className="flex-1 min-w-[140px] h-10">
                <SelectValue placeholder={t('heroSearch.newProjectsFilters.handoverBy')} />
              </SelectTrigger>
              <SelectContent>
                {HANDOVER_YEARS.map((year) => (
                  <SelectItem key={year} value={year}>
                    {t(`heroSearch.newProjectsFilters.years.${year === '2028+' ? '2028Plus' : year}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Payment Plan */}
            <Select
              value={newProjectsForm.paymentPlan}
              onValueChange={(value) =>
                setNewProjectsForm((prev) => ({ ...prev, paymentPlan: value as PaymentPlan }))
              }
            >
              <SelectTrigger className="flex-1 min-w-[140px] h-10">
                <SelectValue placeholder={t('heroSearch.newProjectsFilters.paymentPlan')} />
              </SelectTrigger>
              <SelectContent>
                {PAYMENT_PLANS.map((plan) => (
                  <SelectItem key={plan} value={plan}>
                    {t(`heroSearch.newProjectsFilters.paymentPlans.${plan}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Completion Level */}
            <Select
              value={newProjectsForm.completion}
              onValueChange={(value) =>
                setNewProjectsForm((prev) => ({ ...prev, completion: value as CompletionLevel }))
              }
            >
              <SelectTrigger className="flex-1 min-w-[140px] h-10">
                <SelectValue placeholder={t('heroSearch.newProjectsFilters.completion')} />
              </SelectTrigger>
              <SelectContent>
                {COMPLETION_LEVELS.map((level) => (
                  <SelectItem key={level} value={level}>
                    {t(`heroSearch.newProjectsFilters.completionLevels.${level}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </TabsContent>

        {/* Agents Tab */}
        <TabsContent value="agents" className="p-3 sm:p-4 mt-0">
          {/* Row 1: Purpose Toggle + Search + Button */}
          <div className="flex flex-col md:flex-row gap-2 sm:gap-3">
            <PurposeToggle
              value={agentsForm.purpose}
              onChange={(purpose) => setAgentsForm((prev) => ({ ...prev, purpose }))}
              className="w-full md:w-auto"
            />
            <div className="flex-1">
              <Input
                placeholder={t('heroSearch.search.placeholder')}
                value={agentsForm.searchQuery}
                onChange={(e) => setAgentsForm((prev) => ({ ...prev, searchQuery: e.target.value }))}
                leftIcon={<Search className="h-5 w-5 text-primary-500" />}
                className="h-[44px]"
              />
            </div>
            <Button
              onClick={handleAgentsSearch}
              className="h-[44px] w-full md:w-auto px-6 sm:px-8 bg-primary-500 hover:bg-primary-600 text-white rounded-lg"
            >
              <Search className="h-4 w-4 mr-2" />
              {t('heroSearch.actions.search')}
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
