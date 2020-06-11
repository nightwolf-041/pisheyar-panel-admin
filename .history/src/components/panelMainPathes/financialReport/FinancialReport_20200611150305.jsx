import React from 'react'
import {withRouter, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import axiosConfig from '../../../axiosConfigure/axiosConfig'
import PanelMain from '../../panelMain/PanelMain'
import classes from './financialReport.module.css'

function FinancialReport(props) {

    const redirectToLoyalUsers = () => {
        props.history.push('/loyalUsersList')
    }

    const redirectToPaymentsList = () => {
        props.history.push('/paymantsSortByDateList')
    }

    return (
        <PanelMain transparentBack={true}>
            <div className={classes.financialTopBox}>
                <button className={classes.financialTopButton}
                onClick={redirectToLoyalUsers}>
                    لیست کاربران وفادار
                </button>
                <button className={classes.financialTopButton}
                onClick={redirectToPaymentsList}>
                    لیست گزارشات
                </button>
                {/* <button className={classes.financialTopButton}></button> */}
            </div>
        </PanelMain>
    )
}

export default withRouter(FinancialReport)
