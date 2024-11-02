#!/bin/bash

function run_filter {
    local sequences=$1
    local sequence_index=$2
    local metadata=$3
    local exclude_strains=$4
    local output_dir=$5

    augur filter \
      --sequences "$sequences" \
      --sequence-index "$sequence_index" \
      --metadata "$metadata" \
      --exclude "$exclude_strains" \
      --output "$output_dir/filtered.fasta" \
      --group-by country year month \
      --sequences-per-group 20 \
      --min-date 2012
}