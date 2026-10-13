import fs from 'fs';

function main() {
  const content = fs.readFileSync("./extracted-end.js", "utf-8");
  
  console.log("=== Extracted JS length ===", content.length);
  
  // Let's search for arrays starting with Ho= or similar variable names
  // In our previous output: "var Ho=[{id:1,img:`https://readdy.ai/api/search-image?query=Cinematic..."
  // This means Ho is the portfolio items array! Let's print its content nicely.
  console.log("\n--- EXAMINING Ho VARIABLE ---");
  const hoIndex = content.indexOf("var Ho=");
  if (hoIndex !== -1) {
    console.log("Found Ho at index:", hoIndex);
    // Let's print the next 4000 characters from Ho
    console.log(content.substring(hoIndex, hoIndex + 4000));
  } else {
    console.log("Could not find Ho directly, matching with regex for arrays...");
  }

  // Let's find any other arrays (like testimonials or services)
  // Let's search for patterns like "[{id:1" or "id:" or "testimonial" etc.
  const regex = /var [A-Za-z0-9_]+=\[\{/g;
  let match;
  console.log("\n--- FINDING ALL ARRAYS IN SCRIPT ---");
  while ((match = regex.exec(content)) !== null) {
    console.log(`Matched array declaration: ${match[0]} at index ${match.index}`);
    console.log(content.substring(match.index, match.index + 2000));
    console.log("------------------------------------------");
  }
}

main();
