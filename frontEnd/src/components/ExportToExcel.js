import React, { Component } from 'react';
import ReactHTMLTableToExcel from "react-html-table-to-excel"







class ExportToExcel extends Component {

    render() {
        return (


            <div>
                <ReactHTMLTableToExcel
                    id="tableTestId"
                    className="export"
                    table="tableToXlsId"
                    filename="FiltredData"
                    sheet="tablexls"
                    buttonText="Export" />

                {<table hidden={true} id="tableToXlsId">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>numer pracy</th>
                            <th>numer lokalizacji</th>
                            <th>tryb realizacji</th>
                            <th>utworzona przez</th>
                            <th>data zlecenia</th>
                            <th>lokalizacja</th>
                            <th>opis prac</th>
                            <th>zlecenie przyjęte przez</th>
                            <th>wykonawca</th>
                            <th>opis problemu</th>
                            <th>czas zamknięcia</th>
                            <th>data akceptacji spacenet</th>
                            <th>data akceptacji plk</th>
                            <th>koszt usługi</th>
                            <th>koszt materiałów</th>
                            <th>uwagi</th>
                            <th>czas przyjazdu</th>
                            <th>wykonane prace</th>
                            <th>stary S/N</th>
                            <th>nowy S/N</th>
                            <th>koordynator plk</th>
                            <th>załączono zdjęcia</th>
                            <th>naprawiono usterkę?</th>
                            <th>prace dodatkowe?</th>
                            <th>opis prac dodatkowych</th>
                            <th>wykonawca prac dodatkowych</th>
                            <th>data planowanych prac dodatkowych</th>
                            <th>nr faktury(wykonawca)</th>
                            <th>data faktury(wykonawca)</th>
                            <th>zdjecia</th>
                        </tr>
                    </thead>

                    <tbody>{
                        this.props.posts.map(post => {
                            return (
                                <tr key={post.id}>
                                    <td>{post.orderId}</td>
                                    <td>{post.localizationId}</td>
                                    <td>{post.realizationMode}</td>
                                    <td>{post.orderCreatedBy}</td>
                                    <td>{post.dateOfOrder}</td>
                                    <td>{post.localization}</td>
                                    <td>{post.jobDescription}</td>
                                    <td>{post.orderAcceptedBy}</td>
                                    <td>{post.executor}</td>
                                    <td>{post.problemDescriptionBt}</td>
                                    <td>{post.dateOfFinishedOrder}</td>
                                    <td>{post.dateOfAcceptationSpacenet}</td>
                                    <td>{post.dateOfAcceptationPlk}</td>
                                    <td>{post.serviceCost}</td>
                                    <td>{post.materialCost}</td>
                                    <td>{post.comments}</td>
                                    <td>{post.dateOfArrival}</td>
                                    <td>{post.workDoneDescription}</td>
                                    <td>{post.oldSn}</td>
                                    <td>{post.newSn}</td>
                                    <td>{post.coordinatorPlk}</td>
                                    <td>{post.photosAttached}</td>
                                    <td>{post.systemRecovery}</td>
                                    <td>{post.additionalWorks}</td>
                                    <td>{post.additionalWorksDescription}</td>
                                    <td>{post.additionalWorksExecutor}</td>
                                    <td>{post.dateOfAdditionalWorks}</td>
                                    <td>{post.invoiceId}</td>
                                    <td>{post.dateOfInvoice}</td>
                                    <td>{post.photos}</td>

                                </tr>
                            );
                        })
                    }
                    </tbody>
                </table>}
            </div>
        );
    }
}

export default ExportToExcel;