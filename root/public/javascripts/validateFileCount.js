function validateFileCount(input) {
    const minFiles = 1; // Minimum number of files
    const maxFiles = 6; // Maximum number of files

    const selectedFiles = input.files.length;
    if (selectedFiles < minFiles || selectedFiles > maxFiles) {
        input.setCustomValidity("Please select between " + minFiles + " and " + maxFiles + " images.");
    } else {
        input.setCustomValidity("");
    }
}