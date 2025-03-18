#!/bin/bash

# Create a temporary directory for cloning
TMP_DIR=$(mktemp -d)
REPOS_DIR=$(pwd)

echo "Cloning Model Context Protocol servers repository to temporary directory..."
git clone https://github.com/modelcontextprotocol/servers.git "$TMP_DIR"

# List of MCP servers to extract
MCP_SERVERS=(
  "github"
  "git"
  "brave-search"
  "fetch"
  "filesystem"
  "sequentialthinking"
  "time"
)

# Copy each MCP server to the project root and create a git submodule
for server in "${MCP_SERVERS[@]}"; do
  echo "Setting up $server MCP server..."
  
  # Create the server directory in the project root
  mkdir -p "$REPOS_DIR/$server"
  
  # Copy the server files from src/$server to the project root
  cp -r "$TMP_DIR/src/$server/"* "$REPOS_DIR/$server/"
  
  # Add the server directory to git
  git add "$REPOS_DIR/$server"
  
  echo "$server MCP server added."
done

# Clean up
echo "Cleaning up..."
rm -rf "$TMP_DIR"

echo "All specified MCP servers have been added to the project root." 