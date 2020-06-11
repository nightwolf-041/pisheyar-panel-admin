import React from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import axiosConfig from '../../../axiosConfigure/axiosConfig'
import PanelMain from '../../panelMain/PanelMain'
import classes from 'financialReport.module.css'

function FinancialReport() {
    return (
        <PanelMain transparentBack={true}>
            <div className={classes.financialTopBox}></div>
        </PanelMain>
    )
}

export default FinancialReport
