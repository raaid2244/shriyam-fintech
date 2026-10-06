import React from 'react';
import SolutionsHero from '../components/solutions/SolutionsHero';
import SolutionsIndex from '../components/solutions/SolutionsIndex';
import FinancialRequirementSection from '../components/solutions/FinancialRequirementSection';
import SolutionPerspectiveSection from '../components/solutions/SolutionPerspectiveSection';
import AboutCTA from '../components/about/AboutCTA';

const Solutions = () => {
  return (
    <div className="bg-white">
      <SolutionsHero />
      <SolutionsIndex />
      <FinancialRequirementSection />
      <SolutionPerspectiveSection />
      <AboutCTA />
    </div>
  );
};

export default Solutions;
