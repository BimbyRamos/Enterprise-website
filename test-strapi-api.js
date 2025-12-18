/**
 * Strapi API Endpoint Testing Script
 * 
 * This script tests all public API endpoints to verify that permissions
 * are configured correctly.
 * 
 * Requirements: 14.1
 */

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';

const endpoints = [
  { name: 'Projects', url: '/api/projects' },
  { name: 'Services', url: '/api/services' },
  { name: 'Industries', url: '/api/industries' },
  { name: 'Articles', url: '/api/articles' }
];

async function testEndpoint(name, url) {
  const fullUrl = `${STRAPI_URL}${url}`;
  
  try {
    console.log(`\n🔍 Testing ${name} endpoint...`);
    console.log(`   URL: ${fullUrl}`);
    
    const response = await fetch(fullUrl);
    
    console.log(`   Status: ${response.status} ${response.statusText}`);
    
    if (response.status === 200) {
      const data = await response.json();
      console.log(`   ✅ SUCCESS - Received data`);
      console.log(`   Response structure:`, {
        hasData: !!data.data,
        dataType: Array.isArray(data.data) ? 'array' : typeof data.data,
        itemCount: Array.isArray(data.data) ? data.data.length : 'N/A'
      });
      
      if (Array.isArray(data.data) && data.data.length > 0) {
        console.log(`   📦 Sample item keys:`, Object.keys(data.data[0]));
      } else if (Array.isArray(data.data) && data.data.length === 0) {
        console.log(`   ℹ️  Empty array (no content added yet)`);
      }
      
      return { success: true, status: response.status, data };
    } else if (response.status === 403) {
      console.log(`   ❌ FORBIDDEN - Permissions not configured correctly`);
      console.log(`   💡 Action needed: Configure public permissions in Strapi admin`);
      return { success: false, status: response.status, error: 'Forbidden' };
    } else if (response.status === 404) {
      console.log(`   ❌ NOT FOUND - Content type may not exist`);
      console.log(`   💡 Action needed: Verify content type is created in Strapi`);
      return { success: false, status: response.status, error: 'Not Found' };
    } else {
      const errorText = await response.text();
      console.log(`   ❌ ERROR - Unexpected status code`);
      console.log(`   Error details:`, errorText);
      return { success: false, status: response.status, error: errorText };
    }
  } catch (error) {
    console.log(`   ❌ NETWORK ERROR - Cannot connect to Strapi`);
    console.log(`   Error:`, error.message);
    console.log(`   💡 Action needed: Make sure Strapi is running on ${STRAPI_URL}`);
    return { success: false, error: error.message };
  }
}

async function runTests() {
  console.log('═══════════════════════════════════════════════════════');
  console.log('  Strapi API Endpoint Testing');
  console.log('═══════════════════════════════════════════════════════');
  console.log(`\n🌐 Testing Strapi at: ${STRAPI_URL}`);
  console.log(`⏰ Time: ${new Date().toLocaleString()}\n`);
  
  const results = [];
  
  for (const endpoint of endpoints) {
    const result = await testEndpoint(endpoint.name, endpoint.url);
    results.push({ ...endpoint, ...result });
  }
  
  console.log('\n═══════════════════════════════════════════════════════');
  console.log('  Test Summary');
  console.log('═══════════════════════════════════════════════════════\n');
  
  const successCount = results.filter(r => r.success).length;
  const failCount = results.filter(r => !r.success).length;
  
  results.forEach(result => {
    const icon = result.success ? '✅' : '❌';
    const status = result.status ? `(${result.status})` : '(Network Error)';
    console.log(`${icon} ${result.name.padEnd(15)} ${status}`);
  });
  
  console.log(`\n📊 Results: ${successCount} passed, ${failCount} failed out of ${results.length} tests`);
  
  if (failCount > 0) {
    console.log('\n⚠️  Some tests failed. Common issues:');
    console.log('   1. Strapi is not running - Start with: cd strapi && npm run develop');
    console.log('   2. Permissions not configured - Follow STRAPI_API_PERMISSIONS_GUIDE.md');
    console.log('   3. Content types not created - Check Content-Type Builder in Strapi admin');
    console.log('\n📖 See STRAPI_API_PERMISSIONS_GUIDE.md for detailed instructions');
  } else {
    console.log('\n🎉 All API endpoints are accessible!');
    console.log('✅ Task 3.2 completed successfully');
  }
  
  console.log('\n═══════════════════════════════════════════════════════\n');
  
  // Exit with appropriate code
  process.exit(failCount > 0 ? 1 : 0);
}

// Run the tests
runTests().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
