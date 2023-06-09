#!/bin/bash

ARG="$1"

# if ARG is not empty and ARG is not --dry-run
if [[ -n "$ARG" && "$ARG" != "--dry-run" ]]; then
    echo "Invalid argument: $ARG"
    exit 1
fi

echo "[publish] Publish NPM Package"
echo "-----------------------------"

echo "Building from webpack..."

npm run build

ERROR=$?

if [ "$ERROR" -ne 0 ]; then
    echo -e "\n-----------------------------"
    echo -e "\nError: Build failed"
    exit 1
fi

FLAGS="--private"

if [[ "$1" == "--dry-run" ]]; then
    echo "Set publish as dry run"
    FLAGS="$FLAGS --dry-run"
fi

echo "Publishing..."

eval "npm publish $FLAGS"

