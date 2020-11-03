export default async function fileToBase64(file: File): Promise<string> {
  if (!file) {
    throw new Error("File can't be null or undefined");
  }
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}
