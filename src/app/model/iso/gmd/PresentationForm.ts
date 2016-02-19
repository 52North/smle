/**
 * mode in which the data is represented
 */
export type PresentationForm =
  /**
   * digital representation of a primarily textual item (can contain illustrations also)
   */
  'documentDigital' |
  /**
   * representation of a primarily textual item (can contain illustrations also)
   * on paper, photograhic material, or other media
   */
  'imageDigital' |
  /**
   * likeness of natural or man-made features, objects, and activities acquired
   * through the sensing of visual or any other segment of the electromagnetic
   * spectrum by sensors, such as thermal infrared, and high resolution radar
   * and stored in digital format
   */
  'documentHardcopy' |
  /**
   * likeness of natural or man-made features, objects, and activities acquired
   * through the sensing of visual or any other segment of the electromagnetic
   * spectrum by sensors, such as thermal infrared, and high resolution radar
   * and reproduced on paper, photographic material, or other media for use
   * directly by the human user
   */
  'imageHardcopy' |
  /**
   * map represented in raster or vector form
   */
  'mapDigital' |
  /**
   * map printed on paper, photographic material, or other media for use
   * directly by the human user
   */
  'mapHardcopy' |
  /**
   * multi-dimensional digital representation of a feature, process, etc.
   */
  'modelDigital' |
  /**
   * 3-dimensional, physical model
   */
  'modelHardcopy' |
  /**
   * vertical cross-section in digital form
   */
  'profileDigital' |
  /**
   * vertical cross-section printed on paper, etc.
   */
  'profileHardcopy' |
  /**
   * digital representation of facts or figures systematically displayed,
   * especially in columns
   */
  'tableDigital' |
  /**
   * representation of facts or figures systematically displayed, especially
   * in columns, printed onpapers, photographic material, or other media
   */
  'tableHardcopy' |
  /**
   * digital video recording
   */
  'videoDigital' |
  /**
   * video recording on film
   */
  'videoHardcopy';
