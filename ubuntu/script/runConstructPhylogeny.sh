#!/bin/bash

function run_tree {
    local aligned_sequences=$1
    local output_dir=$2

    augur tree \
      --alignment "$aligned_sequences" \
      --output "$output_dir/tree_raw.nwk"
}
