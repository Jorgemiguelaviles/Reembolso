import React, { useState, useEffect } from 'react';

const RandomBarChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newData = chartData.map(item => ({
        name: `Usuário ${item.name.split(' ')[1]}`, // Assume que o nome é 'Usuário X'
        valor: Math.floor(Math.random() * 100) + 1,
      }));

      setChartData(newData);
    }, 1000);

    return () => clearInterval(interval);
  }, [chartData]); // Adicionei chartData como dependência para evitar possíveis proble mas

  return (
    <div>
      {/* Aqui você pode renderizar o gráfico usando os dados de chartData */}
    </div>
  );
};

export default RandomBarChart;
