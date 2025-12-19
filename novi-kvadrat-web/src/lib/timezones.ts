/**
 * Timezone utilities with caching
 * 
 * This module provides optimized access to PostgreSQL timezone names.
 * Instead of querying pg_timezone_names directly (which can be slow),
 * we use a materialized view that's refreshed periodically.
 */

import { createClient } from '@/lib/supabase/server'

// In-memory cache with TTL (24 hours)
let cachedTimezones: string[] | null = null
let cacheTimestamp: number = 0
const CACHE_TTL = 24 * 60 * 60 * 1000 // 24 hours in milliseconds

/**
 * Get all timezone names from the cached materialized view
 * This is much faster than querying pg_timezone_names directly
 */
export async function getTimezoneNames(): Promise<string[]> {
  // Check in-memory cache first
  const now = Date.now()
  if (cachedTimezones && (now - cacheTimestamp) < CACHE_TTL) {
    return cachedTimezones
  }

  try {
    const supabase = await createClient()
    
    // Use the materialized view instead of pg_timezone_names
    const { data, error } = await supabase
      .from('timezone_names_cache')
      .select('name')
      .order('name', { ascending: true })

    if (error) {
      // Fallback: try the function if view doesn't exist
      const { data: funcData, error: funcError } = await supabase
        .rpc('get_timezone_names')

      if (funcError) {
        console.error('Error fetching timezones:', funcError)
        // Last resort: return common timezones
        return getCommonTimezones()
      }

      const timezones = funcData?.map((row: { name: string }) => row.name) || []
      cachedTimezones = timezones
      cacheTimestamp = now
      return timezones
    }

    const timezones = data?.map((row) => row.name) || []
    cachedTimezones = timezones
    cacheTimestamp = now
    return timezones
  } catch (error) {
    console.error('Error fetching timezones:', error)
    return getCommonTimezones()
  }
}

/**
 * Get filtered timezone names (e.g., only Europe, America, etc.)
 */
export async function getTimezoneNamesByRegion(region?: string): Promise<string[]> {
  const allTimezones = await getTimezoneNames()
  
  if (!region) {
    return allTimezones
  }

  return allTimezones.filter(tz => tz.startsWith(region))
}

/**
 * Common timezones as fallback
 */
function getCommonTimezones(): string[] {
  return [
    'UTC',
    'Europe/Belgrade',
    'Europe/Zagreb',
    'Europe/Sarajevo',
    'Europe/Skopje',
    'Europe/Podgorica',
    'Europe/Ljubljana',
    'Europe/Bucharest',
    'Europe/Sofia',
    'Europe/Athens',
    'Europe/Istanbul',
    'America/New_York',
    'America/Chicago',
    'America/Denver',
    'America/Los_Angeles',
    'Asia/Dubai',
    'Asia/Tokyo',
    'Asia/Shanghai',
  ]
}

/**
 * Clear the in-memory cache (useful for testing or manual refresh)
 */
export function clearTimezoneCache(): void {
  cachedTimezones = null
  cacheTimestamp = 0
}
