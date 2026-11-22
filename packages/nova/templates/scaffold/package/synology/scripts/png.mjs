/**
 * Png - Signature.
 *
 * Stores the fixed eight-byte PNG signature used by icon validation.
 * Reading only the signature and IHDR keeps the checker dependency-free.
 *
 * @since UNRELEASED
 */
const pngSignature = Buffer.from([
  137,
  80,
  78,
  71,
  13,
  10,
  26,
  10,
]);

/**
 * Png - Read Png Dimensions.
 *
 * Reads a PNG's IHDR dimensions after validating its signature and header.
 * The package checker uses these values to enforce both DSM icon sizes.
 *
 * @param {Buffer} image - Image.
 *
 * @returns {SynologyPackage_PngDimensions}
 *
 * @since UNRELEASED
 */
export function readPngDimensions(image) {
  if (
    image.length < 24
    || image.subarray(0, pngSignature.length).equals(pngSignature) === false
    || image.subarray(12, 16).toString('ascii') !== 'IHDR'
  ) {
    throw new Error('The package icon is not a valid PNG with an IHDR chunk.');
  }

  return {
    width: image.readUInt32BE(16),
    height: image.readUInt32BE(20),
  };
}
