!include "MUI2.nsh"

Name "{{appName}}"
BrandingText "{{devName}}"

# set the icon
!define MUI_ICON "icon.ico"

# define the resulting installer's name:
OutFile "..\dist\{{appFolder}}Setup.exe"

# set the installation directory
InstallDir "$PROGRAMFILES\{{appName}}\"

# app dialogs
!insertmacro MUI_PAGE_WELCOME
!insertmacro MUI_PAGE_INSTFILES

!define MUI_FINISHPAGE_RUN_TEXT "Start {{appName}}"
!define MUI_FINISHPAGE_RUN $INSTDIR\{{appName}}.exe

!insertmacro MUI_PAGE_FINISH
!insertmacro MUI_LANGUAGE "English"

# default section start
Section

  # delete the installed files
  RMDir /r $INSTDIR

  # define the path to which the installer should install
  SetOutPath $INSTDIR

  # specify the files to go in the output path
  File /r ..\build\{{appFolder}}\win32\*

  # create the uninstaller
  WriteUninstaller "$INSTDIR\Uninstall {{appName}}.exe"

  # create shortcuts in the start menu and on the desktop
  CreateShortCut "$SMPROGRAMS\{{appName}}.lnk" "$INSTDIR\{{appName}}.exe"
  CreateShortCut "$SMPROGRAMS\Uninstall {{appName}}.lnk" "$INSTDIR\Uninstall {{appName}}.exe"
  CreateShortCut "$DESKTOP\{{appName}}.lnk" "$INSTDIR\{{appName}}.exe"

SectionEnd

# create a section to define what the uninstaller does
Section "Uninstall"

  # delete the installed files
  RMDir /r $INSTDIR

  # delete the shortcuts
  Delete "$SMPROGRAMS\{{appName}}.lnk"
  Delete "$SMPROGRAMS\Uninstall {{appName}}.lnk"
  Delete "$DESKTOP\{{appName}}.lnk"

SectionEnd
