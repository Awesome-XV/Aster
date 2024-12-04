import os
import json

# Initialize an empty list to store the JSON entries
entries = []

# Function to find the first file with a given extension in a directory and its subdirectories
def find_file_with_extension(directory, extensions):
    for root, _, files in os.walk(directory):
        for file in files:
            if file.lower().endswith(extensions):
                return os.path.relpath(os.path.join(root, file), directory).replace('\\', '/')
    return None

# Function to generate JSON entries for games
def generate_game_entries(root_dir):
    # Loop through each folder in the root directory
    for folder_name in os.listdir(root_dir):
        folder_path = os.path.join(root_dir, folder_name)
        
        if os.path.isdir(folder_path):
            # Find the first image file (png, icon, jpg) in the folder and its subfolders
            img_file = find_file_with_extension(folder_path, ('.png', '.jpg', '.jpeg', '.ico', '.svg'))
            
            # Find the first HTML file in the folder and its subfolders
            html_file = find_file_with_extension(folder_path, ('.html',))
            
            # Create a JSON entry
            if img_file:
                entry = {
                    "id": folder_name,
                    "imgSrc": img_file,
                    "title": folder_name.replace('-', ' ').title(),
                    "htmlFile": html_file if html_file else "index.html"
                }
                entries.append(entry)

# Main function
def main():
    # Prompt the user to enter the root directory
    root_dir = input("Enter the root directory: ").strip()
    
    # Generate game entries
    generate_game_entries(root_dir)
    
    # Write the list to a JSON file with indentation for readability
    with open('games.json', 'w') as json_file:
        json.dump(entries, json_file, indent=4)

if __name__ == "__main__":
    main()