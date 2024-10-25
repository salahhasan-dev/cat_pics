// Mock fetch globally for the test
const originalFetch = global.fetch;

// Helper function to mock fetch
function mockFetch(response, shouldFail = false) {
  global.fetch = function () {
    return shouldFail
      ? Promise.reject(response)
      : Promise.resolve({
          json: () => Promise.resolve(response),
        });
  };
}

// Helper function to restore the original fetch
function restoreFetch() {
  global.fetch = originalFetch;
}

// Function to test
async function getCatUrl() {
  try {
    const response = await fetch("https://api.thecatapi.com/v1/images/search");
    const data = await response.json();
    console.log(data[0]);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Run the tests
(async function runTests() {
  // Original console functions
  const originalLog = console.log;
  const originalError = console.error;

  // Variables to capture console output
  let logOutput = null;
  let errorOutput = null;

  // Override console.log and console.error
  console.log = (output) => { logOutput = output; };
  console.error = (message, error) => { errorOutput = error; };

  // Test 1: Successful fetch
  mockFetch([{ url: "https://example.com/cat.jpg" }]);
  logOutput = null; // Reset logOutput before each test
  await getCatUrl();
  if (logOutput && logOutput.url === "https://example.com/cat.jpg") {
    originalLog("Test 1 passed: Successful fetch logs correct data.");
  } else {
    originalLog("Test 1 failed: Successful fetch did not log expected data.");
  }

  // Test 2: Fetch error
  mockFetch(new Error("Fetch failed"), true);
  errorOutput = null; // Reset errorOutput before each test
  await getCatUrl();
  if (errorOutput && errorOutput.message === "Fetch failed") {
    originalLog("Test 2 passed: Fetch error logs correct error.");
  } else {
    originalLog("Test 2 failed: Fetch error did not log expected error.");
  }

  // Restore console and fetch to their original functions
  console.log = originalLog;
  console.error = originalError;
  restoreFetch();
})();
