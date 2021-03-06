import React from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import axiosConfig from '../../../axiosConfigure/axiosConfig'
import PanelMainPostsListhead from '../../panelMain/panelMainHeads/PanelMainPostsListhead'
import PanelMain from '../../panelMain/PanelMain'
import ChangeInSliderDialog from '../../UI/dialogs/ChangeInSliderDialog'
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
import AssignmentTurnedIn from "@material-ui/icons/AssignmentTurnedIn";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import './postsList.css'


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


class PostsList extends React.Component{

    constructor(props){
        super(props)
        this.state = {

          loading: false,
          errorMsg: null,
          
          openChangeSliderDialog: false,
          changeInSliderLoading: false,
          changeInSliderData: null,
          

          openSuggestionDialog: false,
          suggestionDialogLoading: false,
          suggestionDialogData: null,

            columns: [
                {
                  field: "title",
                  title: "عنوان",
                    options: {
                        filter: true,
                        sort: true,
                        fontFamily: 'Yekan'
                    }
                },
                {
                  field: "userFullName",
                  title: "نام کاربر",
                    options: {
                        filter: true,
                        sort: true
                    }
                },
                {
                  field: "viewCount",
                  title: "تعداد بازدید",
                  editable: 'never',
                    options: {
                        filter: false,
                        sort: false
                    }
                },
                {
                  field: "likeCount",
                  title: "تعداد لایک",
                  editable: 'never',
                    options: {
                        filter: false,
                        sort: false
                    }
                },
                {
                  field: "modifiedDate",
                  title: "تاریخ ویرایش",
                  editable: 'never',
                    options: {
                        filter: false,
                        sort: false
                    }
                },
                {
                  field: "isShow",
                  title: "قابلیت نمایش",
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

        axiosConfig.get('/Post/GetAll', {
          headers: { Authorization: "Bearer " + this.props.token }
        }).then(res => {
            console.log(res);
            this.setState({loading: false})

            if(res.data.state === 1) {
              let data = res.data.posts
              data.map(d => {
                if(d.postIsShow === true) {
                  d.postIsShow = 'نمایش'
                } else {
                  d.postIsShow = 'عدم نمایش'
                }
                return d.postIsShow
              })
              this.setState({
                  data: res.data.posts
              })
            }

            if(res.data.state === 2 || res.data.state === 3 || res.data.state === 4) {
              toast(res.data.message, {type: toast.TYPE.ERROR});
            }

        }).catch(err => {

          this.setState({
            loading: false,
            errorMsg: err.message
          })

         this.errorOnCatch()
        })
    }

    reFetchListData = () => {
      axiosConfig.get('/Post/GetAll', {
        headers: { Authorization: "Bearer " + this.props.token }
      }).then(res => {
          this.setState({loading: false})

          let data = res.data.posts
          data.map(d => {
            if(d.postIsShow === true) {
              d.postIsShow = 'نمایش'
            } else {
              d.postIsShow = 'عدم نمایش'
            }
            return d.postIsShow
          })
          this.setState({
            data: res.data.posts,
            openChangeSliderDialog: false,
            changeInSliderLoading: false
          })

      }).catch(err => {

        this.setState({
          loading: false,
          errorMsg: err.message,
          changeInSliderLoading: false
        })

       this.errorOnCatch()
      })
    }

    closeInSliderDialogHandler = () => {
      this.setState({
        openChangeSliderDialog: false,
      })
    }
    
    closeSuggestionDialogHandler = () => {
      this.setState({
        openSuggestionDialog: false,
      })
    }

    chekoutOfSliderHandler = () => {
      this.setState({
        changeInSliderLoading: true
      })

      axiosConfig.post('/Post/ChangeInSliderStatus', {
        postGuid: this.state.changeInSliderData.postGuid,
        inSliderStatus: false
      }, {
        headers: { Authorization: "Bearer " + this.props.token }
      }).then(firstRes => {
        if(firstRes.data.state === 1) {
          toast('عملیات موفقیت آمیز', {type: toast.TYPE.SUCCESS});

          this.reFetchListData()
        }

        if(firstRes.data.state === 2 || firstRes.data.state === 3 || firstRes.data.state === 4 ) {
          toast(firstRes.data.message, {type: toast.TYPE.ERROR});
          this.setState({
            changeInSliderLoading: false
          })
        }

      }).catch(error => {
        toast('خطا در تغییر وضعیت اسلایدر', {type: toast.TYPE.ERROR});
        this.setState({
          changeInSliderLoading: false
        })
      })
    }

    addToSliderHandler = () => {
      this.setState({
        changeInSliderLoading: true
      })

      axiosConfig.post('/Post/ChangeInSliderStatus', {
        postGuid: this.state.changeInSliderData.postGuid,
        inSliderStatus: true
      }, {
        headers: { Authorization: "Bearer " + this.props.token }
      }).then(firstRes => {
        if(firstRes.data.state === 1) {
          toast('عملیات موفقیت آمیز', {type: toast.TYPE.SUCCESS});

          this.reFetchListData()
        }

        if(firstRes.data.state === 2 || firstRes.data.state === 3 || firstRes.data.state === 4 ) {
          toast(firstRes.data.message, {type: toast.TYPE.ERROR});
          this.setState({
            changeInSliderLoading: false
          })
        }

      }).catch(error => {
        toast('خطا در تغییر وضعیت اسلایدر', {type: toast.TYPE.ERROR});
        this.setState({
          changeInSliderLoading: false
        })
      })
    }


    // suggestion 
    chekoutOfSuggestionHandler = () => {
      this.setState({
        suggestionDialogLoading: true
      })

      axiosConfig.post('/Post/ChangeInSliderStatus', {
        postGuid: this.state.changeInSliderData.postGuid,
        inSliderStatus: false
      }, {
        headers: { Authorization: "Bearer " + this.props.token }
      }).then(firstRes => {
        if(firstRes.data.state === 1) {
          toast('عملیات موفقیت آمیز', {type: toast.TYPE.SUCCESS});

          this.reFetchListData()
        }

        if(firstRes.data.state === 2 || firstRes.data.state === 3 || firstRes.data.state === 4 ) {
          toast(firstRes.data.message, {type: toast.TYPE.ERROR});
          this.setState({
            suggestionDialogLoading: false
          })
        }

      }).catch(error => {
        toast('خطا در تغییر وضعیت اسلایدر', {type: toast.TYPE.ERROR});
        this.setState({
          suggestionDialogLoading: false
        })
      })
    }

    render() {
        return (
            <>
            <PanelMain header={<PanelMainPostsListhead />}>
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
                        title="لیست پست ها"
                        columns={this.state.columns}
                        data={this.state.data}
                        actions={[
                            {
                              icon: Description,
                              tooltip: 'مشاهده پست',
                              onClick: (event, rowData) => {
                                this.props.onSaveSinglePost(rowData.postGuid)
                                this.props.history.push('/singlePost' )
                                this.props.history.state = 'showSinglepost'
                              }
                            },
                            {
                              icon: ViewCarousel,
                              tooltip: 'نمایش پست در اسلایدر',
                              onClick: (event, rowData) => {
                                this.setState({
                                  openChangeSliderDialog: true,
                                  changeInSliderData: rowData
                                })
                              }
                            },
                            {
                              icon: AssignmentTurnedIn,
                              tooltip: 'نمایش پست در منتخبین سر دبیر',
                              onClick: (event, rowData) => {
                                this.setState({
                                  openSuggestionDialog: true,
                                  suggestionDialogData: rowData
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
                              .post(`/Post/Delete/${oldData.postGuid}`, {
                                guid: oldData.postGuid
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
                                  toast('پست با موفقیت حذف شد', {type: toast.TYPE.SUCCESS});
                                })
                              } else{
                                reject()
                                toast('خطا در حذف پست', {type: toast.TYPE.ERROR});
                              }

                            }).catch(err => {
                              reject()
                              toast('خطا در حذف پست', {type: toast.TYPE.ERROR});
                            })
                            
                          })
                        }}
                    />
                </div>

            </PanelMain>

            <ChangeInSliderDialog
            openDialog={this.state.openChangeSliderDialog}
            closeDialogHandler={this.closeInSliderDialogHandler}
            changeInSliderLoading={this.state.changeInSliderLoading}
            chekoutOfSliderHandler={this.chekoutOfSliderHandler}
            addToSliderHandler={this.addToSliderHandler}
            />

            <ChangeInSliderDialog
            openDialog={this.state.openSuggestionDialog}
            closeDialogHandler={this.closeSuggestionDialogHandler}
            suggestionDialogLoading={this.state.suggestionDialogLoading}
            chekoutOfSuggestionHandler={this.chekoutOfSuggestionHandler}
            addToSuggestionHandler={this.addToSuggestionHandler}
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
      postGuid: state.pages.postGuid
    }
}

const mapDispatch = dispatch => {
    return {
      onSaveSinglePost: (postGuid) => dispatch(pagesActionCreators.saveSinglePost(postGuid))
    }
}

export default connect(mapState, mapDispatch)(withRouter(PostsList))