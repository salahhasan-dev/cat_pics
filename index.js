async function getCatUrl() {
  try {
    const response = await fetch("https://api.thecatapi.com/v1/images/search");
    const data = await response.json();
    console.log(data[0]);
  } catch (error) {
    console.error("Error:", error);
  }
}

getCatUrl();
