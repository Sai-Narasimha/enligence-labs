export const cleanText = (text: string) => {
    return text
      .replace(/[*]/g, '') // Remove asterisks
      .replace(/:/g, '') // Remove colons
      .replace(/[-]/g, '') // Remove hyphens
      .replace(/(\*\*|__)/g, '') // Remove markdown bold/italic markers
      .replace(/\s{2,}/g, ' ') // Replace multiple spaces with a single space
      .trim(); // Trim any leading or trailing whitespace
  }