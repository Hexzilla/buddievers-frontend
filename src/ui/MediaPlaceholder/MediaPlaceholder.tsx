import { useClasses, useThemeOptions } from 'hooks';
import WhiteLogo from 'assets/images/logo_white.svg';
import Logo from 'assets/images/logo.svg';
import { styles } from './MediaPlaceholder.styles';

export const Placeholder = ({ style }: { style?: Record<string, string> }) => {
  const { isDarkTheme } = useThemeOptions();
  const { img, placeholder } = useClasses(styles);
  return (
    <div className={placeholder} style={style}>
      <img src={isDarkTheme ? WhiteLogo : Logo} className={img} alt="" />
    </div>
  );
};
