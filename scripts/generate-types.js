const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://ljualqwoexkjhrwbizkj.supabase.co';
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

async function generateTypes() {
  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    
    // Fetch the schema from Supabase
    const { data: schema, error } = await supabase.rpc('get_schema');
    
    if (error) throw error;
    
    // Generate TypeScript types
    const types = `// This file is auto-generated. Do not edit manually.
// Run 'node scripts/generate-types.js' to update.

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: ${JSON.stringify(schema, null, 2).replace(/"([^"]+)":/g, '$1:')}
}
`;
    
    // Write to file
    const outputPath = path.resolve(__dirname, '../src/types/supabase.ts');
    fs.writeFileSync(outputPath, types, 'utf-8');
    
    console.log('✅ Types generated successfully!');
  } catch (error) {
    console.error('❌ Error generating types:', error.message);
    process.exit(1);
  }
}

generateTypes();
