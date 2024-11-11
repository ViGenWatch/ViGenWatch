#!/bin/bash

function run_filter {
    local sequences=$1
    local sequence_index=$2
    local metadata=$3
    local config_dir=$4
    local exclude=$5
    local inlcude=$6
    local output_dir=$7

    augur filter \
      --sequences "$sequences" \
      --sequence-index "$sequence_index" \
      --metadata "$metadata" \
      ${exclude:+--exclude "$config_dir/$exclude"} \
      ${include:+--include "$config_dir/$include"} \
      --output "$output_dir/filtered.fasta" 
}