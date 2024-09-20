import React, { useState } from "react";
import { useUser } from '../../userContext';

function Filtro({ onFiltrar }) {

    const { domain, filtros, setFiltros } = useUser();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFiltros({ ...filtros, [name]: value });
    };

    const handleFiltrarClick = () => {

        onFiltrar(filtros);
    };



    return (
        <div className="container-fluid">
            <div className="row mt-4">
                <div className="col">
                    <div className="row">
                        <div className="col-sm">
                            <input
                                type="number"
                                className="form-control"
                                name="filtroNumero"
                                value={filtros.filtroNumero}
                                onChange={handleInputChange}
                                placeholder="Digite sua chapa"
                            />
                        </div>
                        <div className="col-sm d-flex align-items-center">
                            <div className="row-sm mr-2">
                                <input
                                    type="date"
                                    className="form-control"
                                    name="filtroAbertoEm"
                                    value={filtros.filtroAbertoEm}
                                    onChange={handleInputChange}
                                    placeholder="Aberto em"
                                />
                            </div>
                            <div className="row-sm mr-3">
                                Até
                            </div>
                            <div className="row-sm">
                                <input
                                    type="date"
                                    className="form-control"
                                    name="filtroAte"
                                    value={filtros.filtroAte}
                                    onChange={handleInputChange}
                                    placeholder="Até"
                                />
                            </div>
                        </div>


                        <div className="col-sm">
                            <input
                                type="number"
                                className="form-control"
                                name="filtroCentroDeCusto"
                                value={filtros.filtroCentroDeCusto}
                                onChange={handleInputChange}
                                placeholder="Digite seu centro de custo"
                            />
                        </div>
                        <div className="col-sm">
                            <input
                                type="text"
                                className="form-control"
                                name="filtroStatus"
                                value={filtros.filtroStatus}
                                onChange={handleInputChange}
                                placeholder="Digite seu status"
                            />
                        </div>
                        <div className="col-sm">
                            <button
                                className="btn btn-primary btn-block"
                                onClick={handleFiltrarClick}
                            >
                                Aplicar Filtros
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Filtro;
