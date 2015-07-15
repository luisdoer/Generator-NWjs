var fs = require('fs'),
  path = require('path'),
  readline = require('readline'),
  chalk = require('chalk');

var appName, appFolder, appDescription, devName, devEmail, nwjsVersion,
  githubUsername='Null', githubRepoName='Null';

// Open a file and converts it to an arraylist of strings
function readFile(file) {
  var array = fs.readFileSync(file).toString().split("\n");
  return array;
}

// Open, replaces the values ​​of the variables and save the file
function setupFile(fileName) {
  var arrayContent = readFile(fileName)
  for(line in arrayContent) {
    arrayContent[line] = arrayContent[line].replace(/{{appName}}/g, appName);
    arrayContent[line] = arrayContent[line].replace(/{{appFolder}}/g, appFolder);
    arrayContent[line] = arrayContent[line].replace(/{{appDescription}}/g, appDescription);
    arrayContent[line] = arrayContent[line].replace(/{{devName}}/g, devName);
    arrayContent[line] = arrayContent[line].replace(/{{devEmail}}/g, devEmail);
    arrayContent[line] = arrayContent[line].replace(/{{nwjsVersion}}/g, nwjsVersion);
    arrayContent[line] = arrayContent[line].replace(/{{githubUsername}}/g, githubUsername);
    arrayContent[line] = arrayContent[line].replace(/{{githubRepoName}}/g, githubRepoName);
  }

  var content = arrayContent.join('\n');
  fs.writeFileSync(fileName, content);

  console.log('Modified: '+fileName);
}

function setupFiles() {
  console.log(chalk.yellow('Building project...'))

  //set values
  setupFile(path.join('package.json'));
  setupFile(path.join('gulpfile.coffee'));
  setupFile(path.join('assets-linux', 'after-install.sh'));
  setupFile(path.join('assets-linux', 'after-remove.sh'));
  setupFile(path.join('assets-linux', 'README.md'));
  setupFile(path.join('assets-osx', 'dmg.json'));
  setupFile(path.join('assets-windows', 'installer.nsi'));
  setupFile(path.join('src', 'package.json'));

  // rename files
  fs.renameSync(
    path.join('assets-linux', 'icons', '48', 'icon.png'),
    path.join('assets-linux', 'icons', '48', appFolder+'.png')
  );
  console.log('Modified: assets-linux/icons/48/'+appFolder+'.png');
  fs.renameSync(
    path.join('assets-linux', 'icons', '256', 'icon.png'),
    path.join('assets-linux', 'icons', '256', appFolder+'.png')
  );
  console.log('Modified: assets-linux/icons/256/'+appFolder+'.png');
}

function showRequisites() {
  console.log(chalk.yellow('Completed.'));
  console.log(chalk.yellow('\n[!] Now you can install the build requisites'));
  console.log('# Install Wine (Linux/Mac)\n'
    + 'http://winehq.org/');
  console.log('# Install Nsis (Windows)\n'
      + 'http://nsis.sourceforge.net/Main_Page');
  console.log('# Install Effing package management (Linux)\n'
      + 'gem install fpm');

  console.log(chalk.bgGreen.black('\n[  Follow me! http://twitter.com/luixom  ]\n\n'));
}

function deleteScript() {
  fs.unlinkSync('postinstall.js');
}

function init() {
  // Object to read input
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  // Object to colorize terminal strings
  var quest = chalk.bold.green;

  console.log(chalk.yellow('### Welcome to "Generator-NWjs" ###'));

  rl.question(quest('[?] What do you want to call your app? '), function(answer) {
    appName = answer;
    appFolder = appName.split(' ').join('');
    //console.log('App name: ', answer);

    rl.question(quest('[?] A little description for your app: '), function(answer) {
      appDescription = answer;
      //console.log('Description: ', answer);

      rl.question(quest('[?] What is the developer name? '), function(answer) {
        devName = answer;
        //console.log('Name: ', answer);

        rl.question(quest('[?] What is your support e-mail? '), function(answer) {
          devEmail = answer;
          //console.log('E-mail: ', answer);

          rl.question(quest('[?] Do you want to use latest NW.js? (Y/n) '), function(answer) {
            nwjsVersion = 'latest';
            if (answer == 'n' || answer == 'N') {
              rl.question('[?] What version you want to use? ', function(answer) {
                nwjsVersion = answer;
              });
            }
            //console.log('NWjs Version: ', nwjsVersion);

            rl.question(quest('[?] What is the Url of your Github repo? '), function(answer) {
              var gitPattern = /github\.com(\/|\:)([A-Za-z0-9-]+)\/([A-Za-z0-9_.-]+)(\.git)?/;
              var regex = gitPattern.exec(answer);
              if (regex) {
                githubUsername = regex[1];
                githubRepoName = regex[2];
                //console.log('Github url: ', answer);
              }
              rl.close();

              setupFiles();
              showRequisites();
              deleteScript();
            });
          });
        });
      });
    });
  });

}

init();
