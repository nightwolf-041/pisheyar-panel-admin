import React from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import axiosConfig from '../../../axiosConfigure/axiosConfig'
import PanelMainContractorsListhead from '../../panelMain/panelMainHeads/PanelMainContractorsListhead'
import PanelMain from '../../panelMain/PanelMain'
import ContractorsInfoModal from '../../UI/Modals/ContractorsInfoModal'
import PersonDisablerDialog from '../../UI/dialogs/PersonDisablerDialog'
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
import PersonAddDisabled from "@material-ui/icons/PersonAddDisabled";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

// import './ordersList.css'


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


class ContractorsList extends React.Component{

    constructor(props){
        super(props)
        this.state = {

          loading: false,
          errorMsg: null,

          showContractorInfoModal: null,
          contractorInfoModalData: null,

          showPersonDisablerDialog: false,
          PersonDisablerDialogData: null,
          personDisablerLoading: false,

            columns: [
                {
                  field: "firstName",
                  title: "نام",
                    options: {
                        filter: true,
                        sort: true,
                        fontFamily: 'Yekan'
                    }
                },
                {
                  field: "lastName",
                  title: "نام خانوادگی",
                    options: {
                        filter: true,
                        sort: true,
                        fontFamily: 'Yekan'
                    }
                },
                {
                  field: "gender",
                  title: "جنسیت",
                    options: {
                        filter: true,
                        sort: true
                    }
                },
                {
                  field: "city",
                  title: "شهر",
                  editable: 'never',
                    options: {
                        filter: false,
                        sort: false
                    }
                },
                {
                  field: "credit",
                  title: "اعتیار",
                  editable: 'never',
                    options: {
                        filter: false,
                        sort: false
                    }
                },
                {
                  field: "isActive",
                  title: "وضعیت اکانت",
                  editable: 'never',
                    options: {
                        filter: false,
                        sort: false
                    }
                },
                {
                  field: "isRegister",
                  title: "وضعیت ثبت نام",
                  editable: 'never',
                    options: {
                        filter: false,
                        sort: false
                    }
                },
                {
                  field: "phoneNumber",
                  title: "شماره تلفن",
                  editable: 'never',
                    options: {
                        filter: false,
                        sort: false
                    }
                },
                {
                  field: "registeredDate",
                  title: "تاریخ ثبت نام",
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

        axiosConfig.get('/Account/GetAllContractors', {
          headers: { Authorization: "Bearer " + this.props.token }
        }).then(res => {
            console.log(res.data);
            this.setState({
                loading: false,
                data: res.data.contractors
            })

            let data = res.data.contractors
            data.map(d => {
              if(d.isActive === true) {
                d.isActive = 'فعال'
              } else {
                d.isActive = 'غیر فعال'
              }
              if(d.isRegister === true) {
                d.isRegister = 'موفق'
              } else {
                d.isRegister = 'ناموفق'
              }
              return d.isActive, d.isRegister
            })
            this.setState({
                data: res.data.contractors
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

    hideContractorInfoModal = () => {
      this.setState({
        showContractorInfoModal: false
      })
    }

    closeDialogHandler = () => {
      this.setState({
        showPersonDisablerDialog: false
      })
    }

    personDisableHandler = () => {
      this.setState({
        personDisablerLoading: true
      })

      console.log(this.state.PersonDisablerDialogData);

      axiosConfig.post('/Account/ChangeActiveness', {
        userGuid: this.state.PersonDisablerDialogData.userGuid,
        isActive: false
      }, {
        headers: { Authorization: "Bearer " + this.props.token }
      }).then(firstRes => {
        console.log(firstRes);

        if(firstRes.data.state === 1) {
          toast('عملیات موفقیت آمیز', {type: toast.TYPE.SUCCESS});
        }

        if(firstRes.data.state === 2 || firstRes.data.state === 3 || firstRes.data.state === 4 ) {
          toast(firstRes.data.message, {type: toast.TYPE.ERROR});
        }

        axiosConfig.get('/Account/GetAllContractors', {
          headers: { Authorization: "Bearer " + this.props.token }
        }).then(res => {
            console.log(res.data);
            this.setState({
                loading: false,
                data: res.data.contractors
            })

            let data = res.data.contractors
            data.map(d => {
              if(d.isActive === true) {
                d.isActive = 'فعال'
              } else {
                d.isActive = 'غیر فعال'
              }
              if(d.isRegister === true) {
                d.isRegister = 'موفق'
              } else {
                d.isRegister = 'ناموفق'
              }
              return d.isActive, d.isRegister
            })
            this.setState({
                data: res.data.contractors,
                personDisablerLoading: false,
                showPersonDisablerDialog: false
            })

        }).catch(err => {
            console.log(err);
            toast('خطا در بارگیری مجدد لیست', {type: toast.TYPE.ERROR});

            this.setState({
                loading: false,
                errorMsg: err.message,
                personDisablerLoading: false,
                showPersonDisablerDialog: false
            })

        //  this.errorOnCatch()
        })
      }).catch(error => {
        toast('خطا در تغییر فعالیت کاربر', {type: toast.TYPE.ERROR});
      })
    }

    personActivatorHandler = () => {
      this.setState({
        personDisablerLoading: true
      })

      axiosConfig.post('/Account/ChangeActiveness', {
        userGuid: this.state.PersonDisablerDialogData.contractorGuid,
        isActive: true
      }, {
        headers: { Authorization: "Bearer " + this.props.token }
      }).then(firstRes => {
        if(firstRes.data.state === 1) {
          toast('عملیات موفقیت آمیز', {type: toast.TYPE.SUCCESS});
        }
        if(firstRes.data.state === 2 || firstRes.data.state === 3 || firstRes.data.state === 4 ) {
          toast(firstRes.data.message, {type: toast.TYPE.ERROR});
        }

        axiosConfig.get('/Account/GetAllContractors', {
          headers: { Authorization: "Bearer " + this.props.token }
        }).then(res => {
            console.log(res.data);
            this.setState({
                loading: false,
                data: res.data.contractors
            })

            let data = res.data.contractors
            data.map(d => {
              if(d.isActive === true) {
                d.isActive = 'فعال'
              } else {
                d.isActive = 'غیر فعال'
              }
              if(d.isRegister === true) {
                d.isRegister = 'موفق'
              } else {
                d.isRegister = 'ناموفق'
              }
              return d.isActive, d.isRegister
            })
            this.setState({
                data: res.data.contractors,
                personDisablerLoading: false,
                showPersonDisablerDialog: false
            })

        }).catch(err => {
            console.log(err);
            toast('خطا در بارگیری مجدد لیست', {type: toast.TYPE.ERROR});

            this.setState({
                loading: false,
                errorMsg: err.message,
                personDisablerLoading: false,
                showPersonDisablerDialog: false
            })
        })

      }).catch(error => {
        toast('خطا در تغییر فعالیت کاربر', {type: toast.TYPE.ERROR});
      })
    }


    render() {
        return (
            <>
            
            <PanelMain header={<PanelMainContractorsListhead />}>
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
                        title="لیست سرویس دهنده ها"
                        columns={this.state.columns}
                        data={this.state.data}
                        actions={[
                            {
                              icon: Description,
                              tooltip: 'مشاهده درخواست',
                              onClick: (event, rowData) => {
                                this.props.onSaveOrderRequest(rowData.orderGuid)
                                this.props.history.push('/OrderRequestList' )
                                this.props.history.state = 'showOrderRequest'
                            }
                            },
                            {
                                icon: Info,
                                tooltip: 'اطلاعات',
                                onClick: (event, rowData) => {
                                //   this.props.onSaveOrderRequest(rowData.orderGuid)
                                    this.setState({
                                        showContractorInfoModal: true,
                                        contractorInfoModalData: rowData
                                    })
                                }
                            },
                            {
                                icon: PersonAddDisabled,
                                tooltip: 'فعال/غیرفعال کردن',
                                onClick: (event, rowData) => {
                                    this.setState({
                                        showPersonDisablerDialog: true,
                                        PersonDisablerDialogData: rowData
                                    })
                                }
                            },
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
                              .post(`/Account/Delete/${oldData.contractorGuid}`, {
                                guid: oldData.contractorGuid
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
                                  toast('کاربر با موفقیت حذف شد', {type: toast.TYPE.SUCCESS});
                                })
                              } else{
                                reject()
                                toast('خطا در حذف کاربر', {type: toast.TYPE.ERROR});
                              }

                            }).catch(err => {
                              reject()
                              toast('خطا در حذف کاربر', {type: toast.TYPE.ERROR});
                            })
                            
                          })
                        }}
                    />
                </div>

            </PanelMain>

              <ContractorsInfoModal
                showContractorInfoModal={this.state.showContractorInfoModal}
                hideContractorInfoModal={this.hideContractorInfoModal}
                contractorInfoModalData={this.state.contractorInfoModalData}
                />

              <PersonDisablerDialog
                openDialog={this.state.showPersonDisablerDialog}
                data={this.state.PersonDisablerDialogData}
                closeDialogHandler={this.closeDialogHandler}
                personDisablerLoading={this.state.personDisablerLoading}
                personDisableHandler={this.personDisableHandler}
                personActivatorHandler={this.personActivatorHandler}
                />

              <ToastContainer autoClose={4000}
                position={toast.POSITION.BOTTOM_LEFT}
                hideProgressBar={false}
                closeOnClick={true}
                pauseOnVisibilityChange={false}
                pauseOnHover={false}
                rtl={true} />
            </>
        )
    }
}


const mapState = state => {
    return {
      token: state.authReducer.token,
    //   postGuid: state.pages.postGuid
    }
}

const mapDispatch = dispatch => {
    return {
        onSaveOrderRequest: (orderGuid) => dispatch(pagesActionCreators.saveOrderRequest(orderGuid))
    }
}

export default connect(mapState, mapDispatch)(withRouter(ContractorsList))