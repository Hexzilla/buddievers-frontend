import Button from '@mui/material/Button/Button';
import { useClasses } from 'hooks';
import React, { useCallback } from 'react';
import { styles as style } from './OptionCard.styles';

export default function OptionCard({
  link = null,
  onClick = null,
  header,
  color,
  subheader = null,
  icon,
  active = false,
  id,
}: {
  link?: string | null;
  clickable?: boolean;
  size?: number | null;
  onClick?: null | (() => void);
  color: string;
  header: React.ReactNode;
  subheader: React.ReactNode | null;
  icon: string;
  active?: boolean;
  id: string;
}) {
  const styles = useClasses(style);

  const handleClick = useCallback(() => {
    if (link) window.open(link, '_blank');
    else onClick?.();
  }, [link, onClick]);

  return (
    <Button variant="outlined" style={{ color }} id={id} onClick={handleClick}>
      <div className={styles.optionElementContainer}>
        <div className={styles.optionCardLeft}>
          <div className={styles.headertext}>
            {!link && active ? (
              <div className={styles.circleWrapper}>
                <div className={styles.greenCircle}>
                  <div />
                </div>
              </div>
            ) : (
              ''
            )}
            {header}
          </div>
          {subheader && <div className={styles.subheader}>{subheader}</div>}
        </div>

        <div className={styles.iconWrapper}>
          <img className={styles.icon} src={icon} alt={'Icon'} />
        </div>
      </div>
    </Button>
  );
}
