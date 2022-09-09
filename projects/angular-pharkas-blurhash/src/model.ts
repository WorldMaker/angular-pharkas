/**
 * Image metadata useful for displaying a Blurhash
 */
export interface BlurhashDescription {
  /**
   * Width of the container
   */
  width: string | number
  /**
   * Width of the canvas the Blurhash is built in
   *
   * Defaults to `width` if it is a number, otherwise 160 (16x9)
   */
  canvasWidth?: number
  /**
   * Width of the container
   */
  height: string | number
  /**
   * Height of the canvas the Blurhash is built in
   *
   * Defaults to `height` if it is a number, otherwise 90 (16x9)
   */
  canvasHeight?: number
  /**
   * Blurhash of image
   */
  blurhash: string
  /**
   * Optional "punch" dial for the Blurhash (default is 1)
   */
  blurhashPunch?: number
  /**
   * Image src URL
   */
  imageSrc: string
  /**
   * Image alt description
   */
  imageAlt: string
}
