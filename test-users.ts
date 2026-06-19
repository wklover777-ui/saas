import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

const envPath = path.resolve('.env');
const envContent = fs.readFileSync(envPath, 'utf8');
const env: Record<string, string> = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) env[match[1]] = match[2].replace(/"/g, '').trim();
});

const supabaseUrl = env['NEXT_PUBLIC_SUPABASE_URL'];
const supabaseKey = env['NEXT_PUBLIC_SUPABASE_ANON_KEY'];
const supabase = createClient(supabaseUrl!, supabaseKey!);

async function checkUsers() {
  console.log("Checking qwer13...");
  const res1 = await supabase.auth.signInWithPassword({ email: 'qwer13@naver.com', password: 'qwer13' });
  console.log("qwer13 login:", res1.error ? res1.error.message : "Success");

  console.log("Checking qwer12...");
  const res2 = await supabase.auth.signInWithPassword({ email: 'qwer12@naver.com', password: 'qwer12' });
  console.log("qwer12 login:", res2.error ? res2.error.message : "Success");
}

checkUsers();
