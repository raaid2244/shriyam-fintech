import React from 'react';
import IndustriesHero from '../components/industries/IndustriesHero';
import IndustryDirectory from '../components/industries/IndustryDirectory';
import FinancialContext from '../components/industries/FinancialContext';
import IndustryPerspective from '../components/industries/IndustryPerspective';
import IndustriesCTA from '../components/industries/IndustriesCTA';

const Industries = () => {
  return (
    <main className="bg-[#F7F8F6]">
      <IndustriesHero />
      <IndustryDirectory />
      <FinancialContext />
      <IndustryPerspective />
      <IndustriesCTA />
    </main>
  );
};

export default Industries;
