import { useClasses, useThemeOptions } from 'hooks';
import { styles } from './MediaPlaceholder.styles';

export const Placeholder = ({ style }: { style?: Record<string, string> }) => {
  const { isDarkTheme } = useThemeOptions();
  const { img, placeholder } = useClasses(styles);
  return (
    <div className={placeholder} style={style}>
      <img
        src={
          isDarkTheme
            ? 'assets/images/logo_white.svg'
            : 'assets/images/logo.svg'
        }
        className={img}
        alt=""
      />
    </div>
  );
};
