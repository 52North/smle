#!/bin/bash -e

sed 's|static length: number = 0;||' -i 'node_modules/es7-reflect-metadata/src/shim/set.ts'
sed 's|static length: number = 0;||' -i 'node_modules/es7-reflect-metadata/src/shim/map.ts'
