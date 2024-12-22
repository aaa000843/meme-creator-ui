import cn, { ClassValue } from 'clsx';
import React, { FC } from 'react';
import { IconBaseProps, IconType as ReactIconType } from 'react-icons';
import { FaShapes } from 'react-icons/fa';
import { FaRegSave } from 'react-icons/fa';
import { ImSpinner2 } from 'react-icons/im';
import { ImCloudDownload } from 'react-icons/im';
import {
  LuArrowLeft,
  LuArrowRight,
  LuCreditCard,
  LuLaptop,
  LuPhone,
  LuPlus,
  LuShield,
} from 'react-icons/lu';
import { MdDeleteForever } from 'react-icons/md';
import { PiTextAaBold } from 'react-icons/pi';
import { PiSelectionBackground } from 'react-icons/pi';
import { PiSelectionForegroundLight } from 'react-icons/pi';
import { RiAlarmWarningFill } from 'react-icons/ri';

export type IconType = ReactIconType;
export interface IconProps extends IconBaseProps {
  classNames?: {
    container?: ClassValue;
    element?: ClassValue;
  };
  name: IconName;
}

export type IconName =
  | 'arrow-left'
  | 'arrow-right'
  | 'plus'
  | 'laptop'
  | 'credit-card'
  | 'shield'
  | 'spinner'
  | 'phone'
  | 'alarm-warning'
  | 'text'
  | 'shapes'
  | 'export'
  | 'save'
  | 'delete'
  | 'push-front'
  | 'move-back';

export const IconMap: Record<IconName, IconType> = {
  'alarm-warning': RiAlarmWarningFill,
  'arrow-left': LuArrowLeft,
  'arrow-right': LuArrowRight,
  'credit-card': LuCreditCard,
  laptop: LuLaptop,
  phone: LuPhone,
  plus: LuPlus,
  shield: LuShield,
  spinner: ImSpinner2,
  text: PiTextAaBold,
  shapes: FaShapes,
  export: ImCloudDownload,
  save: FaRegSave,
  'move-back': PiSelectionBackground,
  'push-front': PiSelectionForegroundLight,
  delete: MdDeleteForever,
};

const Icon: FC<IconProps> = (props) => {
  const { classNames, name, ...svgProps } = props;

  const getIcon = (svgProps: IconBaseProps) => {
    if (!name) return null;
    const IconCmp = IconMap[name];
    return <IconCmp className={cn(classNames?.element)} {...svgProps} />;
  };

  return (
    <span className={cn(classNames?.container, 'Icon-component')}>
      {getIcon(svgProps)}
    </span>
  );
};

export default Icon;
