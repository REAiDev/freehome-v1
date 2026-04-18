/**
 * Supabase RLS Diagnostic Script
 * Checks the contact_messages table and RLS policies
 */

import { createClient } from '@supabase/supabase-js';
import { loadEnvConfig } from '@next/env';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables using Next.js config loader
const projectDir = join(__dirname, '..');
loadEnvConfig(projectDir);

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  process.exit(1);
}

// Create client with anon key (same as API route uses)
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

async function checkDatabase() {
  console.log('🔍 Supabase Database Diagnostic\n');
  console.log('📍 URL:', supabaseUrl);
  console.log('🔑 Using anon key:', supabaseAnonKey.substring(0, 20) + '...\n');

  // Test 1: Check if table exists
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Test 1: Check if contact_messages table exists');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  const { error: tableError } = await supabase
    .from('contact_messages')
    .select('count')
    .limit(0);

  if (tableError) {
    if (tableError.code === '42P01') {
      console.log('❌ Table does not exist!');
      console.log('   Run SUPABASE_CONTACT_MIGRATION_SIMPLE.sql first\n');
      return;
    }
    console.log('❌ Error checking table:', tableError.message);
    console.log('   Details:', tableError);
    return;
  }

  console.log('✅ Table exists\n');

  // Test 2: Check RLS is enabled
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Test 2: Check RLS Status');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  // We can't directly check RLS status with anon key, so we'll try an insert
  console.log('⚠️  Cannot check RLS status directly with anon key');
  console.log('   Will test INSERT operation instead\n');

  // Test 3: Try to insert a test record
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Test 3: Try INSERT operation (with anon key)');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  const testData = {
    name: 'Test User',
    email: 'test@example.com',
    subject: 'RLS Test',
    message: 'Testing RLS policies from diagnostic script',
    status: 'new',
  };

  const { data: insertData, error: insertError } = await supabase
    .from('contact_messages')
    .insert(testData)
    .select()
    .single();

  if (insertError) {
    console.log('❌ INSERT failed!');
    console.log('   Error code:', insertError.code);
    console.log('   Error message:', insertError.message);
    console.log('   Details:', JSON.stringify(insertError, null, 2));

    if (insertError.message?.includes('row-level security policy')) {
      console.log('\n🔥 RLS POLICY ISSUE DETECTED!');
      console.log('   The anon role cannot insert into contact_messages');
      console.log('   Run SUPABASE_RESET_RLS.sql to fix this\n');
    }
  } else {
    console.log('✅ INSERT successful!');
    console.log('   Record ID:', insertData.id);
    console.log('   Created at:', insertData.created_at);

    // Clean up test record
    const { error: deleteError } = await supabase
      .from('contact_messages')
      .delete()
      .eq('id', insertData.id);

    if (!deleteError) {
      console.log('✅ Test record cleaned up\n');
    } else {
      console.log('⚠️  Could not delete test record (expected - anon role has no DELETE permission)\n');
    }
  }

  // Test 4: Check if we can read records
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Test 4: Try SELECT operation (with anon key)');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  const { data: selectData, error: selectError } = await supabase
    .from('contact_messages')
    .select('*')
    .limit(5);

  if (selectError) {
    console.log('❌ SELECT failed:', selectError.message);
    console.log('   This is expected if you are not authenticated\n');
  } else {
    console.log('✅ SELECT successful');
    console.log('   Found', selectData.length, 'records');
    console.log('   Note: Anon users should only see their own records (if any)\n');
  }

  // Summary
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Summary');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  if (!insertError) {
    console.log('✅ Database is configured correctly!');
    console.log('✅ RLS policies allow anonymous inserts');
    console.log('✅ Your contact form should work\n');
  } else {
    console.log('❌ Database configuration issues detected');
    console.log('\n📋 Next Steps:');
    console.log('   1. Go to Supabase Dashboard → SQL Editor');
    console.log('   2. Run SUPABASE_RESET_RLS.sql');
    console.log('   3. Run this script again to verify\n');
  }
}

checkDatabase().catch(console.error);
