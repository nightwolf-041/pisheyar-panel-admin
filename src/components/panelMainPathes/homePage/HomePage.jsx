import React from 'react'
import {withRouter, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import axiosConfig from '../../../axiosConfigure/axiosConfig'
import PanelMain from '../../panelMain/PanelMain'
import HomePageTopBox from './HomePageTopBox'
import { Line } from 'react-chartjs-2';
import classes from './homePage.module.css'

function HomePage(props) {

    const data = {
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        datasets: [
          {
            label: 'نمودار درامد در ماه',
            backgroundColor: '#0b103370',
            borderColor: '#0b1033',
            borderWidth: 1,
            hoverBackgroundColor: '#ffd617',
            hoverBorderColor: '#0b1033',
            data: [100000, 200000, 350000, 410000, 800000, 120000, 100000, 200000, 170000, 95000, 660000, 10000]
          }
        ]
      };

    return (
        <PanelMain transparentBack={true}>
            <div className={classes.HomePageTopBoxes}>
                <HomePageTopBox 
                title='تعداد سفارشات انجام شده'
                count={720}
                />
                <HomePageTopBox 
                title='تعداد سفارشات انجام شده'
                count={720}
                />
                <HomePageTopBox 
                title='تعداد سفارشات انجام شده'
                count={720}
                />
                <HomePageTopBox 
                title='تعداد سفارشات انجام شده'
                count={720}
                />
                <HomePageTopBox 
                title='تعداد سفارشات انجام شده'
                count={720}
                />
            </div>
            <h4 className={classes.homePageChartTtile}>
                نمودار درامد در ماه
            </h4>
            <Line
            data={data}
            width={100}
            height={50}
            />
        </PanelMain>
    )
}

export default withRouter(HomePage)
