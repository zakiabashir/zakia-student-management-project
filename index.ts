#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

interface Student {
    [key: string]: {
      name: string;
      age: number;
      courses: string[];
      balance: number;
    };
  }
  let studentId = 5000;
  
  let studentData: Student = {};
  
  console.log(chalk.blue
    (`\n\t\t\t<====================================================>`)
  );
  console.log(chalk.bold.underline.green("\n\t\t\t >>--*** WELCOME TO THE STUDENT MANAGEMENT SYSTEM ***--<<\n"));
  console.log(chalk.blue(`\n\t\t\t<====================================================>`));
  
  let loop = true;
  while (loop) {
    let userChoices = await inquirer.prompt([
      {
        name: "userChoice",
        type: "list",
        message: chalk.yellow("What do you want to do"),
        choices: [
          "Add Students",
          "View Courses",
          "Enroll Student",
          "View Balance",
          "Pay Fees",
          "View Student Details",
          "Exit",
        ],
      },
    ]);
  
    // Add Student
    if (userChoices.userChoice === "Add Students") {
      let studentName = await inquirer.prompt([
        {
          name: "studentName",
          type: "input",
          message: chalk.yellow("Enter Student Name"),
        },
        {
          name: "age",
          type: "input",
          message: chalk.yellow("Enter Student Age"),
          validate: (input) => {
            if (input < 15) {
              return "Age Must be Above 15";
            }
            return true;
          },
        },
      ]);
  
      studentId++;
      let studentId1 = studentId.toString();
      studentData[studentId1] = {
        name: studentName.studentName,
        age: studentName.age,
        courses: [],
        balance: 10000,
      };
  
      console.log(chalk.blue
        (`\n\t<====================================================>`)
      );
      console.log(
        chalk
          .rgb(17, 215, 215)
          .bold(
            `\n\t\t student Added Successfully \n\t\tStudent " ${chalk.yellow.italic(
              studentData[studentId].name
            )} " \n`
          )
      );
      console.log(
        `\t\t${chalk.bold.rgb(
          17,
          215,
          215
        )("Student ID")} : ${chalk.yellow.bold.italic(studentId1)}\n`
      );
      console.log(
        chalk.bold.rgb(
          17,
          215,
          215
        )(
          `\t\tStudent Age : ${chalk.yellow.bold.italic(
            studentData[studentId].age
          )}`
        )
      );
  
      console.log(chalk.blue
        (`\n\t<====================================================>`)
      );
    }
    //    View Courses
    let courses = ["Java", "Python", "C++", "C#", "TypeScript"];
    if (userChoices.userChoice === "View Courses") {
      console.log(chalk.rgb(17, 215, 215).bold(`\t\t\nCourses =>\n`));
      console.log(chalk.blue
        (`\n\t<====================================================>`)
      );
      courses.forEach((course) => {
        console.log(chalk.rgb(17, 215, 215).bold(`\t\t ${chalk.yellow(course)}`));
      });
      console.log(chalk.blue
        (`\n\t<====================================================>`)
      );
    }
    //  Enroll Student
    if (userChoices.userChoice === "Enroll Student") {
      let enrollStudent = await inquirer.prompt([
        {
          name: "studentId",
          type: "input",
          message: chalk.yellow("Enter Student Id"),
          validate: (input) => {
            if (input in studentData) {
              return true;
            } else {
              return "Student not found";
            }
          },
        },
      ]);
      let searchId = parseInt(enrollStudent.studentId);
      if (searchId in studentData) {
        let course = await inquirer.prompt([
          {
            name: "course",
            type: "list",
            message: chalk.yellow("Select Course"),
            choices: courses,
          },
        ]);
        studentData[searchId].courses.push(course.course);
        console.log(chalk.blue
          (`\n\t<====================================================>`)
        );
        console.log(
          chalk
            .rgb(17, 215, 215)
            .bold(
              `\tStudent " ${chalk.yellow.italic(
                studentData[enrollStudent.studentId].name
              )} " Enrolled Successfully in ${course.course} \n`
            )
        );
        console.log(chalk.blue
          (`\n\t<====================================================>`)
        );
      } else if (studentData[enrollStudent.studentId] === undefined) {
        console.log(`Student not found\n`);
        console.log(`Make sure you are Entering Correct Id`);
        continue;
      }
    } else if (userChoices.userChoice === "View Balance") {
      let checkBalance = await inquirer.prompt([
        {
          name: "checkBalance",
          type: "number",
          message: chalk.yellow("Enter Student ID"),
          validate: (input) => {
            if (input in studentData) {
              return true;
            } else {
              return "Student not found";
            }
          },
        },
      ]);
      console.log(chalk.blue
        (`\n\t<====================================================>`)
      );
      console.log(
        chalk.bold.rgb(
          17,
          215,
          215
        )(`\t\tStudent ID : ${checkBalance.checkBalance}`)
      );
      console.log(
        chalk.bold.rgb(
          17,
          215,
          215
        )(`\t\tStudent Name : ${studentData[checkBalance.checkBalance].name}`)
      );
      console.log(
        chalk.bold.rgb(
          17,
          215,
          215
        )(
          `\t\tStudent Balance : $${
            studentData[checkBalance.checkBalance].balance
          }`
        )
      );
      console.log(chalk.blue
        (`\n\t<====================================================>`)
      );
    } else if (userChoices.userChoice === "Pay Fees") {
      let payFees = await inquirer.prompt([
        {
          name: "payFees",
          type: "number",
          message: chalk.yellow("Enter Student ID"),
          validate: (input) => {
            if (input in studentData) {
              return true;
            } else {
              return "Student not found";
            }
          },
        },
        {
          name: "selectCourse",
          type: "list",
          choices: [
            "Java => 100$",
            "Python => 500$",
            "C++ => 100$",
            "C# => 150$",
            "TypeScript => 200$",
          ],
          message: chalk.yellow("Select the Course"),
        },
      ]);
      console.log(chalk.blue
        (`\n\t<====================================================>`)
      );
      let amount = parseInt(payFees.selectCourse.split("=>")[1]);
      studentData[payFees.payFees].balance -= amount;
      console.log(chalk.bold.rgb(17, 215, 215)(`\t\tFees Paid Successfully`));
      console.log(
        chalk.bold.rgb(
          17,
          215,
          215
        )(
          `\t\tStudent Remaining Balance : ${
            studentData[payFees.payFees].balance
          }`
        )
      );
  
      console.log(chalk.blue
        (`\n\t<====================================================>`)
      );
    } else if (userChoices.userChoice === "View Student Details") {
      let viewStudentDetails = await inquirer.prompt([
        {
          name: "viewStudentDetails",
          type: "list",
          message: chalk.yellow("Select Operation"),
          choices: ["View all students", "Search Student"],
        },
      ]);
      if (viewStudentDetails.viewStudentDetails === "View all students") {
        console.log(chalk.blue
          (`\n\t<====================================================>`)
        );
        for (let studentId in studentData) {
          if (studentData[studentId].balance === 10000) {
            console.log(
              chalk.bold.rgb(
                17,
                215,
                215
              )(`\t\tStudent ID : ${chalk.bold(studentId)}`)
            );
            console.log(
              chalk.bold.rgb(
                17,
                215,
                215
              )(`\t\tStudent Name : ${studentData[studentId].name}`)
            );
            console.log(
              chalk.bold.rgb(
                17,
                215,
                215
              )(`\t\tStudent Age : ${studentData[studentId].age}`)
            );
            console.log(
              chalk.bold.rgb(
                17,
                215,
                215
              )(`\t\tStudent Balance : ${studentData[studentId].balance}`)
            );
            console.log(
              chalk.bold.rgb(
                17,
                215,
                215
              )(`\t\tStudent Courses : ${studentData[studentId].courses}`)
            );
            console.log(chalk.bold.rgb(17, 215, 215)(`\t\tStatus : Unpaid\n`));
          } else {
            console.log(
              chalk.bold.rgb(
                17,
                215,
                215
              )(`\t\tStudent ID : ${chalk.bold.italic(studentId)}`)
            );
            console.log(
              chalk.bold.rgb(
                17,
                215,
                215
              )(`\t\tStudent Name : ${studentData[studentId].name}`)
            );
            console.log(
              chalk.bold.rgb(
                17,
                215,
                215
              )(`\t\tStudent Age : ${studentData[studentId].age}`)
            );
  
            console.log(
              chalk.rgb(
                17,
                215,
                215
              )(`\t\tStudent Balance : ${studentData[studentId].balance}`)
            );
            console.log(
              chalk.bold.rgb(
                17,
                215,
                215
              )(`\t\tStudent Courses : ${studentData[studentId].courses}`)
            );
            console.log(chalk.bold.rgb(17, 215, 215)(`\t\tStatus : Paid\n`));
          }
        }
        console.log(chalk.blue
          (`\n\t<====================================================>`)
        );
      }
      if (viewStudentDetails.viewStudentDetails === "Search Student") {
        let searchStudent = await inquirer.prompt([
          {
            name: "searchStudent",
            type: "number",
            message: chalk.yellow("Enter Student ID"),
            validate: (input) => {
              if (input in studentData) {
                return true;
              } else {
                return "Student not found";
              }
            },
          },
        ]);
  
        console.log(chalk.blue
          (`\n\t<====================================================>`)
        );
  
        console.log(
          chalk.bold.rgb(
            17,
            215,
            215
          )(`\t\tStudent ID : ${chalk.bold(searchStudent.searchStudent)}`)
        );
        console.log(
          chalk.bold.rgb(
            17,
            215,
            215
          )(`\t\tStudent Name : ${studentData[searchStudent.searchStudent].name}`)
        );
        console.log(
          chalk.bold.rgb(
            17,
            215,
            215
          )(`\t\tStudent Age : ${studentData[studentId].age}`)
        );
        console.log(
          chalk.bold.rgb(
            17,
            215,
            215
          )(
            `\t\tStudent Balance : ${
              studentData[searchStudent.searchStudent].balance
            }`
          )
        );
        console.log(
          chalk.bold.rgb(
            17,
            215,
            215
          )(
            `\t\tStudent Courses : ${
              studentData[searchStudent.searchStudent].courses
            }`
          )
        );
        if (studentData[searchStudent.searchStudent].balance === 10000) {
          console.log(chalk.bold.rgb(17, 215, 215)(`\t\tStatus : Unpaid\n`));
        } else {
          console.log(chalk.bold.rgb(17, 215, 215)(`\t\tStatus : Paid\n`));
        }
        console.log(chalk.blue
          (`\n\t<====================================================>`)
        );
      }
    } else if (userChoices.userChoice === "Exit") {
      loop = false;
      console.log(
        chalk.green(
          `\t<===========================================================================>`
        ) + chalk.yellow(`\t<===============>`)
      );
      console.log(
        chalk.yellow(
          `\t THANKS FOR USING THIS CLI-STUDENT-MANAGEMENT-PROJECT PROGRAM CREATOR BY: =>`
        ) + chalk.blue(`\t "ZAKIA BASHIR"`)
      );
      console.log(
        chalk.green(
          `\t<==========================================================================>`
        ) + chalk.yellow(`\t<===============>`)
      );
    }
  }