import React from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import axiosConfig from '../../../axiosConfigure/axiosConfig'
import PanelMainOrderRequestListhead from '../../panelMain/panelMainHeads/PanelMainOrderRequestListhead'
import PanelMain from '../../panelMain/PanelMain'
import * as pagesActionCreators from '../../../storeConfigure/actionCreators/pagesActionCreators'
import MaterialTable from "material-table";
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

import './orderRequestList.css'


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


class OrderRequestList extends React.Component{

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
                  field: "message",
                  title: "پیام",
                    options: {
                        filter: true,
                        sort: true,
                        fontFamily: 'Yekan'
                    }
                },
                {
                  field: "offeredPrice",
                  title: "قیمت پیشنهادی",
                    options: {
                        filter: true,
                        sort: true
                    }
                },
                {
                  field: "modifiedDate",
                  title: "تاریخ درخواست",
                  editable: 'never',
                    options: {
                        filter: false,
                        sort: false
                    }
                },
                {
                  field: "isAllowed",
                  title: "وضعیت چت",
                  editable: 'never',
                    options: {
                        filter: false,
                        sort: false
                    }
                },
                {
                  field: "isAccepted",
                  title: "وضعیت قبولی",
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

        axiosConfig.get(`/Order/${this.props.orderGuid}/GetOrderRequests`, {
          headers: { Authorization: "Bearer " + this.props.token }
        }).then(res => {
            console.log(res);
            this.setState({
                loading: false,
                // data: res.data.orderRequests
            })

            let data = res.data.orderRequests
            data.map(d => {
              if(d.isAllowed === true) {
                d.isAllowed = 'باز'
              } else {
                d.isAllowed = 'بسته'
              }
              if(d.isAccepted === true) {
                d.isAccepted = 'قبول شده'
              } else {
                d.isAccepted = 'قبول نشده'
              }
              return d.isAllowed, d.isAccepted
            })
            this.setState({
                data: res.data.orderRequests
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


    render() {
        return (
            <>
            <PanelMain header={<PanelMainOrderRequestListhead />}>
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
                    <MaterialTable
                        style={{ margin: "20px", minWidth: "30%" }}
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
                        title="لیست سفارش ها"
                        columns={this.state.columns}
                        data={this.state.data}
                        actions={[
                            {
                              icon: Description,
                              tooltip: 'مشاهده چت ها',
                              onClick: (event, rowData) => {
                                this.props.onSaveOrderRequestGuidForChats(rowData.orderRequestGuid)
                                this.props.history.push('/orderRequestChats' )
                                this.props.history.state = 'showOrderRequestChats'
                            }
                            },
                            // {
                            //     icon: Info,
                            //     tooltip: 'اطلاعات',
                            //     onClick: (event, rowData) => {
                            //       this.props.onSaveOrderRequest(rowData.orderGuid)
                            //     }
                            // }
                          ]}
                        editable={{
                        // onRowUpdate: (newData, oldData) =>
                        //     new Promise(resolve => {
                        //     setTimeout(() => {
                        //         resolve();
                        //         if (oldData) {
                        //         this.setState(prevState => {
                        //             axiosConfig
                        //             .patch("/Post/GetAll/" + oldData.chatroomId, {
                        //                 title: newData.title
                        //             }, {
                        //                 headers: { Authorization: "Bearer " + this.props.token }
                        //             })
                        //             .then(({ data }) => {})
                        //             .catch(function(error) {
                        //                 console.log("error:update group", error);
                        //             });
                        //             const data = [...prevState.data];
                        //             data[data.indexOf(oldData)] = newData;
                        //             return { ...prevState, data };
                        //         });
                        //         }
                        //     }, 600);
                        //     }),
                        onRowDelete: oldData =>
                            
                          new Promise((resolve, reject) => {
                            axiosConfig
                              .post(`/OrderRequest/Delete/${oldData.orderRequestGuid}`, {
                                guid: oldData.orderRequestGuid
                              }, {
                                headers: { Authorization: "Bearer " + this.props.token }
                            }).then(res => {
                                
                              if(res.data.state === 1) {
                                this.setState(prevState => {
                                  const data = [...prevState.data];
                                  data.splice(data.indexOf(oldData), 1);
                                  return { ...prevState, data };
                                }, () => {
                                  resolve()
                                  toast('درخواست با موفقیت حذف شد', {type: toast.TYPE.SUCCESS});
                                })
                              } else{
                                reject()
                                toast('خطا در حذف درخواست', {type: toast.TYPE.ERROR});
                              }

                            }).catch(err => {
                              reject()
                              toast('خطا در حذف درخواست', {type: toast.TYPE.ERROR});
                            })
                            
                          })
                        }}
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
      token: state.authReducer.token,
      orderGuid: state.pages.orderGuid
    }
}

const mapDispatch = dispatch => {
    return {
      onSaveOrderRequestGuidForChats: (orderRequestGuid) => dispatch(pagesActionCreators.saveOrderRequestGuidForChats(orderRequestGuid))
    }
}

export default connect(mapState, mapDispatch)(withRouter(OrderRequestList))