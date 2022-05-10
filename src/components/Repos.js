import React, { useContext } from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { ExampleChart, Pie2D, Column2D, Bar2D, Doughnut2D } from './Charts';

const Repos = () => {
  const { repos } = useContext(GithubContext);

  const languages = repos.reduce((total, item) => {
    const { language, size } = item;
    if (!language) return total;

    if (!total[language]) {
      total[language] = { label: language, value: 1, size: size };
    }
    else {
      total[language] = { ...total[language], value: total[language].value + 1, size: total[language].size + size };
    }
    return total;
  }, {});

  const mostUsed = Object.values(languages).sort((a, b) => {
    return b.value - a.value;
  }).slice(0, 5);

  // largest size per language
  const largestSize = Object.values(languages).sort((a, b) => {
    return b.size - a.size;
  }).map((item) => {
    return { ...item, value: item.size }
  }).slice(0, 5);

  //size, forks

  let { sized, forks } = repos.reduce((total, item) => {
    const { size, name, forks } = item;
    total.sized[size] = { label: name, value: size };
    total.forks[forks] = { label: name, value: forks };
    return total;
  }, {
    sized: {}, forks: {},
  });
  sized = Object.values(sized).slice(-5).reverse();
  forks = Object.values(forks).slice(-5).reverse();

  return <section className='section'>
    <Wrapper className='section-center'>
      <Pie2D data={mostUsed} />
      <Column2D data={sized} />
      <Doughnut2D data={largestSize} />
      <Bar2D data={forks} />
      {/* <ExampleChart data={chartData} /> */}
    </Wrapper>
  </section>
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
