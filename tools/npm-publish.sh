#!/bin/bash

function usage() {
    echo "Usage: npm-publish.sh [-d] [-b]"
    echo "  -d: dry run"
    echo "  -b: build"
    exit 1
}

build=false
dry_run=false

while getopts ":bd" opt; do
    case "${opt}" in
    b)
        build=true
        ;;
    d)
        dry_run=true
        echo "Running in dry-run mode"
        ;;
    \?)
        echo "Invalid option: $OPTARG" 1>&2
        exit 1
        ;;
    :)
        echo "Invalid option: $OPTARG requires an argument" 1>&2
        exit 1
        ;;
    esac
done

if [ "$build" = true ]; then
    echo "Building dist..."

    if ! npm run build; then
        echo -e "\nerror: build failed"
        exit 1
    fi

fi

publish_options=""

if [ "$dry_run" = true ]; then
    publish_options="$publish_options --dry-run"
fi

echo "Publishing npm package..."

if ! npm publish "$FLAGS"; then
    echo -e "\nerror: publish failed"
    exit 1
fi

echo "Published to npm."

exit 0
