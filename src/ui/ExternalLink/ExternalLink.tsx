import { useClasses } from 'hooks';
import { ReactNode } from 'react';
import { theme } from 'theme/Theme';
import { styles } from './ExternalLink.styles';

export const ExternalLink = ({
  href,
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
  href: string;
}) => {
  const {
    link
  } = useClasses(styles)
  return (
    <a
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      //activeStyle={{ color: theme.palette.text.primary }}
      className={`${link} ${className ?? ''}`}
    >
      {children}
    </a>
  );
};
