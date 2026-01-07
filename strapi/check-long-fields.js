/**
 * Script to check for portfolio entries with fields exceeding 255 characters
 * Run this from the strapi directory: node check-long-fields.js
 */

const path = require('path');
const fs = require('fs');

// Try to find the database file
const possibleDbPaths = [
  path.join(__dirname, '.tmp', 'data.db'),
  path.join(__dirname, '.tmp', 'local-data.db'),
  path.join(process.cwd(), '.tmp', 'data.db'),
];

let dbPath = null;
for (const dbp of possibleDbPaths) {
  if (fs.existsSync(dbp)) {
    dbPath = dbp;
    break;
  }
}

if (!dbPath) {
  console.log('❌ Could not find SQLite database file.');
  console.log('Make sure Strapi has been run at least once to create the database.');
  console.log('Looking in:', possibleDbPaths);
  process.exit(1);
}

try {
  const sqlite3 = require('better-sqlite3');
  const db = sqlite3(dbPath);
  
  console.log('📊 Checking portfolio entries for fields exceeding 255 characters...\n');
  
  // Get all portfolios
  const portfolios = db.prepare('SELECT id, title, short_description FROM portfolios').all();
  
  if (portfolios.length === 0) {
    console.log('No portfolio entries found.');
    db.close();
    process.exit(0);
  }
  
  let foundIssues = false;
  
  portfolios.forEach((p) => {
    const issues = [];
    
    if (p.title && p.title.length > 255) {
      issues.push(`title: ${p.title.length} characters (exceeds 255)`);
    }
    
    if (p.short_description && p.short_description.length > 255) {
      issues.push(`shortDescription: ${p.short_description.length} characters (exceeds 255)`);
    }
    
    if (issues.length > 0) {
      foundIssues = true;
      console.log(`❌ Portfolio ID ${p.id}:`);
      issues.forEach(issue => console.log(`   - ${issue}`));
      if (p.title) {
        console.log(`   Title preview: ${p.title.substring(0, 100)}...`);
      }
      console.log('');
    }
  });
  
  if (!foundIssues) {
    console.log('✅ All portfolio fields are within the 255 character limit.');
  } else {
    console.log('⚠️  Found entries with fields exceeding 255 characters.');
    console.log('   Please edit these entries in Strapi admin to shorten the fields.');
    console.log('   Or update the schema to use "text" type instead of "string" type.');
  }
  
  db.close();
} catch (error) {
  console.error('❌ Error:', error.message);
  if (error.message.includes('better-sqlite3')) {
    console.log('\n💡 Tip: Make sure you have better-sqlite3 installed:');
    console.log('   cd strapi && yarn install');
  }
  process.exit(1);
}


