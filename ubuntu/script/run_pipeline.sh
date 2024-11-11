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

mkdir -p "$DIRECTORY_PATH/auspice"
mkdir -p "$DIRECTORY_PATH/result"

run_index "$SEQUENCES" "$DIRECTORY_PATH"
run_filter "$SEQUENCES" "$DIRECTORY_PATH/sequence_index.tsv" "$METADATA" "$CONFIG_DIR" "$droppedTrains" "$includeTrains" "$DIRECTORY_PATH"
run_align "$DIRECTORY_PATH/filtered.fasta" "$CONFIG_DIR/$virusOutgroup" "$DIRECTORY_PATH"
run_tree "$DIRECTORY_PATH/aligned.fasta" "$DIRECTORY_PATH"
run_refine "$DIRECTORY_PATH/tree_raw.nwk" "$DIRECTORY_PATH/aligned.fasta" "$METADATA" "$DIRECTORY_PATH"
run_traits "$DIRECTORY_PATH/tree.nwk" "$METADATA" "$DIRECTORY_PATH"
run_ancestral "$DIRECTORY_PATH/tree.nwk" "$DIRECTORY_PATH/aligned.fasta" "$DIRECTORY_PATH"
run_translate "$DIRECTORY_PATH/tree.nwk" "$DIRECTORY_PATH/nt_muts.json" "$CONFIG_DIR/$virusOutgroup" "$DIRECTORY_PATH"
run_export "$DIRECTORY_PATH/tree.nwk" "$METADATA" "$DIRECTORY_PATH" "$CONFIG_DIR" "$colors" "$latLongs" "$auspiceConfig"

