const http = require('http');
const fs = require('fs');
const readline = require('readline');
const port = 3000;
const fileLoc = 'data.json';
let students = [];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


// Function to calculate grade
function calculateGrade(marks) {
  const total = marks.english + marks.math + marks.physics + marks.chemistry + marks.bio + marks.geography + marks.history;
  const percentage = (total / 700) * 100;
  let grade;

  if (percentage >= 90) {
    grade = 'A+';
  } else if (percentage >= 80) {
    grade = 'A';
  } else if (percentage >= 70) {
    grade = 'B+';
  } else if (percentage >= 60) {
    grade = 'B';
  } else if (percentage >= 50) {
    grade = 'C';
  } else if (percentage >= 40) {
    grade = 'D';
  } else {
    grade = 'Fail';
  }

  return { total, percentage, grade };
}

// Function to write data to file
function writeToFile(data) {
  fs.writeFile(fileLoc, JSON.stringify(data), (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Data written to file Successfully');
    }
  });
}

// Function to get data from user
function getDataFromUser(req, res) {
  rl.question('Name: ', (name) => {
    rl.question('Roll Number: ', (rollNumber) => {
      rl.question('English: ', (english) => {
        rl.question('Math: ', (math) => {
          rl.question('Physics: ', (physics) => {
            rl.question('Chemistry: ', (chemistry) => {
              rl.question('Bio: ', (bio) => {
                rl.question('Geography: ', (geography) => {
                  rl.question('History: ', (history) => {
                    const data = {
                      name,
                      rollNumber,
                      marks: {
                        english: parseInt(english),
                        math: parseInt(math),
                        physics: parseInt(physics),
                        chemistry: parseInt(chemistry),
                        bio: parseInt(bio),
                        geography: parseInt(geography),
                        history: parseInt(history)
                      }
                    };

                    const gradeData = calculateGrade(data.marks);
                    data.totalMarksObtained = gradeData.total;
                    data.percentage = gradeData.percentage;
                    data.grade = gradeData.grade;

                    students.push(data);
                    writeToFile(students);
                    res.end('Data Received');
                  });
                });
              });
            });
          });
        });
      });
    });
  });
}

// Function to display menu....
function displayMenu(req, res) {
  const menu = 
  `
    <h1>Student Grade Calculator</h1>
    <ul>
      <li><a href="/enter-data">Enter Student Data</a></li>
      <li><a href="/view-data">View Student Data</a></li>
    </ul>
  `;
  res.end(menu);
}

// Function to view student data....
function viewStudentData(req, res) {
  fs.readFile(fileLoc, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.end('Error reading file');
    } else {
      try {
        students = JSON.parse(data);
        res.end(JSON.stringify(students));
      } catch (err) {
        console.error(err);
        res.end('Error parsing data');
      }
    }
  });
}

// Creating HTTP server....
const server = http.createServer((req, res) => {
  switch (req.url) {
    case '/':
      displayMenu(req, res);
      break;

    case '/enter-data':
      getDataFromUser(req, res);
      break;


    case '/view-data':
      viewStudentData(req, res);
      break;
      
    default:
      res.end('Unvalid input');
  }
});

// Startaring the Server at given port....

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
