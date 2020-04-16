export default function getFirstImageUrl(images) {
  if (images.length) {
    return images[0].url;
  }
  return undefined;
}
