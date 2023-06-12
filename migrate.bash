#!/bin/bash

# Set your database ID and collection IDs
DATABASE_ID="646538e35dd17306c589"
SOURCE_COLLECTION_ID="646538eeeface7a4cd39"
DESTINATION_COLLECTION_ID="648785f8d079d1a1e1d0"

# List all documents in the source collection
DOCUMENTS=$(appwrite databases listDocuments --databaseId $DATABASE_ID --collectionId $SOURCE_COLLECTION_ID --json)

# Iterate over the documents
for DOCUMENT in $(echo "${DOCUMENTS}" | jq -c '.documents[]'); do
    # Get the document ID, data and permissions
    DOCUMENT_ID=$(echo $DOCUMENT | jq -r '."$id"')
    DATA=$(echo $DOCUMENT | jq -r '.data')
    PERMISSIONS=$(echo $DOCUMENT | jq -r '.["$permissions"]')

    # Create a new document in the destination collection with the same data and permissions
    appwrite databases createDocument --databaseId $DATABASE_ID --collectionId $DESTINATION_COLLECTION_ID --data "$DATA" --permissions "$PERMISSIONS"

    # Delete the document from the source collection (optional)
    # appwrite databases deleteDocument --databaseId $DATABASE_ID --collectionId $SOURCE_COLLECTION_ID --documentId $DOCUMENT_ID
done
