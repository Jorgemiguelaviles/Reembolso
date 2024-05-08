import React, { useState, useEffect } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

const TelaPrincipal = () => {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);

  useEffect(() => {
    // Função para gerar dados aleatórios para o primeiro gráfico
    const generateRandomData1 = () => {
      const newData = [];
      for (let i = 0; i < 10; i++) {
        newData.push({ name: i, value: Math.random() * 100 });
      }
      setData1(newData);
    };

    // Função para gerar dados aleatórios para o segundo gráfico
    const generateRandomData2 = () => {
      const newData = [];
      for (let i = 0; i < 10; i++) {
        newData.push({ name: i, value: Math.random() * 100 });
      }
      setData2(newData);
    };

    // Gerar dados iniciais
    generateRandomData1();
    generateRandomData2();

    // Atualizar dados a cada 5 segundos para o primeiro gráfico
    const intervalId1 = setInterval(generateRandomData1, 5000);

    // Atualizar dados a cada 3 segundos para o segundo gráfico
    const intervalId2 = setInterval(generateRandomData2, 3000);

    // Limpar os intervalos quando o componente for desmontado
    return () => {
      clearInterval(intervalId1);
      clearInterval(intervalId2);
    };
  }, []);

  return (
    <div>
      <div className="row m-4">
        <h1> Dashboards</h1>
      </div>
      <div className="row d-flex align-items-center justify-content-end">
        <LineChart width={400} height={300} data={data1}>
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="name" />
          <YAxis />
        </LineChart>
      </div>
      <div className="row d-flex align-items-center justify-content-start">
        <LineChart width={400} height={300} data={data2}>
          <Line type="monotone" dataKey="value" stroke="#82ca9d" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="name" />
          <YAxis />
        </LineChart>
      </div>
    </div>
  );
}

export default TelaPrincipal;
