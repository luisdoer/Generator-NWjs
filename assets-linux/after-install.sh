#!/bin/bash

# Link to the binary
ln -sf /opt/{{appFolder}}/{{appFolder}} /usr/local/bin/{{appFolder}}

# Launcher icon
desktop-file-install /opt/{{appFolder}}/{{appFolder}}.desktop
