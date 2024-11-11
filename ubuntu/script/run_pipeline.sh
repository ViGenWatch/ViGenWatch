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

auspiceConfig=""
colors=""
droppedTrains=""
latLongs=""
virusOutgroup=""

i=$(($#-1))
while [ $i -ge 0 ]; do
    case ${BASH_ARGV[$i]} in
        --auspiceConfig=*)
            auspiceConfig="${BASH_ARGV[$i]#*=}"
            ;;
        --colors=*)
            colors="${BASH_ARGV[$i]#*=}"
            ;;
        --droppedTrains=*)
            droppedTrains="${BASH_ARGV[$i]#*=}"
            ;;
        --includeTrains=*)
            includeTrains="${BASH_ARGV[$i]#*=}"
            ;;
        --latLongs=*)
            latLongs="${BASH_ARGV[$i]#*=}"
            ;;
        --virusOutgroup=*)
            virusOutgroup="${BASH_ARGV[$i]#*=}"
            ;;
    esac
    i=$((i-1))
done

DIRECTORY_PATH=$1


SEQUENCES="$DIRECTORY_PATH/sequences.fasta"
METADATA="$DIRECTORY_PATH/metadata.tsv"
CONFIG_DIR="$DIRECTORY_PATH/config"
RESULT_DIR="$DIRECTORY_PATH/result"

mkdir -p "$DIRECTORY_PATH/auspice"
mkdir -p "$DIRECTORY_PATH/result"

run_index "$SEQUENCES" "$RESULT_DIR"
run_filter "$SEQUENCES" "$RESULT_DIR/sequence_index.tsv" "$METADATA" "$CONFIG_DIR" "$droppedTrains" "$includeTrains" "$RESULT_DIR"
run_align "$RESULT_DIR/filtered.fasta" "$CONFIG_DIR/$virusOutgroup" "$RESULT_DIR"
run_tree "$RESULT_DIR/aligned.fasta" "$RESULT_DIR"
run_refine "$RESULT_DIR/tree_raw.nwk" "$RESULT_DIR/aligned.fasta" "$METADATA" "$RESULT_DIR"
run_traits "$RESULT_DIR/tree.nwk" "$METADATA" "$RESULT_DIR"
run_ancestral "$RESULT_DIR/tree.nwk" "$RESULT_DIR/aligned.fasta" "$RESULT_DIR"
run_translate "$RESULT_DIR/tree.nwk" "$RESULT_DIR/nt_muts.json" "$CONFIG_DIR/$virusOutgroup" "$RESULT_DIR"
run_export "$RESULT_DIR/tree.nwk" "$METADATA" "$DIRECTORY_PATH" "$CONFIG_DIR" "$colors" "$latLongs" "$auspiceConfig"

