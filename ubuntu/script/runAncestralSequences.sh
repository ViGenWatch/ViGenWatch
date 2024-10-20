#!/bin/bash

function run_ancestral {
    local tree=$1
    local aligned_sequences=$2
    local output_dir=$3

    augur ancestral \
      --tree "$tree" \
      --alignment "$aligned_sequences" \
      --output-node-data "$output_dir/nt_muts.json" \
      --inference joint
}
