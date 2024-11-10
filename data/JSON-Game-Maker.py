import os
import json

# Define the root directory containing the folders
root_dir = r'C:\Users\sudhi\Documents\GitHub\Aster'  # Using a raw string to avoid escape character issues

# Initialize an empty list to store the JSON entries
entries = []

# Loop through each folder in the root directory
for folder_name in os.listdir(root_dir):
    folder_path = os.path.join(root_dir, folder_name)
    
    if os.path.isdir(folder_path):
        # Find the first image file (png, icon, jpg) in the folder
        img_file = None
        for file_name in os.listdir(folder_path):
            if file_name.lower().endswith(('.png', '.jpg', '.jpeg', '.ico', '.svg')):
                img_file = file_name
                break
        
        # Create a JSON entry
        if img_file:
            entry = {
                "id": folder_name,
                "imgSrc": img_file,
                "title": folder_name.replace('-', ' ').title()
            }
            entries.append(entry)

# Write the list to a JSON file
with open('games.json', 'w') as json_file:
    json.dump(entries, json_file, separators=(',', ':'))