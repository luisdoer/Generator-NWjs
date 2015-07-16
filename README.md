# Generator-NWjs
A simple generator for NWjs (Node-webkit). The generator helps to setup a new project and package the app for different OS's and nwjs versions.


## Build

### Pre-requisites

    # install gulp
    npm install -g gulp

    # install dependencies and execute generator
	npm install

* [**wine**](http://winehq.org/): If you're on OS X/Linux and want to build for Windows, you need Wine installed. Wine is required in order
to set the correct icon for the exe. If you don't have Wine, you can comment out the `winIco` field in `gulpfile`.
* [**makensis**](http://nsis.sourceforge.net/Main_Page): Required by the `pack:win32` task in `gulpfile` to create the Windows installer.
* [**fpm**](https://github.com/jordansissel/fpm): Required by the `pack:linux{32|64}:deb` tasks in `gulpfile` to create the linux installers.

Quick install on OS X:

    brew install wine makensis
    sudo gem install fpm

## Usage

Clean directories used by the tasks

    gulp clean

Build win32 application and run it

    gulp run
 
 Run win32 application without building
 
    gulp open

### Generate packs

OS X: pack the app in a .dmg

    gulp pack:osx64

Windows: create the installer

    gulp pack:win32

Linux 32/64-bit: pack the app in a .deb

    gulp pack:linux{32|64}:deb

### Upload release to GitHub
If you need to distribute your installers just run the following command and auto-publish on the page [**releases**](releases/latest), :

    gulp release

## Contributions

Contributions are welcome!

## Follow me!
* [Github](http://github.com/luisdoer)
* [Tumblr](http://luisdoer.tumblr.com)
* [Twitter](http://twitter.com/luisdoer)

----------

**TIP**: The output is in `./dist`. Take a look in `gulpfile.coffee` for additional tasks.

**TIP**: Use the `--toolbar` parameter to quickly build the app with the toolbar on. E.g. `gulp build:win32 --toolbar`.

**TIP**: Use `gulp build:win32 --noicon` to quickly build the Windows app without the icon.

**TIP**: For OS X, use the `run:osx64` task to build the app and run it immediately.
