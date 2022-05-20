#!/usr/bin/env node
// import chalk from "chalk";
// import figlet from "figlet";
// import inquirer from "inquirer";
// import shell from "shelljs";
const inquirer = require("inquirer");
const chalk = require("chalk");
const figlet = require("figlet");
const shell = require("shelljs");

const init = () => {
    console.log(
        chalk.green(
            figlet.textSync("Create File  ", {
                font: "Ghost",
                horizontalLayout: "default",
                verticalLayout: "default"
            })
        )
    );
};

const askQuestions = () => {
    const questions = [
        {
            name: "FILENAME",
            type: "input",
            message: "What is the name of the file without extension?"
        },
        {
            type: "list",
            name: "EXTENSION",
            message: "What is the file extension?",
            choices: [".html", ".js", ".css", ".txt"],
            filter: function (val) {
                return val.split(".")[1];
            }
        }
    ];
    return inquirer.prompt(questions);
};

const createFile = (filename, extension) => {
    const filePath = `${process.cwd()}/${filename}.${extension}`
    shell.touch(filePath);
    return filePath;
};

const success = filepath => {
    console.log(
        chalk.white.bold(`🥳 Done! File created at ${filepath}`)
    );
};

const run = async () => {
    init();

    // ask questions
    const answers = await askQuestions();
    const { FILENAME, EXTENSION } = answers;

    // create the file
    const filePath = createFile(FILENAME, EXTENSION);

    //success message
    success(filePath);
};

run();