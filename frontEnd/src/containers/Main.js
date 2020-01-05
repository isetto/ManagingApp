import React, { Component } from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import '../App.css';
import ExportToExcel from "../components/ExportToExcel";
import Modal from "../components/ModalComponent";
import { downloadAllRaports, downloadButtons, updateButtons, deleteRaport, downloadSingleRaport, updateRaport, downloadRaports } from '../API';
import moment from "moment";
import Scrollbars from "react-custom-scrollbars"
import { withRouter } from 'react-router-dom'
import matchSorter from 'match-sorter'
import AssignmentRaport from '../components/AssignmentRaport'
import ModalButtons from '../components/ModalButtons'
import ModalRaport from '../components/ModalRaport'

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            login: this.props.location.state.detail.login,
            permissions: this.props.location.state.detail.permissions,  //uprawnienia
            posts: [{
                id: 0,
                orderId: "",    //numer_pracy
                localizationId: 1, //numer_lokalizacji
                localization: "",    //lokalizacja
                realizationMode: 0, //tryb_realizacji
                executor: "",  //wykonawca
                orderAcceptedBy: "",    //zlecenie_przyjete_przez
                orderCreatedBy: "",    //utworzona_przez
                showDatePicker: "true", //show_date_picker
                showDateInput: "none",  //show_date_input
                disableInputs: false,   //disable_inputs

                dateOfOrder: moment(new Date()).format(), //data_zlecenia
                dateOfFinishedOrder: moment(new Date()).format(),   //data_zamkniecia
                dateOfArrival: moment(new Date()).format(),    //data_przybycia
                dateOfAdditionalWorks: moment(new Date()).format(), //data_dodatkowych_prac
                dateOfInvoice: moment(new Date()).format(),   //data_fv
                dateOfAcceptationSpacenet: moment(new Date()).format(),  //data_akceptacji_spacenet
                dateOfAcceptationPlk: moment(new Date()).format(),   //data_akceptacji_plk

                workDoneDescription: "", //wykonane_prace
                problemDescription: "",  //opis_problemu
                comments: "",  //uwagi
                jobDescription: "",  //opis_prac
                additionalWorks: "",    //dodatkowe_prace
                additionalWorksDescription: "",  //opis_dodatkowych_prac
                additionalWorksExecutor: "", //wykonawca_dodatkowych_prac
                coordinatorPlk: "",    //koordynator_plk
                systemRecovery: "", //przywrocono_system
                photos: "",    //zdjecia
                photosAttached: "",  //zalaczono_zdjecia

                invoiceId: "",  //nr_fv
                serviceCost: 0,    //koszt_uslugi
                materialCost: 0,    //koszt_materialow
                oldSn: 0,    //stary_sn
                newSn: 0, //nowy_sn
            }],
            raport: {
                workDoneDescription: "", //wykonane_prace
                problemDescription: "",  //opis_problemu
                comments: "",  //uwagi
                jobDescription: "",  //opis_prac
                orderAcceptedBy: "",    //zlecenie_przyjete_przez
                executor: " ", //wykonawca
                dateOfArrival: moment(new Date()).format('YYYY-MM-DD HH:mm'),  //data_przybycia
                dateOfFinishedOrder: moment(new Date()).format('YYYY-MM-DD HH:mm'), //data_zamkniecia
                dateOfAcceptationSpacenet: moment(new Date()).format(),          //data_akceptacji_spacenet
                serviceCost: 0,    //koszt_uslugi
                materialCost: 0,    //koszt_materialow
                oldSn: 0,    //stary_sn
                newSn: 0, //nowy_sn
                coordinatorPlk: "",    //koordynator_plk
                systemRecovery: "", //przywrocono_system
                dateOfAdditionalWorks: moment(new Date()).format('YYYY-MM-DD HH:mm'), //data_dodatkowych_prac
                photos: "",    //zdjecia
                photosAttached: "",  //zalaczono_zdjecia
                additionalWorks: "",    //dodatkowe_prace
                additionalWorksDescription: "",  //opis_dodatkowych_prac
                additionalWorksExecutor: "", //wykonawca_dodatkowych_prac
                invoiceId: "",      //nr_fv
                dateOfInvoice: moment(new Date()).format('YYYY-MM-DD HH:mm'), //data_fv
                showDatePicker: "true",
                showDateInput: "none",
                disableInputs: false,
            },

            permissionsBt: "admin",    //uprawnienia_bt
            executorBt: false,    //wykonawca_bt
            orderAcceptedByBt: false,  //zlecenie_przyjete_przez_bt

            dateOfFinishedOrderBt: false,  //data_zamkniecia_bt
            dateOfArrivalBt: false,   //data_przybycia_bt
            dateOfAdditionalWorksBt: false,    //data_dodatkowych_prac_bt
            dateOfInvoiceBt: false,  //data_fv_bt
            dateOfAcceptationSpacenetBt: false, //data_akceptacji_spacenet_bt
            dateOfAcceptationPlkBt: false,  //data_akceptacji_plk_bt

            workDoneDescriptionBt: false,   //wykonane_prace_bt
            problemDescriptionBt: false,    //opis_problemu_bt
            commentsBt: false,    //uwagi_bt
            protocolBt: false, //protokol_bt
            actionBt: false,    //akcja_bt
            additionalWorksBt: false,  //dodatkowe_prace_bt
            additionalWorksDescriptionBt: false,    //opis_dodatkowych_prac_bt
            additionalWorksExecutorBt: false,   //wykonawca_dodatkowych_prac_bt
            coordinatorPlkBt: false,  //koordynator_plk_bt
            systemRecoveryBt: false,   //przywrocono_system_bt
            photosAttachedBt: false,    //zalaczono_zdjecia_bt
            photosBt: false,  //zdjecia_bt
            serviceCostBt: false, //koszt_uslugi_bt
            materialCostBt: false, //koszt_materialow_bt
            oldSnBt: false, //stary_sn_bt
            newSnBt: false,  //nowy_sn_bt
            invoiceIdBt: false,    //nr_fv_bt

            filtered: [],
            filterAll: '',
            show: false,
            showButtons: false,
            showAssigmentRaport: false,
            toggle: false,
            showButtonsEntitlements: "true"
        }
        this.filterAll = this.filterAll.bind(this);
    }


    componentDidMount() {
        console.log("permission:" + this.state.permissions)
        console.log("permission:" + this.state.login)
        const stateShortCut = this.state;
        if (stateShortCut.permissions === "worker") {
            downloadRaports({ "executor": this.state.login })
                .then(posts => {
                    this.setState({ posts: posts })
                })
        }
        else {
            downloadAllRaports()
                .then(posts => {
                    this.setState({ posts: posts })
                })
        }

        if (stateShortCut.permissions === "admin") {
            this.setState({
                showButtonsEntitlements: "true"
            })
        }
        else {
            this.setState({
                showButtonsEntitlements: "none"
            })
        }

        this.downloadBt({ permissions: this.state.permissions })

    }

    downloadBt = (permissions) => {
        console.log("permissions")
        downloadButtons(permissions)
            .then(buttons => {
                this.setState({
                    executorBt: buttons.executorBt,
                    orderAcceptedByBt: buttons.orderAcceptedByBt,
                    dateOfFinishedOrderBt: buttons.dateOfFinishedOrderBt,
                    dateOfArrivalBt: buttons.dateOfArrivalBt,
                    dateOfAdditionalWorksBt: buttons.dateOfAdditionalWorksBt,
                    dateOfInvoiceBt: buttons.dateOfInvoiceBt,
                    dateOfAcceptationSpacenetBt: buttons.dateOfAcceptationSpacenetBt,
                    dateOfAcceptationPlkBt: buttons.dateOfAcceptationPlkBt,
                    workDoneDescriptionBt: buttons.workDoneDescriptionBt,
                    problemDescriptionBt: buttons.problemDescriptionBt,
                    commentsBt: buttons.commentsBt,
                    protocolBt: buttons.protocolBt,
                    actionBt: buttons.actionBt,
                    additionalWorksBt: buttons.additionalWorksBt,
                    additionalWorksDescriptionBt: buttons.additionalWorksDescriptionBt,
                    additionalWorksExecutorBt: buttons.additionalWorksExecutorBt,
                    coordinatorPlkBt: buttons.coordinatorPlkBt,
                    systemRecoveryBt: buttons.systemRecoveryBt,
                    photosAttachedBt: buttons.photosAttachedBt,
                    photosBt: buttons.photosBt,
                    serviceCostBt: buttons.serviceCostBt,
                    materialCostBt: buttons.materialCostBt,
                    oldSnBt: buttons.oldSnBt,
                    newSnBt: buttons.newSnBt,
                    invoiceIdBt: buttons.invoiceIdBt
                })

            })
    }

    showModal = (id) => {
        downloadSingleRaport(id)
            .then(data => {
                this.setState({ raport: data })
            })
            .then(() => {
                this.setState({
                    ...this.state,
                    show: !this.state.show
                });
            })
    }

    showModalAssigmentRaport = (id) => {
        downloadSingleRaport(id)
            .then(data => {
                this.setState({ raport: data })
            })
            .then(() => {
                this.setState({
                    ...this.state,
                    showAssigmentRaport: !this.state.showAssigmentRaport
                });
            })
    }

    showModalButtons = () => {
        this.setState({
            ...this.state,
            showButtons: !this.state.showButtons
        });
    }

    handleClose = () => { this.setState({ show: false }) }
    handleCloseButtons = () => { this.setState({ showButtons: false }) }
    handleCloseAssigmentRaport = () => { this.setState({ showAssigmentRaport: false }) }
    onChangePermissions = async (event) => {
        try {
            await this.setState({ permissionsBt: event.target.value })
            console.log(this.state.permissionsBt)
            this.downloadBt({ permissions: this.state.permissionsBt })
        }
        catch (error) {
            console.log(error)
        }

    }
    onToggle = (value, name) => { this.setState({ [name]: !value }) }

    deleteRow(id) {
        const index = this.state.posts.findIndex(post => {
            return post.id === id
        })
        let copyPosts = [...this.state.posts]
        copyPosts.splice(index, 1)
        deleteRaport(id)
            .then(this.setState({ posts: copyPosts }))
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState((prevState) => ({
            raport: {
                ...prevState.raport,
                [name]: value
            }
        }));
    }

    handleSubmit = async event => {
        event.preventDefault();
        const checkDate = () => {
            if (this.state.raport.dateOfAcceptationSpacenet !== null) {
                this.setState((prevState) => ({
                    raport: {
                        ...prevState.raport,
                        showDatePicker: "none",
                        showDateInput: "true",
                        disableInputs: true,
                    }
                }));
            }
        }
        await checkDate()
        try {
            (updateRaport(this.state.raport.id, this.state.raport)
                .then(
                    this.setState({
                        show: false
                    })
                )
                .then(window.location.reload())
            )
        }
        catch (error) {
            console.log(error)
        }
    }

    saveButtons = () => {
        const sendObject = {
            executorBt: this.state.executorBt,
            orderAcceptedByBt: this.state.orderAcceptedByBt,
            dateOfFinishedOrderBt: this.state.dateOfFinishedOrderBt,
            dateOfArrivalBt: this.state.dateOfArrivalBt,
            dateOfAdditionalWorksBt: this.state.dateOfAdditionalWorksBt,
            dateOfInvoiceBt: this.state.dateOfInvoiceBt,
            dateOfAcceptationSpacenetBt: this.state.dateOfAcceptationSpacenetBt,
            dateOfAcceptationPlkBt: this.state.dateOfAcceptationPlkBt,
            workDoneDescriptionBt: this.state.workDoneDescriptionBt,
            problemDescriptionBt: this.state.problemDescriptionBt,
            commentsBt: this.state.commentsBt,
            protocolBt: this.state.protocolBt,
            actionBt: this.state.actionBt,
            additionalWorksBt: this.state.additionalWorksBt,
            additionalWorksDescriptionBt: this.state.additionalWorksDescriptionBt,
            additionalWorksExecutorBt: this.state.additionalWorksExecutorBt,
            coordinatorPlkBt: this.state.coordinatorPlkBt,
            systemRecoveryBt: this.state.systemRecoveryBt,
            photosAttachedBt: this.state.photosAttachedBt,
            photosBt: this.state.photosBt,
            serviceCostBt: this.state.serviceCostBt,
            materialCostBt: this.state.materialCostBt,
            oldSnBt: this.state.oldSnBt,
            newSnBt: this.state.newSnBt,
            invoiceIdBt: this.state.invoiceIdBt,
        }
        updateButtons(this.state.permissionsBt, sendObject)
        this.setState({
            showButtons: false
        })
    }

    onChangeDate(datetime, name) {
        this.setState((prevState) => ({
            raport: {
                ...prevState.raport,
                [name]: moment(datetime).format('YYYY-MM-DD HH:mm')
            }
        }))
    }

    clearAcceptance = () => {
        this.setState((prevState) => ({
            raport: {
                ...prevState.raport,
                dateOfAcceptationSpacenet: null,
                showDatePicker: "true",
                showDateInput: "none",
                disableInputs: false,
            }
        }));
    }

    filterAll(e) {
        const { value } = e.target;
        const filterAll = value;
        const filtered = [{ id: 'all', value: filterAll }];
        // NOTE: this completely clears any COLUMN filters
        this.setState({ filterAll, filtered });
    }

    onFilteredChange(filtered) {
        // extra check for the "filterAll"
        if (filtered.length > 1 && this.state.filterAll.length) {
            // NOTE: this removes any FILTER ALL filter
            const filterAll = '';
            this.setState({ filtered: filtered.filter((item) => item.id !== 'all'), filterAll })
        }
        else
            this.setState({ filtered });
    }

    bodyComponent(tableState) {
        return <Scrollbars style={{ height: 500 }}> <div className='my-tbody-class'>
            {tableState.children} </div> </Scrollbars>
    }

    render() {

        let { orderAcceptedByBt, executorBt, dateOfFinishedOrderBt, dateOfArrivalBt, dateOfAdditionalWorksBt,
            dateOfInvoiceBt, dateOfAcceptationSpacenetBt, dateOfAcceptationPlkBt, workDoneDescriptionBt, problemDescriptionBt,
            commentsBt, protocolBt, actionBt, additionalWorksBt, additionalWorksDescriptionBt, additionalWorksExecutorBt,
            coordinatorPlkBt, systemRecoveryBt, photosAttachedBt, photosBt, serviceCostBt, materialCostBt,
            oldSnBt, newSnBt, invoiceIdBt } = this.state;



        const assigmentRaport = (
            <AssignmentRaport
                stateRaport={this.state.raport}
                state={this.state}
                onInputChange={this.handleInputChange}
                submition={this.handleSubmit}
                close={this.handleCloseAssigmentRaport}
                changeData={(date, name) => this.onChangeDate(date, name)}
                clearAcceptance={this.clearAcceptance}
            />
        )

        const modalButtons = (
            <ModalButtons
                state={this.state}
                permissions={this.onChangePermissions}
                toggle={(value, name) => this.onToggle(value, name)}
                save={this.saveButtons}
                close={this.handleCloseButtons}
            />
        )

        const modalRaport = (
            <ModalRaport
                stateRaport={this.state.raport}
                inputChange={this.handleInputChange}
                changeData={(date, name) => this.onChangeDate(date, name)}
                close={this.handleClose}
                submit={this.handleSubmit}
            />
        );

        const columns = [
            {
                Header: "id",
                accessor: "id",
                style: {
                    textAlign: "center"
                },
                width: 100,
                maxWidth: 100,
                minWidth: 100,
            },
            {
                Header: "numer pracy",
                accessor: "orderId",
                style: {
                    textAlign: "center"
                },
                width: 100,
                maxWidth: 100,
                minWidth: 100,
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["orderId"] }),
                filterAll: true
            },
            {
                Header: "numer lokalizacji",
                accessor: "localizationId",
                width: 150,
                maxWidth: 150,
                minWidth: 150,
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["localizationId"] }),
                filterAll: true
            },
            {
                Header: "tryb realizacji",
                accessor: "realizationMode",
                width: 150,
                maxWidth: 150,
                minWidth: 150,
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["realizationMode"] }),
                filterAll: true
            },
            {
                Header: "utworzona przez",
                accessor: "orderCreatedBy",
                style: {
                    textAlign: "center"
                },
                width: 150,
                maxWidth: 150,
                minWidth: 150,
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["orderCreatedBy"] }),
                filterAll: true
            },
            {
                Header: "data zlecenia",
                accessor: "dateOfOrder",
                Cell: row => {
                    if (row.value !== null)
                        return (<span>{moment.utc(row.value).format('DD-MM-YYYY HH:mm')} </span>)
                },
                style: {
                    textAlign: "center"
                },
                width: 150,
                maxWidth: 150,
                minWidth: 150,
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["dateOfOrder"] }),
                filterAll: true
            },
            {
                Header: "lokalizacja",
                accessor: "localization",
                style: {
                    textAlign: "center"
                },
                width: 200,
                maxWidth: 200,
                minWidth: 200,
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["localization"] }),
                filterAll: true
            },
            {
                Header: "opis prac",
                accessor: "jobDescription",
                style: {
                    textAlign: "center"
                },

                width: 300,
                maxWidth: 300,
                minWidth: 300,
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["jobDescription"] }),
                filterAll: true
            },
            {
                Header: "zlecenie przyjęte przez",
                accessor: "orderAcceptedBy",
                style: {
                    textAlign: "center"
                },
                width: 200,
                maxWidth: 200,
                minWidth: 200,
                show: orderAcceptedByBt,
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["orderAcceptedBy"] }),
                filterAll: true
            },
            {
                Header: "wykonawca",
                accessor: "executor",
                style: {
                    textAlign: "center"
                },
                width: 150,
                maxWidth: 150,
                minWidth: 150,
                show: executorBt,
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["executor"] }),
                filterAll: true
            },
            {
                Header: "opis problemu",
                accessor: "problemDescription",
                style: {
                    textAlign: "center"
                },
                width: 250,
                maxWidth: 250,
                minWidth: 250,
                show: problemDescriptionBt,
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["problemDescription"] }),
                filterAll: true
            },
            {
                Header: "czas zamknięcia",
                accessor: "dateOfFinishedOrder",
                Cell: row => {
                    if (row.value !== null)
                        return (<span>{moment.utc(row.value).format('DD-MM-YYYY HH:mm')} </span>)
                },
                style: {
                    textAlign: "center"
                },
                width: 150,
                maxWidth: 150,
                minWidth: 150,
                show: dateOfFinishedOrderBt,
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["dateOfFinishedOrder"] }),
                filterAll: true
            },
            {
                Header: "data akceptacji spacenet",
                accessor: "dateOfAcceptationSpacenet",
                Cell: row => {
                    if (row.value != null)
                        return (<span>{moment.utc(row.value).format('DD-MM-YYYY HH:mm')} </span>)
                },
                style: {
                    textAlign: "center"
                },
                width: 200,
                maxWidth: 200,
                minWidth: 200,
                show: dateOfAcceptationSpacenetBt,
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["dateOfAcceptationSpacenet"] }),
                filterAll: true
            },
            {
                Header: "data akceptacji plk",
                accessor: "dateOfAcceptationPlk",
                Cell: row => {
                    if (row.value !== null)
                        return (<span>{moment.utc(row.value).format('DD-MM-YYYY HH:mm')} </span>)
                },
                style: {
                    textAlign: "center"
                },
                width: 150,
                maxWidth: 150,
                minWidth: 150,
                show: dateOfAcceptationPlkBt,
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["dateOfAcceptationPlk"] }),
                filterAll: true
            },
            {
                Header: "koszt usługi",
                accessor: "serviceCost",
                style: {
                    textAlign: "center"
                },
                width: 100,
                maxWidth: 100,
                minWidth: 100,
                show: serviceCostBt,
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["serviceCost"] }),
                filterAll: true
            },
            {
                Header: "koszt materiałów",
                accessor: "materialCost",
                style: {
                    textAlign: "center"
                },
                width: 150,
                maxWidth: 150,
                minWidth: 150,
                show: materialCostBt,
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["materialCost"] }),
                filterAll: true
            },
            {
                Header: "uwagi",
                accessor: "comments",
                width: 250,
                maxWidth: 250,
                minWidth: 250,
                show: commentsBt,
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["comments"] }),
                filterAll: true
            },
            {
                Header: "protokół",
                Cell: props => {

                    return (
                        <div className="App">
                            {/* <WithBorderInput placeholder="press enter/space to + tag" /> */}
                            <input type="button"
                                onClick={() => {
                                    this.showModal(props.original.id)
                                }}
                                value="Raport"
                                className="btn btn-info" />

                            <Modal
                                onClose={this.handleClose}
                                show={this.state.show} >
                                {modalRaport}
                            </Modal>

                        </div>

                    );
                },
                width: 100,
                maxWidth: 100,
                minWidth: 100,
                sortable: false,
                filterable: false,
                show: protocolBt
            },
            {
                Header: "czas przyjazdu",
                accessor: "dateOfArrival",
                style: {
                    textAlign: "center"
                },
                width: 150,
                maxWidth: 150,
                minWidth: 150,
                show: dateOfArrivalBt,
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["dateOfArrival"] }),
                filterAll: true
            },
            {
                Header: "wykonane prace",
                accessor: "workDoneDescription",
                style: {
                    textAlign: "center"
                },

                width: 300,
                maxWidth: 300,
                minWidth: 300,
                show: workDoneDescriptionBt,
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["workDoneDescription"] }),
                filterAll: true
            },
            {
                Header: "stary S/N",
                accessor: "oldSn",
                style: {
                    textAlign: "center"
                },
                width: 100,
                maxWidth: 100,
                minWidth: 100,
                show: oldSnBt,
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["oldSn"] }),
                filterAll: true
            },
            {
                Header: "nowy S/N",
                accessor: "newSn",
                style: {
                    textAlign: "center"
                },
                width: 100,
                maxWidth: 100,
                minWidth: 100,
                show: newSnBt,
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["newSn"] }),
                filterAll: true
            },
            {
                Header: "koordynator plk",
                accessor: "coordinatorPlk",
                style: {
                    textAlign: "center"
                },
                width: 150,
                maxWidth: 150,
                minWidth: 150,
                show: coordinatorPlkBt,
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["coordinatorPlk"] }),
                filterAll: true
            },
            {
                Header: "załączono zdjęcia",
                accessor: "photosAttached",
                style: {
                    textAlign: "center"
                },
                width: 200,
                maxWidth: 200,
                minWidth: 200,
                show: photosAttachedBt,
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["photosAttached"] }),
                filterAll: true
            },
            {
                Header: "naprawiono usterkę?",
                accessor: "systemRecovery",
                style: {
                    textAlign: "center"
                },
                width: 200,
                maxWidth: 200,
                minWidth: 200,
                show: systemRecoveryBt,
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["systemRecovery"] }),
                filterAll: true
            },
            {
                Header: "prace dodatkowe?",
                accessor: "additionalWorks",
                style: {
                    textAlign: "center"
                },
                width: 150,
                maxWidth: 150,
                minWidth: 150,
                show: additionalWorksBt,
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["additionalWorks"] }),
                filterAll: true
            },
            {
                Header: "opis prac dodatkowych",
                accessor: "additionalWorksDescription",
                style: {
                    textAlign: "center"
                },
                width: 250,
                maxWidth: 250,
                minWidth: 250,
                show: additionalWorksDescriptionBt,
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["additionalWorksDescription"] }),
                filterAll: true
            },
            {
                Header: "wykonawca prac dodatkowych",
                accessor: "additionalWorksExecutor",
                style: {
                    textAlign: "center"
                },
                width: 200,
                maxWidth: 200,
                minWidth: 200,
                show: additionalWorksExecutorBt,
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["additionalWorksExecutor"] }),
                filterAll: true
            },
            {
                Header: "data planowanych prac dodatkowych",
                accessor: "dateOfAdditionalWorks",
                Cell: row => {
                    if (row.value !== null)
                        return (<span>{moment.utc(row.value).format('DD-MM-YYYY HH:mm')} </span>)
                },
                style: {
                    textAlign: "center"
                },
                width: 250,
                maxWidth: 250,
                minWidth: 250,
                show: dateOfAdditionalWorksBt,
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["dateOfAdditionalWorks"] }),
                filterAll: true
            },
            {
                Header: "nr faktury(wykonawca)",
                accessor: "invoiceId",
                style: {
                    textAlign: "center"
                },
                width: 150,
                maxWidth: 150,
                minWidth: 150,
                show: invoiceIdBt,
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["invoiceId"] }),
                filterAll: true
            },
            {
                Header: "data faktury(wykonawca)",
                accessor: "dateOfInvoice",
                Cell: row => {
                    if (row.value !== null)
                        return (<span>{moment.utc(row.value).format('DD-MM-YYYY HH:mm')} </span>)
                },
                style: {
                    textAlign: "center"
                },
                width: 180,
                maxWidth: 180,
                minWidth: 180,
                show: dateOfInvoiceBt,
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["dateOfInvoice"] }),
                filterAll: true
            },
            {
                Header: "zdjecia",
                accessor: "photos",
                style: {
                    textAlign: "center"
                },
                width: 200,
                maxWidth: 200,
                minWidth: 200,
                show: photosBt,
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["photos"] }),
                filterAll: true
            },
            {
                Header: "akcja",
                Cell: props => {
                    return (
                        <button type="button" className="btn btn-danger" onClick={() => {
                            this.deleteRow(props.original.id);
                        }}> usuń</button>
                    )
                },
                width: 100,
                maxWidth: 100,
                minWidth: 100,
                sortable: false,
                filterable: false,
                show: actionBt
            },
            {
                Header: "akcja",
                Cell: props => {
                    return (
                        <div className="App">
                            <input type="button"
                                onClick={() => {
                                    this.showModalAssigmentRaport(props.original.id)

                                }}
                                value="Edycja"
                                className="btn btn-info" />

                            <Modal onClose={this.handleCloseAssigmentRaport} show={this.state.showAssigmentRaport}  >
                                {assigmentRaport}
                            </Modal>

                        </div>

                    );
                },
                width: 100,
                maxWidth: 100,
                minWidth: 100,
                sortable: false,
                filterable: false,
                show: actionBt
            },
            {
                // NOTE - this is a "filter all" DUMMY column
                // you can't HIDE it because then it wont FILTER
                // but it has a size of ZERO with no RESIZE and the
                // FILTER component is NULL (it adds a little to the front)
                // You culd possibly move it to the end
                Header: "All",
                id: 'all',
                width: 0,
                resizable: false,
                sortable: false,
                Filter: () => { },
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["dateOfInvoice"] }),
                filterAll: true,
                getProps: () => {
                    return {
                        // style: { padding: "0px"}
                    }
                },
                filterMethod: (filter, rows) => {
                    // using match-sorter
                    // it will take the content entered into the "filter"
                    // and search for it in EITHER the firstName or lastName
                    const result = matchSorter(rows, filter.value, {
                        keys: [
                            "id",
                            "orderId",
                            "localizationId",
                            "orderCreatedBy",
                            "realizationMode",
                            "dateOfOrder",
                            "localization",
                            "jobDescription",
                            "orderAcceptedBy",
                            "executor",
                            "problemDescription",
                            "dateOfFinishedOrder",
                            "dateOfAcceptationSpacenet",
                            "dateOfAcceptationPlk",
                            "serviceCost",
                            "materialCost",
                            "comments",
                            "dateOfArrival",
                            "workDoneDescription",
                            "oldSn",
                            "newSn",
                            "coordinatorPlk",
                            "photosAttached",
                            "systemRecovery",
                            "additionalWorks",
                            "additionalWorksDescription",
                            "additionalWorksExecutor",
                            "dateOfAdditionalWorks",
                            "invoiceId",
                            "dateOfInvoice",
                            "photos"
                        ], threshold: matchSorter.rankings.WORD_STARTS_WITH
                    });
                    return result;
                },
                filterAll: true,
            }
        ]


        return (
            <div>
                <div style={{ display: "flex", margin: "1rem" }} >
                    <input style={{ display: this.state.showButtonsEntitlements }} type="button"
                        onClick={() => { this.showModalButtons() }}
                        value="przyciski"
                        className="btn btn-success" />

                    <Modal
                        onClose={this.showModalButtons}
                        show={this.state.showButtons} >
                        {modalButtons}
                    </Modal>
                    <div  >
                        <button style={{ marginLeft: "2rem" }} type="button" className="btn btn-warning" onClick={() => {
                            this.props.history.push("/")
                        }}> wyloguj </button>
                        <b style={{ marginLeft: "2rem", marginTop: "0.5rem" }} >{this.state.login}</b>
                    </div>
                </div>
                <div style={{ marginLeft: "1rem", marginBottom: "1rem" }}>
                    Szukaj: <input value={this.state.filterAll} onChange={this.filterAll} />
                </div>

                <ReactTable
                    TbodyComponent={this.bodyComponent}
                    filtered={this.state.filtered}
                    ref={r => this.reactTable = r}
                    onFilteredChange={this.onFilteredChange.bind(this)}
                    columns={columns}
                    data={this.state.posts}
                    filterable
                    defaultFilterMethod={(filter, row) =>
                        String(row[filter.id]) === filter.value}
                    defaultPageSize={10}
                    noDataText="Brak rekordów do wyświetlenia">

                    {(state, filtredData, instance) => {
                        this.reactTable = state.pageRows.map(post => post._original);
                        return (
                            <div>
                                {filtredData()}
                                <ExportToExcel posts={this.reactTable} />
                            </div>
                        )
                    }}
                </ReactTable>
            </div>

        );
    }
}

export default withRouter(Main);
