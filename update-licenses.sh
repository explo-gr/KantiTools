#!/bin/bash
# Script to update license attributions for React Native component

# Paths
OUTPUT_FILE="./src/config/attributions/attribution.json"

# Generate licenses JSON and filter only required fields
npx license-checker --json | jq 'with_entries(.value |= {licenses, repository, publisher})' > "$OUTPUT_FILE"

echo "✅ License attribution updated: $OUTPUT_FILE"
