export enum DeviceNames {
  TABLET = 'tablet',
  LAPTOP = 'laptop',
  DESKTOP = 'desktop',
}

export enum MediaMinWidthConstants {
  TABLET = 481,
  LAPTOP = 1025,
  DESKTOP = 1201,
}

export const MediaMinWidthSizes = {
  [DeviceNames.TABLET]: `${MediaMinWidthConstants.TABLET}px`,
  [DeviceNames.LAPTOP]: `${MediaMinWidthConstants.LAPTOP}px`,
  [DeviceNames.DESKTOP]: `${MediaMinWidthConstants.DESKTOP}px`,
} as const;

export const AppMinWidth = {
  min: 280,
} as const;
