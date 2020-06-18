import React from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import axiosConfig from '../../../axiosConfigure/axiosConfig'
import PanelMainCodesListhead from '../../panelMain/panelMainHeads/PanelMainCodesListhead'
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
import Search from "@material-ui/icons/Search";
import ViewCarousel from "@material-ui/icons/ViewCarousel";
import ViewColumn from "@material-ui/icons/ViewColumn";
import Add from "@material-ui/icons/AddCircle";
import AssignmentTurnedIn from "@material-ui/icons/AssignmentTurnedIn";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

// import './postsList.css'


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


class CodesList extends React.Component{

    constructor(props){
        super(props)
        this.state = {

          loading: false,
          errorMsg: null,

            columns: [
                {
                  field: "name",
                  title: "نام",
                    options: {
                        filter: true,
                        sort: true,
                        fontFamily: 'Yekan'
                    }
                },
                {
                  field: "displayName",
                  title: "عنوان",
                    options: {
                        filter: true,
                        sort: true,
                        fontFamily: 'Yekan'
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

        axiosConfig.get(`/Code/GetCodesByCodeGroupGuid?guid=${this.props.codeGroupGuid}`, {
          headers: { Authorization: "Bearer " + this.props.token }
        }).then(res => {
            console.log(res);
            this.setState({loading: false})

            if(res.data.state === 1) {
              this.setState({
                  data: res.data.codes
              })
            }

            if(res.data.state === 2 || res.data.state === 3 || res.data.state === 4) {
              toast(res.data.message, {type: toast.TYPE.ERROR});
              this.setState({
                data: []
              })
            }

        }).catch(err => {

          this.setState({
            loading: false,
            errorMsg: err.message
          })

         this.errorOnCatch()
        })
    }


    render() {
        return (
            <>
            <PanelMain header={<PanelMainCodesListhead />}>
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
                        title="لیست گروه ها"
                        columns={this.state.columns}
                        data={this.state.data}
                        actions={[
                            // {
                            //   icon: Add,
                            //   tooltip: 'اضافه کردن',
                            //   onClick: (event, rowData) => {
                            //   }
                            // },
                            // {
                            //     icon: Add,
                            //     tooltip: 'Add User',
                            //     isFreeAction: true,
                            //     onClick: (event) => alert("You want to add a new row")
                            // },
                            {
                              icon: DeleteOutline,
                              tooltip: 'حذف',
                              onClick: (event, rowData) => {
                              }
                            },
                          ]}
                          editable={{
                            onRowAdd: newData => new Promise((resolve, reject) => {
                                console.log(newData);
                                axiosConfig.post('/Code/Create', {
                                    codeGroupGuid: this.props.codeGroupGuid,
                                    name: newData.name,
                                    displayName: newData.displayName,
                                }, {
                                    headers: { Authorization: "Bearer " + this.props.token }
                                }).then(res => {
                                    if(res.data.state === 1){
                                    this.setState(prevState => {
                                        const data = [...prevState.data];
                                        data.push(newData);
                                        return { ...prevState, data };
                                        }, () => {
                                            resolve()
                                            toast('کد با موفقیت اضافه شد', {type: toast.TYPE.SUCCESS});
                                        })
                                    }else{
                                        reject()
                                        toast(res.data.message, {type: toast.TYPE.ERROR});
                                    }
                                }).catch(err => {
                                    reject()
                                    toast('خطا در افزودن کد', {type: toast.TYPE.ERROR});
                                })
                            }),


                            onRowDelete: oldData =>
                            
                            new Promise((resolve, reject) => {
                              axiosConfig
                                .post(`/Code/Delete/${this.props.codeGroupGuid}`, {
                                  guid: this.props.codeGroupGuid
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
                                    toast('کد با موفقیت حذف شد', {type: toast.TYPE.SUCCESS});
                                  })
                                } else{
                                  reject()
                                  toast('خطا در حذف کد', {type: toast.TYPE.ERROR});
                                }
  
                              }).catch(err => {
                                reject()
                                toast('خطا در حذف کد', {type: toast.TYPE.ERROR});
                              })
                              
                            })
                          }}
                    />
                </div>

            </PanelMain>

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
      codeGroupGuid: state.pages.codeGroupGuid,
    }
}

const mapDispatch = dispatch => {
    return {
        onSaveCodeGroupList: (codeGroupGuid) => dispatch(pagesActionCreators.saveCodeGroupList(codeGroupGuid))
    }
}

export default connect(mapState, mapDispatch)(withRouter(CodesList))