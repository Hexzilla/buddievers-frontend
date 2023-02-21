import React, { ReactNode } from 'react';
import Button from '@mui/material/Button';
import { Box, Tooltip, Typography } from '@mui/material';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import { styles } from './AddressDisplayComponent.styles';
import { getExplorerLink } from 'utils';
import { useActiveWeb3React, useClasses } from 'hooks';
import { ExternalLink } from 'components/ExternalLink/ExternalLink';

const CHARS_SHOWN = 3;
const TXT_COPY_ADDRESS = 'Copy Address';
const MIN_LENGTH = 5;

const _fallbackCopyTextToClipboard = (text: string): void => {
  let textArea = document.createElement('textarea');
  textArea.value = text;

  textArea.style.top = '0';
  textArea.style.left = '0';
  textArea.style.position = 'fixed';

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    document.execCommand('copy');
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
  }

  document.body.removeChild(textArea);
};

const _copyTextToClipboard = (text: string): void => {
  if (!navigator.clipboard) {
    _fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).then(
    function () {
      // console.log('Async: Copying to clipboard was successful!');
    },
    function (err) {
      console.error('Async: Could not copy text: ', err);
    }
  );
};

export const AddressDisplayComponent = (props: {
  children: ReactNode;
  charsShown: number;
  dontShowLink?: boolean;
  className?: string;
  buttonClassName?: string;
}) => {
  const text = props.children?.toString() || '';
  const charsShown = props.charsShown ? props.charsShown : CHARS_SHOWN;

  const { copyButton } = useClasses(styles);
  const { chainId } = useActiveWeb3React();

  const _apply_ellipsis = (): string => {
    let _text = text;

    if (_text.length > MIN_LENGTH) {
      return (
        _text.substr(0, charsShown) +
        '...' +
        _text.substr(_text.length - Math.floor(charsShown), _text.length)
      );
    }

    return _text;
  };

  return (
    <React.Fragment>
      <Box display="flex" alignItems="center">
        <Tooltip title={text}>
          {!props.dontShowLink ? (
            <Typography className={props.className}>
              <ExternalLink href={getExplorerLink(chainId, text, 'address')}>
                {_apply_ellipsis()}
              </ExternalLink>
            </Typography>
          ) : (
            <Typography className={props.className}>
              {_apply_ellipsis()}
            </Typography>
          )}
        </Tooltip>
        <Tooltip title={TXT_COPY_ADDRESS}>
          <Button
            className={`${copyButton} ${props.buttonClassName}`}
            size="small"
            onClick={() => {
              _copyTextToClipboard(text);
            }}
          >
            <FileCopyOutlinedIcon color="secondary" />
          </Button>
        </Tooltip>
      </Box>
    </React.Fragment>
  );
};
