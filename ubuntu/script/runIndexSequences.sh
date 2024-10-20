#!/bin/bash

function run_index {
    local sequences=$1
    local output_dir=$2
    augur index \
      --sequences "$sequences" \
      --output "$output_dir/sequence_index.tsv"
}