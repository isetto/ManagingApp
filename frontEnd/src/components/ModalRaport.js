import React, { Component } from 'react';
import { DatetimeInput } from 'react-datetime-inputs'
import moment from "moment";

class ModalRaport extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        const { stateRaport, inputChange, changeData, close, submit } = this.props
        return (
            <div>
                <form>
                    <div className="container">

                        <div className="form-group form-group-sm" style={{ width: 320 }} >
                            <label>Numer Pracy:</label>
                            <input autoComplete="off" onChange={inputChange} value={stateRaport.orderId} className="form-control" name="orderId" disabled />
                        </div>
                        <div className="form-group form-group-sm" style={{ width: 320 }}>
                            <label>Numer Lokalizacji:</label>
                            <textarea autoComplete="off" onChange={inputChange} className="form-control" value={stateRaport.localizationId} name="localizationId" rows="1" disabled></textarea>
                        </div>
                        <div>
                            <label>wykonawca:</label>
                            <select name="executor" id="pEditPerformer"
                                onChange={inputChange}
                                className="form-control input-sm"
                                style={{ width: 320 }}
                                value={stateRaport.executor}
                                disabled
                            >
                                <option value=""></option>
                                <option value="Dmitry Lititanskas">Dmitry Lititanskas</option>
                                <option value="Krzysztof Lipiński">Krzysztof Lipiński</option>
                                <option value="Paweł Żmijewski">Paweł Żmijewski</option>
                                <option value="Zbigniew Fąk">Zbigniew Fąk</option>
                            </select>
                            <br />
                        </div>
                        <div className="form-group form-group-sm" style={{ width: 320 }}>
                            <label>Czas przybycia na obiekt:</label>
                            <div style={{ display: stateRaport.showDatePicker }}>
                                <div style={{ display: "flex" }}>
                                    <DatetimeInput
                                        datetime={(stateRaport.dateOfArrival == null) ? stateRaport.dateOfArrival : moment(stateRaport.dateOfArrival)}
                                        let date={this.props.datetime}
                                        onChange={(date) => changeData(date, "dateOfArrival")}>
                                    </DatetimeInput>

                                    <b className="nowDatePicker" onClick={() => changeData(moment(), "dateOfArrival")}>now</b>
                                </div>
                                <br /><br /><br />
                            </div>

                            <input style={{ width: 320, display: stateRaport.showDateInput }} onChange={inputChange} value={stateRaport.dateOfArrival} className="form-control" name="dateOfArrival" disabled />

                        </div>
                        <div className="form-group form-group-sm" style={{ width: 450 }}>
                            <label>Aktualizacja opisu problemu:</label>
                            <textarea autoComplete="off" disabled={stateRaport.disableInputs} onChange={inputChange} className="form-control" rows="5" value={stateRaport.problemDescription} name="problemDescription" />
                        </div>

                        <div className="form-group form-group-sm" style={{ width: 320 }}>
                            <label>Czas zamknięcia awarii:</label>
                            <div style={{ display: stateRaport.showDatePicker }}>
                                <div style={{ display: "flex" }}>
                                    <DatetimeInput
                                        datetime={(stateRaport.dateOfFinishedOrder == null) ? stateRaport.dateOfFinishedOrder : moment(stateRaport.dateOfFinishedOrder)}
                                        let date={this.props.datetime}
                                        onChange={(date) => changeData(date, "dateOfFinishedOrder")}>
                                    </DatetimeInput>

                                    <b className="nowDatePicker" onClick={() => changeData(moment(), "dateOfFinishedOrder")}>now</b>
                                </div>
                                <br /><br /><br />
                            </div>
                            <input style={{ width: 320, display: stateRaport.showDateInput }} onChange={inputChange} value={stateRaport.dateOfFinishedOrder} className="form-control" name="dateOfFinishedOrder" disabled />

                        </div>
                        <div className="form-group form-group-sm" style={{ width: 450 }}>
                            <label>Wykonane prace – opis na podstawie załącznika cenowego:</label>
                            <textarea autoComplete="off" disabled={stateRaport.disableInputs} onChange={inputChange} className="form-control" value={stateRaport.workDoneDescription} name="workDoneDescription" rows="5" />
                        </div>
                        <div className="form-group form-group-sm" style={{ width: 320 }}>
                            <label>Koszt usługi[PLN]:</label>
                            <input type="number" autoComplete="off" disabled={stateRaport.disableInputs} onChange={inputChange} className="form-control" min="0" step="1" rows="1" value={stateRaport.serviceCost} name="serviceCost" />
                        </div>
                        <div className="form-group form-group-sm" style={{ width: 320 }}>
                            <label>Koszt materiałów[PLN]:</label>
                            <input type="number" autoComplete="off" disabled={stateRaport.disableInputs} onChange={inputChange} className="form-control" min="0" step="1" rows="1" value={stateRaport.materialCost} name="materialCost" />
                        </div>
                        <div className="form-group form-group-sm" style={{ width: 320 }}>
                            <label>Zdeinstalowany nr seryjny:</label>
                            <input autoComplete="off" disabled={stateRaport.disableInputs} onChange={inputChange} className="form-control" value={stateRaport.oldSn} name="oldSn" rows="1" />
                        </div>
                        <div className="form-group form-group-sm" style={{ width: 320 }}>
                            <label>Zainstalowany nr seryjny:</label>
                            <input autoComplete="off" disabled={stateRaport.disableInputs} onChange={inputChange} className="form-control" value={stateRaport.newSn} name="newSn" rows="1" />
                        </div>
                        <div onChange={inputChange}>
                            <label>Załączono zdjęcia:</label> <br />
                            <input autoComplete="off" disabled={stateRaport.disableInputs} type="radio" defaultChecked={stateRaport.systemRecovery === 'tak'} value="tak" name="photosAttached" /> tak
                            <input disabled={stateRaport.disableInputs} type="radio" defaultChecked={stateRaport.systemRecovery === 'nie'} value="nie" name="photosAttached" style={{ marginLeft: '0.8rem' }} /> nie
                            <input disabled={stateRaport.disableInputs} type="radio" defaultChecked={stateRaport.systemRecovery === 'nd'} value="nd" name="photosAttached" style={{ marginLeft: '0.8rem' }} /> nie dotyczy
                            <br /><br />
                        </div>
                        <div onChange={inputChange}>
                            <label>System został przywrócony do pracy:</label> <br />
                            <input disabled={stateRaport.disableInputs} type="radio" defaultChecked={stateRaport.systemRecovery === 'tak'} value="tak" name="systemRecovery" /> tak
                            <input disabled={stateRaport.disableInputs} type="radio" defaultChecked={stateRaport.systemRecovery === 'nie'} value="nie" name="systemRecovery" style={{ marginLeft: '0.8rem' }} /> nie
                            <input disabled={stateRaport.disableInputs} type="radio" defaultChecked={stateRaport.systemRecovery === 'nd'} value="nd" name="systemRecovery" style={{ marginLeft: '0.8rem' }} /> nie dotyczy
                            <br /><br />
                        </div>
                        <div onChange={inputChange}>
                            <label>Konieczność wykonania prac dodatkowych w innym terminie:</label> <br />
                            <input disabled={stateRaport.disableInputs} type="radio" defaultChecked={stateRaport.additionalWorks === 'tak'} value="tak" name="additionalWorks" /> tak
                            <input disabled={stateRaport.disableInputs} type="radio" defaultChecked={stateRaport.additionalWorks === 'nie'} value="nie" name="additionalWorks" style={{ marginLeft: '0.8rem' }} /> nie
                            <input disabled={stateRaport.disableInputs} type="radio" defaultChecked={stateRaport.additionalWorks === 'nd'} value="nd" name="additionalWorks" style={{ marginLeft: '0.8rem' }} /> nie dotyczy
                            <br /><br />
                        </div>
                        <div className="form-group form-group-sm" style={{ width: 450 }}>
                            <label> Opis planowanych prac dodatkowych:</label>
                            <textarea autoComplete="off" disabled={stateRaport.disableInputs} onChange={inputChange} className="form-control" value={stateRaport.additionalWorksDescription} name="additionalWorksDescription" rows="5" />
                        </div>
                        <div onChange={inputChange}>
                            <label>Wykonawca prac dodatkowych:</label> <br />
                            <input autoComplete="off" disabled={stateRaport.disableInputs} type="radio" defaultChecked={stateRaport.additionalWorksExecutor === 'SpaceNet'} value="SpaceNet" name="additionalWorksExecutor" /> SpaceNet
                            <input disabled={stateRaport.disableInputs} type="radio" defaultChecked={stateRaport.additionalWorksExecutor === 'PLK'} value="PLK" name="additionalWorksExecutor" style={{ marginLeft: '0.8rem' }} /> PLK
                            <br /><br />
                        </div>
                        <div className="form-group form-group-sm" style={{ width: 320 }}>
                            <label> Data planowanych prac dodatkowych:</label>
                            <div style={{ display: stateRaport.showDatePicker }}>
                                <div style={{ display: "flex" }}>
                                    <DatetimeInput
                                        datetime={(stateRaport.dateOfAdditionalWorks == null) ? stateRaport.dateOfAdditionalWorks : moment(stateRaport.dateOfAdditionalWorks)}
                                        let date={this.props.datetime}
                                        onChange={(date) => changeData(date, "dateOfAdditionalWorks")}>
                                    </DatetimeInput>

                                    <b className="nowDatePicker" onClick={() => changeData(moment(), "dateOfAdditionalWorks")}>now</b>
                                </div>
                                <br /><br /><br />
                            </div>
                            <input style={{ width: 320, display: stateRaport.showDateInput }} onChange={inputChange} value={stateRaport.dateOfAdditionalWorks} className="form-control" name="dateOfAdditionalWorks" disabled />

                        </div>
                        <div className="form-group form-group-sm" style={{ width: 450 }}>
                            <label> Uwagi:</label>
                            <textarea autoComplete="off" disabled={stateRaport.disableInputs} onChange={inputChange} className="form-control" value={stateRaport.comments} name="comments" rows="5" />
                        </div>
                        <div className="form-group form-group-sm" style={{ width: 320 }}>
                            <label>Nr Faktury:</label>
                            <input autoComplete="off" disabled={stateRaport.disableInputs} onChange={inputChange} className="form-control" rows="1" value={stateRaport.invoiceId} name="invoiceId" />
                        </div>
                        <div className="form-group form-group-sm" style={{ width: 320 }}>
                            <label>Data Fakturowania:</label>
                            <div style={{ display: stateRaport.showDatePicker }}>
                                <div style={{ display: "flex" }}>
                                    <DatetimeInput
                                        datetime={(stateRaport.dateOfInvoice == null) ? stateRaport.dateOfInvoice : moment(stateRaport.dateOfInvoice)}
                                        let date={this.props.datetime}
                                        onChange={(date) => changeData(date, "dateOfInvoice")}>
                                    </DatetimeInput>

                                    <b className="nowDatePicker" onClick={() => changeData(moment(), "dateOfInvoice")}>now</b>
                                </div>
                                <br /><br /><br />
                            </div>
                            <input autoComplete="off" style={{ width: 320, display: stateRaport.showDateInput }} onChange={inputChange} value={stateRaport.dateOfInvoice} className="form-control" name="dateOfInvoice" disabled />

                        </div>

                        <button onClick={submit} className="btn btn-primary">Zapisz</button>
                        <button onClick={close} className="btn btn-danger" style={{ marginLeft: '2rem' }}>cancel</button>
                    </div>
                </form>

            </div>
        );
    }
}

export default ModalRaport;