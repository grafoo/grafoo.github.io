#!/bin/bash

do_syndic() {
    pushd syndic

    which prettier >/dev/null &&
        prettier --single-quote --write *.js

    local old_release=$(grep '^const RELEASE' svcwrk.js | tr -dc '[:digit:]')
    local new_release=$((old_release+1))
    sed -i -E -e "s/^const RELEASE.+/const RELEASE = ${new_release};/" svcwrk.js

    git add --all &&
        git commit

    popd
}

case "$1" in
    syndic)
        do_syndic
        ;;
    *)
        echo "Usage: ${0} syndic"
        ;;
esac
