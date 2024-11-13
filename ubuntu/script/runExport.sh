#!/bin/bash

function run_export {
    local tree=$1
    local metadata=$2
    local output_dir=$3
    local config_dir=$4
    local colors=$5
    local latLongs=$6
    local auspiceConfig=$7

    augur export v2 \
      --tree "$tree" \
      --metadata "$metadata" \
      --node-data "$output_dir/result/branch_lengths.json" \
                  "$output_dir/result/traits.json" \
                  "$output_dir/result/nt_muts.json" \
                  "$output_dir/result/aa_muts.json" \
      ${colors:+--colors "$config_dir/$colors"} \
      ${latLongs:+--lat-longs "$config_dir/$latLongs"} \
      --auspice-config "$config_dir/$auspiceConfig" \
      --output "$output_dir/auspice/virus.json" 
}
