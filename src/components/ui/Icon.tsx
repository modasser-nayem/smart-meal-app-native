import { MaterialCommunityIcons } from '@expo/vector-icons';
import { cssInterop } from 'nativewind';
import React from 'react';

// Interop to allow NativeWind `className` to set the `color` and `size` prop automatically
cssInterop(MaterialCommunityIcons, {
  className: {
    target: 'style',
    nativeStyleToProp: {
      color: true,
      fontSize: 'size', // Sometimes size inherits from fontSize
    },
  },
});

export type IconName = keyof typeof MaterialCommunityIcons.glyphMap;

interface IconProps extends React.ComponentProps<typeof MaterialCommunityIcons> {
  name: IconName;
  className?: string;
}

export const Icon = ({ name, className, ...props }: IconProps) => {
  return (
    <MaterialCommunityIcons name={name} className={className} {...props} />
  );
};
