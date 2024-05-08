#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

console.log(chalk.blue
      (`\n\t\t\t<====================================================>`)
);
console.log(chalk.bold.underline.green("\n\t\t\t >>--*** WELCOME TO THE STUDENT MANAGEMENT SYSTEM ***--<<\n"));
console.log(chalk.blue(`\n\t\t\t<====================================================>`));
class student {
    id: string;
    name: string;
    courseEnrolled: string[];
    feesAmount: number;

    constructor(id: string, name: string, courseEnrolled: string[], feesAmount: number) {
        this.id = id
        this.name = name
        this.courseEnrolled = courseEnrolled
        this.feesAmount = feesAmount
    }
}

let basedId = 10000;
let studentId: string = "";
let continueEnrollement = true;
let students: student[] = [];

do {
    let response = await inquirer.prompt({
        name: "answer1",
        message: chalk.bold.italic.yellowBright("Please select an option:\n"),
        type: "list",
        choices: ["Enrolled a student", "Show student status"],

    })

    if (response.answer1 === "Enrolled a student") {
        let studentName = await inquirer.prompt({
            name: "answer2",
            message: chalk.bold.italic.yellowBright("=> Please Enter your name: "),
            type: "input",
        })
        let trimedstudentName = (studentName.answer2).trim().toLowerCase();
        let studentNameCheck = students.map(obj => obj.name)

        if (studentNameCheck.includes(trimedstudentName) === false) {
            if (trimedstudentName !== "") {
                basedId++
                studentId = "STID" + basedId
                console.log(chalk.blue
                  (`\n\t\t\t<====================================================>`)
            );
                console.log(chalk.bold.italic.red(`\n\t\t\t\t Welcome ${trimedstudentName}!`));
                console.log(chalk.bold.italic.red("\n\t\t\t\t Your account has been created\n"));
                console.log(chalk.blue
                  (`\n\t\t\t<====================================================>`)
            );
                let course = await inquirer.prompt({
                    name: "answer3",
                    message: chalk.bold.italic.yellowBright("Please select a course"),
                    type: "list",
                    choices: ["=> GENERATIVE AI", "=> WEB 3.0 & METAVERSE ", "=> TYPESCRIPT", "=> JAVASCRIPT", "=> PYTHON", "=> C#"]
                })

                let courseFees = 500;
                switch (course.answer3) {
                    case "- GENERATIVE AI":
                        courseFees = 6000;
                        break;

                    case "- WEB 3.0 & METAVERSE":
                        courseFees = 4000;
                        break;

                    case "- TYPESCRIPT":
                        courseFees = 1000;
                        break;

                    case "- JAVASCRIPT":
                        courseFees = 1000;
                        break;

                    case "- PYTHON":
                        courseFees = 800;
                        break;

                    case "- C#":
                        courseFees = 500;
                        break;

                }

                let courseConfirm = await inquirer.prompt({
                    name: "answer4",
                    type: "confirm",
                    message: chalk.bold.italic.yellowBright("Do you want to enroll in this course?"),
                })
                if (courseConfirm.answer4 === true) {
                    let Student = new student(studentId, trimedstudentName, [course.answer3], courseFees)

                    students.push(Student)
                    console.log(chalk.blue
                      (`\n\t\t\t<====================================================>`)
                );

                    console.log(chalk.bold.italic.greenBright.underline(`\n\t\t\tCongratulations! You have enrolled in  ${course.answer3} course \n`));
                    console.log(chalk.blue
                      (`\n\t\t\t<====================================================>`)
                );
                }
            } else {
                console.log(chalk.italic.redBright.bold("Invalid name!"));
            }
        } else {
            console.log(chalk.italic.redBright.bold("This name is already exists!"));

        }
    } else if (response.answer1 === "Show student status") {
        if (students.length !== 0) {
            let studentNameCheck = students.map(e => e.name);

            let selectedStudent = await inquirer.prompt({
                name: "answer5",
                message: chalk.bold.italic.yellowBright("Please select name"),
                type: "list",
                choices: studentNameCheck,

            })
            let foundStudent = students.find(Student => Student.name === selectedStudent.answer5)

            console.log("Student information");
            console.log(foundStudent);
            console.log("\n");
        } else {
            console.log(chalk.italic.redBright.bold("Record is empty!"));

        }
    }

    let userConfirm = await inquirer.prompt({
        name: "answer6",
        message: chalk.bold.italic.yellowBright("Do you want to continue?"),
        type: "confirm",
    })
    if (userConfirm.answer6 === false) {
        continueEnrollement = false
        
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
          break;
    
        }
} while (continueEnrollement);