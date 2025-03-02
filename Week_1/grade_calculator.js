const fs = require('fs');
const readline = require('readline');

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
function getDataFromUser() {
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
                    displayMenu();
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

// Function to display menu
function displayMenu() {
  console.log('Student Grade Calculator');
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~');
  console.log('1. Enter Student Data');
  console.log('2. View Student Data');
  console.log('3. Exit');
  



  rl.question('Choose an option: ', (option) => {
    switch (option) {
      case '1':
        getDataFromUser();
        break;
      case '2':
        viewStudentData();
        break;
      case '3':
        process.exit();
      default:
        console.log('Invalid option. choose again.');
        displayMenu();
    }
  });
}
// Function to view student data
function viewStudentData() {
  fs.readFile(fileLoc, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      displayMenu();
    } else {
      try {
        students = JSON.parse(data);
        console.log(students);
        displayMenu();
      } catch (err) {
        console.error(err);
        displayMenu();
      }
    }
  });
}

displayMenu();