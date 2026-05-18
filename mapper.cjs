const fs = require('fs');

const mappings = {
  "free-10k-practice-questions.jpg": "10000+ free practice questions.jpg",
  "gate-cs-test-series-2027.jpg": "challenging test series gate cs.jpg",
  "gate-da-test-series-2027.jpg": "challenging test series gate da.jpg",
  "super100.jpg": "super100.jpg",
  "gate-cs-core-2027.jpg": "gate cs 2027 core.jpg",
  "gate-cs-core-plus-2027.jpg": "gate cs 2027 core plus.jpg",
  "gate-cs-core-2028.jpg": "gate cs 2028 core.jpg",
  "gate-cs-core-plus-2028.jpg": "gate cs 2028 core plus.jpg",
  "gate-cs-core-2029.jpg": "gate cs 2029 core.jpg",
  "gate-cs-core-plus-2029.jpg": "gate cs 2029 core plus.jpg",
  "gate-da-core-2027.jpg": "gate da 2027 core.jpg",
  "gate-da-core-plus-2027.jpg": "gate da 2027 core plus.jpg",
  "gate-da-core-2028.jpg": "gate da 2028 core.jpg",
  "gate-da-core-plus-2028.jpg": "gate da 2028 core plus.jpg",
  "gate-da-core-2029.jpg": "gate da 2029 core.jpg",
  "gate-da-core-plus-2029.jpg": "gate da 2029 core plus.jpg",
  "gate-cs-da-core-2027.jpg": "gate cs+da 2027 core.jpg",
  "gate-cs-da-core-2028.jpg": "gate cs+da 2028 core.jpg",
  "gate-cs-da-core-2029.jpg": "gate cs+da 2029 core.jpg",
  "ugc-net-dec-2026.jpg": "ugc net dec 2026.jpg",
  "ugc-net-june-2027.jpg": "ugc net june 2027.jpg",
  "dsa-java-leetcode.jpg": "dsa with java.jpg",
  "practical-ai-ml.jpg": "practical ai ml program.jpg",
};

let content = fs.readFileSync('src/CoursesPage.jsx', 'utf8');

for (const [oldName, newName] of Object.entries(mappings)) {
    const safeOldName = oldName.replace(/\+/g, '\\+');
    content = content.replace(new RegExp(`"/courses/${safeOldName}"`, 'g'), `"/courses/${newName}"`);
}

fs.writeFileSync('src/CoursesPage.jsx', content);

// Copy the files
for (const [oldName, newName] of Object.entries(mappings)) {
    if (fs.existsSync(`courses images/${newName}`)) {
        fs.copyFileSync(`courses images/${newName}`, `public/courses/${newName}`);
        console.log(`Copied ${newName}`);
    } else {
        console.log(`Not found: ${newName}`);
    }
}
