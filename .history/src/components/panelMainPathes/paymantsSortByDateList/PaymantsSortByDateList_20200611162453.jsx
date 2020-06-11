import React from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import axiosConfig from '../../../axiosConfigure/axiosConfig'
import PanelMainSortedPaymentsListhead from '../../panelMain/panelMainHeads/PanelMainSortedPaymentsListhead'
import PanelMain from '../../panelMain/PanelMain'
import { DatePicker, RangeDatePicker  } from "jalali-react-datepicker";

import MaterialTable from "material-table";
import { withStyles } from '@material-ui/styles';
import { green } from '@material-ui/core/colors';
import {Button, CircularProgress} from '@material-ui/core'
import { forwardRef } from "react";
import AddBox from "@material-ui/icons/AddBox";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Description from "@material-ui/icons/Description";
import Info from "@material-ui/icons/Info";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import mainClasses from './paymentSortByDateList.module.css'


const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const styles = theme => ({
    buttonSuccess: {
      width: '100%',
      backgroundColor: green[500],
      '&:hover': {
        backgroundColor: green[700],
      },
      color: '#ffffff'
    },
    buttonProgress: {
      color: green[500],
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
    }
  });


class PaymentsList extends React.Component{

    constructor(props){
        super(props)
        this.state = {

          loading: false,
          errorMsg: null,

            columns: [
                {
                  field: "contractor",
                  title: "سرویس دهنده",
                    options: {
                        filter: true,
                        sort: true,
                        fontFamily: 'Yekan'
                    }
                },
                {
                  field: "cost",
                  title: "قیمت",
                    options: {
                        filter: true,
                        sort: true,
                        fontFamily: 'Yekan'
                    }
                },
                {
                  field: "discount",
                  title: "تخفیف",
                    options: {
                        filter: true,
                        sort: true
                    }
                },
                {
                  field: "isSuccessful",
                  title: "وضعیت",
                  editable: 'never',
                    options: {
                        filter: false,
                        sort: false
                    }
                },
                {
                  field: "trackingToken",
                  title: "کد رهگیری",
                  editable: 'never',
                    options: {
                        filter: false,
                        sort: false
                    }
                },
                {
                  field: "creationDate",
                  title: "تاریخ ایجاد",
                  editable: 'never',
                    options: {
                        filter: false,
                        sort: false
                    }
                },
            ],
    
          data: []
        }

        this.tableRef = React.createRef();
    }

    errorOnSending = () => toast(this.state.errorMsg, {type: toast.TYPE.ERROR});
    errorOnCatch = () => toast('خطای شبکه', {type: toast.TYPE.ERROR});
    successOnSending = () => toast(this.state.errorMsg, {type: toast.TYPE.SUCCESS});


    componentDidMount() {
        this.setState({loading: true})

        axiosConfig.get('/Payment/GetAll', {
          headers: { Authorization: "Bearer " + this.props.token }
        }).then(res => {
            console.log(res.data.payments);
            this.setState({
                loading: false,
                // data: res.data.payments
            })

            let data = res.data.payments
            data.map(d => {
              if(d.trackingToken === null) {
                d.trackingToken = 'ثبت نشده است'
              } else {
                d.trackingToken = d.trackingToken
              }
              if(d.isSuccessful === true) {
                d.isSuccessful = 'موفق'
              } else {
                d.isSuccessful = 'ناموفق'
              }
              return d.trackingToken, d.isSuccessful
            })
            this.setState({
                data: res.data.payments
            })

        }).catch(err => {
            console.log(err);
            this.errorOnCatch()

            this.setState({
                loading: false,
                errorMsg: err.message
            })

        //  this.errorOnCatch()
        })
    }

    sortTableHandler = () => {

    }

    logger({ start, end }) {
        console.log("start ", start);
        console.log("end ", end);
      }

    render() {

        const {classes} = this.props;

        return (
            <>
            
            <PanelMain header={<PanelMainSortedPaymentsListhead />}>
                {
                  this.state.loading ?
                  <div className="d-flex justify-content-center">
                    <div className="spinner-border d-block mr-2" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                    <strong className="d-block">در حال بارگیری</strong>
                  </div>
                   
                  : null
                }

                <div style={{ width: "100%" }} dir="rtl">

                    <div className={mainClasses.datePickersBox}>
                        <div className={mainClasses.datePickersBoxRight}>
                            <div className={mainClasses.datePickerKeeper}>
                                <RangeDatePicker
                                onClickSubmitButton={val => this.logger(val)}
                                timePicker={false}
                                fromLabel="از تاریخ"
                                toLabel="تا تاریخ"
                                />
                            </div>
                            <div className={mainClasses.datePickerKeeper}>
                                {/* <span>تا:</span>
                                <DatePicker timePicker={false} /> */}
                            </div>
                        </div>
                        <div className={mainClasses.wrapper}>
                            <Button
                                variant="contained"
                                // color="success"
                                className={classes.buttonSuccess}
                                disabled={this.state.loadingOnSend || this.state.loading}
                                onClick={this.sortTableHandler}
                                >
                                اعمال فیلتر
                            </Button>
                            {this.state.loadingOnSend || this.state.loading ? <CircularProgress size={24} className={classes.buttonProgress} /> : null}
                        </div>
                    </div>

                    <MaterialTable
                        style={{ margin: 0, minWidth: "30%", boxShadow: 'none' }}
                        tableRef={this.tableRef}
                        localization={{
                        header: { actions: "کنترل" },
                        grouping: {
                          placeholder: "جهت دسته بندی سرستون را اینجا بکشید",
                          groupedBy: "دسته بندی براساس"
                        },
                        body: {
                            addTooltip: "افزودن",
                            deleteTooltip: "حذف",
                            editTooltip: "ویرایش",
                            emptyDataSourceMessage: "گروهی برای نمایش وجود ندارد",
                            editRow: {
                            deleteText: "از حذف این سطر اطمینان دارید؟"
                            }
                        },
                        toolbar: {
                            exportAriaLabel: "خروجی",
                            exportTitle: "خروجی",
                            exportName: "خروجی فرمت CSV",
                            searchTooltip: "جستجو",
                            searchPlaceholder: "جستجو"
                        },
                        pagination: {
                            nextTooltip: "صفحه بعد",
                            previousTooltip: "صفحه قبل",
                            firstTooltip: "صفحه اول",
                            lastTooltip: "صفحه آخر",
                            labelRowsSelect: "ردیف",
                            labelDisplayedRows: "{from}-{to} از {count}"
                        }
                        }}
                        options={{
                        grouping: true,
                        sorting: false,
                        pageSize: 10,
                        pageSizeOptions: [10, 20, 30]
                        }}
                        icons={tableIcons}
                        title="لیست پرداخت ها بر اساس زمان"
                        columns={this.state.columns}
                        data={this.state.data}
                    />
                </div>

                <ToastContainer autoClose={4000}
                  position={toast.POSITION.BOTTOM_LEFT}
                  hideProgressBar={false}
                  closeOnClick={true}
                  pauseOnVisibilityChange={false}
                  pauseOnHover={false}
                  rtl={true} />

            </PanelMain>
            </>
        )
    }
}


const mapState = state => {
    return {
      token: state.authReducer.token
    }
}

export default connect(mapState)(withRouter(withStyles(styles)(PaymentsList)))