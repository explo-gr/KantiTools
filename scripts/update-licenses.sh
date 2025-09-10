#!/bin/bash
# Script to update attributions.json
# ⚠️ Run it from ./scripts

# Output path
OUTPUT_FILE="../src/config/attributions/attribution.json"

# Generate licenses JSON and filter required fields
npx license-checker --start ../ --json | jq 'with_entries(.value |= {licenses, repository, publisher})' > "$OUTPUT_FILE"

echo "✅ License attribution updated: $OUTPUT_FILE"
