import React, { useState, useEffect } from "react";
import icons from "../../assets/icons/AlpinaLogo.png";
import "bootstrap/dist/css/bootstrap.min.css";

const Consulta = ({
    titulo,
    Nome,
    Chapa,

}) => {
    const [redirectToMain, setRedirectToMain] = useState(false);

    return (
        <>
            <nav
                className="navbar"
                style={{
                    background: "#f6f5f5",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-4 col-md-3">
                            <img
                                src={icons}
                                alt="Logo"
                                style={{
                                    width: "6rem",
                                    height: "3rem",
                                }}
                            />
                        </div>
                        <div className="col-6 col-md-9 ">
                            <p
                                style={{
                                    marginRight: "6rem",
                                    fontWeight: "bold",
                                    fontSize: "1rem",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                }}
                            >
                                Sistema de reembolso WEB
                            </p>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="Consulta">
                <div>
                    <div

                        style={{
                            marginTop: '1rem',
                        }}
                    >
                        <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#333', marginLeft: '1rem' }}>
                            {titulo}
                        </p>

                    </div>
                    <hr />
                    <div>
                        <p style={{ display: 'inline-block', fontSize: '18px', fontWeight: 'bold', color: '#333', marginLeft: '1rem' }}>
                            Nome: {Nome}
                        </p>
                        <p style={{ display: 'inline-block', fontSize: '18px', fontWeight: 'bold', color: '#333', marginLeft: '1rem' }}>
                            Chapa: {Chapa}
                        </p>
                    </div>

                    <div
                        style={{
                            position: "relative",
                            left: "4rem",
                            top: "-1.5rem",
                            width: "90%",
                        }}>
                    </div>
                </div>

            </div>
        </>
    );
};

export default Consulta;
