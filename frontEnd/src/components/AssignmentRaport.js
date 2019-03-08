import React, { Component } from "react";
import { DatetimeInput } from 'react-datetime-inputs'
import moment from "moment";

class AssignmentRaport extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        const { stateRaport, state, onInputChange, submition, close, changeData, clearAcceptance } = this.props
        return (
            <div>
                <form  >
                    <div className="container">
                        <div className="form-group form-group-sm" style={{ width: 320 }} >
                            <label>Numer Pracy:</label>
                            <input autocomplete="off" onChange={onInputChange} value={stateRaport.orderId} className="form-control" name="orderId" disabled />
                        </div>
                        <div className="form-group form-group-sm" style={{ width: 320 }}>
                            <label>Numer Lokalizacji:</label>
                            <input autocomplete="off" onChange={onInputChange} className="form-control" value={stateRaport.localizationId} name="localizationId" rows="1" disabled ></input>
                        </div>
                        <div>
                            <label>Zlecenie przyjęte przez:</label>
                            <select name="orderAcceptedBy" id="pEditPerformer"
                                onChange={onInputChange}
                                className="form-control input-sm"
                                style={{ width: 320 }}

                                value={(stateRaport.orderAcceptedBy !== null) ? stateRaport.orderAcceptedBy : state.login}
                            >
                                <option value="zbyszek">zbyszek</option>
                                <option value="pawel">pawel</option>
                            </select>
                            <br />
                        </div>
                        <div>
                            <label>wykonawca:</label>
                            <select name="executor" id="pEditPerformer"
                                onChange={onInputChange}
                                className="form-control input-sm"
                                style={{ width: 320 }}
                                value={stateRaport.executor}
                            >
                                <option value=""></option>
                                <option value="dmitry">Dmitry Lititanskas</option>
                                <option value="krzysztof">Krzysztof Lipiński</option>
                                <option value="pawel">Paweł Żmijewski</option>
                                <option value="zbyszek">Zbigniew Fąk</option>
                            </select>
                            <br />
                        </div>
                        <div className="form-group form-group-sm" style={{ width: 320 }}>

                            <label>Czas zamknięcia:</label>
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
                        <div className="form-group form-group-sm" style={{ width: 320 }}>
                            <label>Koszt usługi:</label>
                            <input type="number" autocomplete="off" onChange={onInputChange} className="form-control" value={stateRaport.serviceCost} name="serviceCost" ></input>
                        </div>
                        <div className="form-group form-group-sm" style={{ width: 320 }}>
                            <label>Koszt materiałów:</label>
                            <input type="number" autocomplete="off" onChange={onInputChange} className="form-control" value={stateRaport.materialCost} name="materialCost" ></input>
                        </div>
                        <div className="form-group form-group-sm" style={{ width: 320 }}>
                            <label>Data akceptacji SpaceNet:</label>

                            <div style={{ display: "flex" }}>

                                <b className="clearDate" onClick={clearAcceptance}>cofnij akceptacje</b>

                                <DatetimeInput
                                    let date={this.props.datetime}
                                    datetime={(stateRaport.dateOfAcceptationSpacenet == null) ? stateRaport.dateOfAcceptationSpacenet : moment(stateRaport.dateOfAcceptationSpacenet)}
                                    onChange={(date) => changeData(date, "dateOfAcceptationSpacenet")}>
                                </DatetimeInput>

                                <b className="nowDatePicker" onClick={() => changeData(moment(), "dateOfAcceptationSpacenet")}>now</b>
                            </div>
                            <br /><br /><br />
                        </div>
                        <div className="form-group form-group-sm" style={{ width: 450 }}>
                            <label>Uwagi:</label>
                            <textarea autocomplete="off" onChange={onInputChange} className="form-control" value={stateRaport.comments} rows="5" name="comments" ></textarea>
                        </div>
                        <button onClick={submition} className="btn btn-primary">Zapisz</button>
                        <button onClick={close} className="btn btn-danger" style={{ marginLeft: '2rem' }}>cancel</button>
                    </div>
                </form>
            </div>
        );
    }
}













export default AssignmentRaport;