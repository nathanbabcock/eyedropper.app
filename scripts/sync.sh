#!/bin/bash

# Load env vars
set -o allexport
source .env
set +o allexport

# Sync javascript files first, with explicit Content-Type
# https://github.com/aws/aws-cli/issues/3367#issuecomment-531826747
jsOutput=$(aws s3 sync dist s3://eyedropper.app/ \
  --exclude "*" \
  --include "*.js" \
  --content-type "text/javascript" \
  --delete \
  --dryrun | tee /dev/tty)

# Sync the rest of the files (non-js)
nonJsOutput=$(
  aws s3 sync dist s3://eyedropper.app/ \
  --exclude "*.js" \
  --delete \
  --dryrun | tee /dev/tty
)

echo "files to invalidate:"
invalidations=$(echo "$jsOutput" | grep "upload:")
echo $invalidations
#  | grep 'upload:' \
#  | awk '{print "/"$4}' \
#  | echo

# # Create invalidations
# while read -r line; do
#    aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "$line"
# done < invalidation_paths.txt

# rm invalidation_paths.txt synced_files.txt
