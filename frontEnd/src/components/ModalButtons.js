import React, { Component } from 'react';
import ToggleButton from 'react-toggle-button';

class ModalButtons extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }
    render() {
        const { state, permissions, toggle, close, save } = this.props
        return (<div >

            <select name="permissionsBt" id="pEditPerformer"
                onChange={permissions}
                className="form-control input-sm"
                style={{ width: 320 }}
                value={state.permissionsBt}
            >
                <option value=""></option>
                <option value="admin">admin</option>
                <option value="ambasador">ambasador</option>
                <option value="worker">worker</option>

            </select>

            <div style={{ display: "flex", marginBottom: "2rem" }}>
                <b style={{ width: '15rem' }}>Zlecenie przyjęte przez:</b>

                <ToggleButton
                    value={state.orderAcceptedByBt || false}
                    onToggle={(value) => toggle(value, "orderAcceptedByBt")} />

                <b style={{ width: '15rem', marginLeft: "6rem", marginBottom: "0.5rem" }}>Stary S/N:</b>

                <ToggleButton
                    value={state.oldSnBt || false}
                    onToggle={(value) => toggle(value, "oldSnBt")} />

            </div>

            <div style={{ display: "flex", marginBottom: "2rem" }}>
                <b style={{ width: '15rem' }}>Wykonawca:</b>

                <ToggleButton
                    value={state.executorBt || false}
                    onToggle={(value) => toggle(value, "executorBt")} />

                <b style={{ width: '15rem', marginLeft: "6rem", marginBottom: "0.5rem" }}>Nowy S/N:</b>

                <ToggleButton
                    value={state.newSnBt || false}
                    onToggle={(value) => toggle(value, "newSnBt")} />

            </div>

            <div style={{ display: "flex", marginBottom: "2rem" }}>
                <b style={{ width: '15rem' }}>Opis problemu:</b>

                <ToggleButton
                    value={state.problemDescriptionBt || false}
                    onToggle={(value) => toggle(value, "problemDescriptionBt")} />

                <b style={{ width: '15rem', marginLeft: "6rem", marginBottom: "0.5rem" }}>Koordynator z PLK:</b>

                <ToggleButton
                    value={state.coordinatorPlkBt || false}
                    onToggle={(value) => toggle(value, "coordinatorPlkBt")} />

            </div>

            <div style={{ display: "flex", marginBottom: "2rem" }}>
                <b style={{ width: '15rem' }}>Czas zamknięcia</b>

                <ToggleButton
                    value={state.dateOfFinishedOrderBt || false}
                    onToggle={(value) => toggle(value, "dateOfFinishedOrderBt")} />

                <b style={{ width: "15rem", marginLeft: "6rem" }}>Załączono zdjęcia:</b>

                <ToggleButton
                    value={state.photosAttachedBt || false}
                    onToggle={(value) => toggle(value, "photosAttachedBt")} />

            </div>

            <div style={{ display: "flex", marginBottom: "2rem" }}>
                <b style={{ width: '15rem' }}>Data akceptacji SpaceNet:</b>

                <ToggleButton
                    value={state.dateOfAcceptationSpacenetBt || false}
                    onToggle={(value) => toggle(value, "dateOfAcceptationSpacenetBt")} />

                <b style={{ width: '15rem', marginLeft: "6rem", marginBottom: "0.5rem" }}>Naprawiono usterkę?</b>

                <ToggleButton
                    value={state.systemRecoveryBt || false}
                    onToggle={(value) => toggle(value, "systemRecoveryBt")} />

            </div>

            <div style={{ display: "flex", marginBottom: "2rem" }}>
                <b style={{ width: '15rem' }}>Data akceptacji PLK:</b>

                <ToggleButton
                    value={state.dateOfAcceptationPlkBt || false}
                    onToggle={(value) => toggle(value, "dateOfAcceptationPlkBt")} />

                <b style={{ width: '15rem', marginLeft: "6rem", marginBottom: "0.5rem" }}>Prace dodatkowe?</b>

                <ToggleButton
                    value={state.additionalWorksBt || false}
                    onToggle={(value) => toggle(value, "additionalWorksBt")} />

            </div>

            <div style={{ display: "flex", marginBottom: "2rem" }}>
                <b style={{ width: '15rem', marginTop: "1rem" }}>Koszt usługi</b>

                <ToggleButton
                    value={state.serviceCostBt || false}
                    onToggle={(value) => toggle(value, "serviceCostBt")} />

                <b style={{ width: '15rem', marginLeft: "6rem", marginBottom: "0.5rem" }}>Opis prac dodatkowych:</b>

                <ToggleButton
                    value={state.additionalWorksDescriptionBt || false}
                    onToggle={(value) => toggle(value, "additionalWorksDescriptionBt")} />

            </div>

            <div style={{ display: "flex", marginBottom: "2rem" }}>
                <b style={{ width: '15rem', marginTop: "1rem" }}>Koszt materiałów:</b>

                <ToggleButton
                    value={state.materialCostBt || false}
                    onToggle={(value) => toggle(value, "materialCostBt")} />

                <b style={{ width: '15rem', marginLeft: "6rem", marginBottom: "0.5rem" }}>Wykonawca prac dodatkowych:</b>

                <ToggleButton
                    value={state.additionalWorksExecutorBt || false}
                    onToggle={(value) => toggle(value, "additionalWorksExecutorBt")} />

            </div>

            <div style={{ display: "flex", marginBottom: "2rem" }}>
                <b style={{ width: '15rem', marginTop: "1rem" }}>Uwagi:</b>

                <ToggleButton
                    value={state.commentsBt || false}
                    onToggle={(value) => toggle(value, "commentsBt")} />

                <b style={{ width: '15rem', marginLeft: "6rem", marginBottom: "0.5rem" }}>Data dodatkowych prac:</b>

                <ToggleButton
                    value={state.dateOfAdditionalWorksBt || false}
                    onToggle={(value) => toggle(value, "dateOfAdditionalWorksBt")} />

            </div>

            <div style={{ display: "flex", marginBottom: "2rem" }}>
                <b style={{ width: '15rem' }}>Protokół:</b>

                <ToggleButton
                    value={state.protocolBt || false}
                    onToggle={(value) => toggle(value, "protocolBt")} />

                <b style={{ width: '15rem', marginLeft: "6rem", marginBottom: "0.5rem" }}>Nr faktury:</b>

                <ToggleButton
                    value={state.invoiceIdBt || false}
                    onToggle={(value) => toggle(value, "invoiceIdBt")} />

            </div>

            <div style={{ display: "flex", marginBottom: "2rem" }}>
                <b style={{ width: '15rem' }}>Czas przyjazdu:</b>

                <ToggleButton
                    value={state.dateOfArrivalBt || false}
                    onToggle={(value) => toggle(value, "dateOfArrivalBt")} />

                <b style={{ width: '15rem', marginLeft: "6rem", marginBottom: "0.5rem" }}>Zdjęcia:</b>

                <ToggleButton
                    value={state.photosBt || false}
                    onToggle={(value) => toggle(value, "photosBt")} />

            </div>

            <div style={{ display: "flex", marginBottom: "2rem" }}>
                <b style={{ width: '15rem' }}>Wykonane prace:</b>

                <ToggleButton
                    value={state.workDoneDescriptionBt || false}
                    onToggle={(value) => toggle(value, "workDoneDescriptionBt")} />

                <b style={{ width: '15rem', marginLeft: "6rem" }}>Akcja:</b>

                <ToggleButton
                    value={state.actionBt || false}
                    onToggle={(value) => toggle(value, "actionBt")} />

            </div>


            <button onClick={save} className="btn btn-primary">Zapisz</button>
            <button onClick={close} className="btn btn-danger" style={{ marginLeft: '2rem' }}>cancel</button>
        </div>);
    }
}







export default ModalButtons;