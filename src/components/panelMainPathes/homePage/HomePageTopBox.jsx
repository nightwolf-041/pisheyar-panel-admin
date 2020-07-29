import React from 'react'
import classes from './homePage.module.css'

function HomePageTopBox(props) {
    return (
        <div className={classes.HomePageTopBox}>
            <h6 className={classes.HomePageTopBoxTitle}>
                {props.title}
            </h6>
            <h6 className={classes.HomePageTopBoxCount}>
                {props.count}
            </h6>
        </div>
    )
}

export default HomePageTopBox
