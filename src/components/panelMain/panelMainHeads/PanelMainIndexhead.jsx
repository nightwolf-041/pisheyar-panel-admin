// this file is header of panel main (/ route) 

import React from 'react';
import { Tooltip} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import classes from '../panelMain.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faEllipsisV, faCloudDownloadAlt } from '@fortawesome/free-solid-svg-icons'


const PanelMainIndexhead = (props) => {

    const useStylesBootstrap = makeStyles(theme => ({
        arrow: {
          color: theme.palette.common.black,
        },
        tooltip: {
          backgroundColor: theme.palette.common.black,
          fontFamily: 'Yekan'
        },
      }));
    
      function BootstrapTooltip(props) {
        const classes = useStylesBootstrap();
      
        return <Tooltip arrow classes={classes} {...props} />;
      }

    return (
        <>
            <div className={classes.mainSectionSpinnerBackdrop}></div>

            <div className={classes.mainSectionHeader}>
                <div className={classes.mainSectionHeaderDescs}>
                    <h5 className={classes.mainSectionHeaderTitle}>صفحه اصلی</h5>
                    {/* <p className={classes.mainSectionHeaderSubtitle}>خیلی کوچیکه</p> */}
                </div>
                <div className={classes.mainSectionHeaderIcons}>
                </div>
            </div>

        </>
    )
}

export default PanelMainIndexhead