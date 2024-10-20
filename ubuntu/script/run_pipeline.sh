#!/bin/bash

source ./runIndexSequences.sh
source ./runFilterSequences.sh
source ./runAlignSequences.sh
source ./runConstructPhylogeny.sh
source ./runRefindTree.sh
source ./runAncestralTraits.sh
source ./runAncestralSequences.sh
source ./runAAMutations.sh
source ./runExport.sh

DIRECTORY_PATH=$1
SEQUENCES="$DIRECTORY_PATH/sequences.fasta"
METADATA="$DIRECTORY_PATH/metadata.tsv"
CONFIG_DIR="$DIRECTORY_PATH/config"

mkdir -p "$DIRECTORY_PATH/auspice"

run_index "$SEQUENCES" "$DIRECTORY_PATH"
run_filter "$SEQUENCES" "$DIRECTORY_PATH/sequence_index.tsv" "$METADATA" "$CONFIG_DIR/dropped_strains.txt" "$DIRECTORY_PATH"
run_align "$DIRECTORY_PATH/filtered.fasta" "$CONFIG_DIR/zika_outgroup.gb" "$DIRECTORY_PATH"
run_tree "$DIRECTORY_PATH/aligned.fasta" "$DIRECTORY_PATH"
run_refine "$DIRECTORY_PATH/tree_raw.nwk" "$DIRECTORY_PATH/aligned.fasta" "$METADATA" "$DIRECTORY_PATH"
run_traits "$DIRECTORY_PATH/tree.nwk" "$METADATA" "$DIRECTORY_PATH"
run_ancestral "$DIRECTORY_PATH/tree.nwk" "$DIRECTORY_PATH/aligned.fasta" "$DIRECTORY_PATH"
run_translate "$DIRECTORY_PATH/tree.nwk" "$DIRECTORY_PATH/nt_muts.json" "$CONFIG_DIR/zika_outgroup.gb" "$DIRECTORY_PATH"
run_export "$DIRECTORY_PATH/tree.nwk" "$METADATA" "$DIRECTORY_PATH" "$CONFIG_DIR"

echo "Hoàn tất! File JSON cho Auspice đã được tạo tại: $DIRECTORY_PATH/auspice/zika.json"
