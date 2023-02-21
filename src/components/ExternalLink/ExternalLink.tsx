import { LinkProps } from '@mui/material';
import { useClasses } from 'hooks';
import { styles as style } from './ExternalLink.styles';

export const ExternalLink = ({ href, children, fontSize }: any) => {
  const styles = useClasses(style);

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={styles.externalLink}
      style={{fontSize: fontSize ?? '12px'}}
    >
      {children}
    </a>
  );
};
