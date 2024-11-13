#!/bin/bash

function run_traits {
    local tree=$1
    local metadata=$2
    local output_dir=$3

    augur traits \
      --tree "$tree" \
      --metadata "$metadata" \
      --output-node-data "$output_dir/traits.json" \
      --columns region country division \
      --confidence
}
