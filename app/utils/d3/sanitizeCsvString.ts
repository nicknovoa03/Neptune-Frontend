/**
 * Function to sanitize CSV string, ensuring it contains only CSV data
 * @param {string} input - The raw input string
 * @returns {string} - The sanitized CSV string
 */
export function sanitizeCsvString(input: string): string {
  // Regular expression to match CSV lines (header and data rows)
  const csvRegex = /(?:^|\n)(source,target,type(?:\n.*)*)$/

  // Use the regular expression to extract the CSV portion of the input
  const match = input.match(csvRegex)

  // If a match is found, return the matched CSV string, otherwise return an empty string
  return match ? match[1].trim() : ''
}
