#!/usr/bin/env node

/**
 * Database Setup Script
 * Run this to set up the initial database schema in Supabase
 * 
 * Usage: node scripts/setup-database.js
 */

const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials in .env.local')
  console.error('Make sure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function runMigration() {
  console.log('🚀 Starting database setup...')
  
  try {
    // Read the migration file
    const migrationPath = path.join(__dirname, '..', 'supabase', 'migrations', '001_initial_schema.sql')
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8')
    
    console.log('📝 Running migration...')
    
    // Note: Supabase doesn't support running raw SQL directly via the JS client
    // You'll need to run this SQL in the Supabase SQL editor
    console.log('\n⚠️  IMPORTANT: Copy and run the following SQL in your Supabase SQL editor:')
    console.log('   Dashboard URL: https://supabase.com/dashboard/project/pmzzhxoalkixcxrnmxco/sql/new')
    console.log('\n' + '='.repeat(60))
    console.log('Migration file location:', migrationPath)
    console.log('='.repeat(60) + '\n')
    
    // Test connection
    const { data, error } = await supabase.from('cities').select('count')
    
    if (error && error.code === '42P01') {
      console.log('❌ Tables not found. Please run the migration SQL in Supabase dashboard first.')
    } else if (error) {
      console.log('❌ Error connecting to database:', error.message)
    } else {
      console.log('✅ Database connection successful!')
    }
    
  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  }
}

runMigration()