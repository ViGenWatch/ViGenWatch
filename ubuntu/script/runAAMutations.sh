#!/bin/bash

function run_translate {
    local tree=$1
    local nt_muts=$2
    local reference_sequence=$3
    local output_dir=$4

    augur translate \
      --tree "$tree" \
      --ancestral-sequences "$nt_muts" \
      --reference-sequence "$reference_sequence" \
      --output-node-data "$output_dir/aa_muts.json"
}
