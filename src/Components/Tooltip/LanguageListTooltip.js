import * as React from 'react';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';


const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    // maxWidth: 220,
    padding: 10,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}));

export default function LanguageListTooltip({ text, languages }) {
  return (
      <HtmlTooltip
        title={
          <section style={{ fontWeight: 'bolder' }}>
            <React.Fragment>
              <h3>Subtitles:</h3>
              <hr/>
              <ul style={{ marginLeft: 10, marginTop: 3 }}>
                {languages?.map((item, num) => {
                  return(
                    <li>{item.lang}</li>
                  )
                })}
              </ul>
            </React.Fragment>
          </section>
        }
        placement="right-start"
      >
      <span style={{ cursor: 'pointer' }}>{text}</span>
      </HtmlTooltip>
  );
}