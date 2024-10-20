#!/bin/bash

function run_refine {
    local tree_raw=$1
    local aligned_sequences=$2
    local metadata=$3
    local output_dir=$4

    augur refine \
      --tree "$tree_raw" \
      --alignment "$aligned_sequences" \
      --metadata "$metadata" \
      --output-tree "$output_dir/tree.nwk" \
      --output-node-data "$output_dir/branch_lengths.json"
}
