#!/bin/bash

function run_align {
    local filtered_sequences=$1
    local reference_sequence=$2
    local output_dir=$3

    augur align \
      --sequences "$filtered_sequences" \
      --reference-sequence "$reference_sequence" \
      --output "$output_dir/aligned.fasta" \
      --fill-gaps
}
