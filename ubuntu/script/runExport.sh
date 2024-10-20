#!/bin/bash

function run_export {
    local tree=$1
    local metadata=$2
    local output_dir=$3
    local config_dir=$4

    augur export v2 \
      --tree "$tree" \
      --metadata "$metadata" \
      --node-data "$output_dir/branch_lengths.json" \
                  "$output_dir/traits.json" \
                  "$output_dir/nt_muts.json" \
                  "$output_dir/aa_muts.json" \
      --colors "$config_dir/colors.tsv" \
      --lat-longs "$config_dir/lat_longs.tsv" \
      --auspice-config "$config_dir/auspice_config.json" \
      --output "$output_dir/auspice/zika.json"
}
