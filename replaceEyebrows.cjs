const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/components/about');

const filesToProcess = [
  'CompanyIntro.jsx',
  'OurStory.jsx',
  'WhatWeDo/index.jsx',
  'StrategicFocus.jsx',
  'ValueProposition.jsx',
  'WhoWeAreFor.jsx',
  'VisionSection.jsx',
  'MissionSection.jsx',
  'ApproachJourney.jsx',
  'WhyShriyam.jsx',
  'LeadershipSection.jsx',
  'AboutCTA.jsx'
];

filesToProcess.forEach(file => {
  const filePath = path.join(dir, file);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // Add import if not exists
  if (!content.includes('SectionEyebrow')) {
    // If it's in WhatWeDo, import path is different
    const importPath = file.includes('WhatWeDo') 
      ? "import SectionEyebrow from '../../ui/SectionEyebrow';"
      : "import SectionEyebrow from '../ui/SectionEyebrow';";
    
    // Insert after React import
    content = content.replace(/(import React.*?;\n)/, `$1${importPath}\n`);
    changed = true;
  }

  // Common patterns to replace

  // 1. CompanyIntro.jsx:
  content = content.replace(
    /<motion\.p[\s\S]*?className="text-\[#0A9B73\] font-heading font-semibold text-sm uppercase tracking-widest mb-4"[\s\S]*?>\s*OUR STORY\s*<\/motion\.p>/,
    '<SectionEyebrow text="OUR STORY" center={true} className="mb-4" />'
  );

  // 2. OurStory.jsx
  content = content.replace(
    /<motion\.div[\s\S]*?className="flex items-center justify-center w-full mb-12 sm:mb-16 font-heading font-medium uppercase tracking-\[0\.2em\] text-\[#0A9B73\] text-\[14px\]"[\s\S]*?>\s*<span.*?><\/span>\s*OUR STORY\s*<span.*?><\/span>\s*<\/motion\.div>/,
    '<SectionEyebrow text="OUR STORY" />'
  );

  // 3. WhatWeDo/index.jsx
  content = content.replace(
    /<span className="block font-heading text-\[11px\] sm:text-\[13px\] font-semibold tracking-\[0\.22em\] text-\[#0A9B73\] uppercase mb-3">\s*CORE CAPABILITIES\s*<\/span>/,
    '<SectionEyebrow text="CORE CAPABILITIES" className="mb-3" center={true} />'
  );

  // 4. WhoWeAreFor.jsx
  content = content.replace(
    /<p className="text-\[#0A9B73\] font-heading font-semibold text-sm uppercase tracking-widest mb-4">\s*CLIENT SPECTRUM\s*<\/p>/,
    '<SectionEyebrow text="CLIENT SPECTRUM" center={false} className="mb-4" />'
  );

  // 5. WhyShriyam.jsx
  content = content.replace(
    /<p className="text-\[#0A9B73\] font-heading font-semibold text-sm uppercase tracking-widest mb-4">\s*THE SHRIYAM ADVANTAGE\s*<\/p>/,
    '<SectionEyebrow text="THE SHRIYAM ADVANTAGE" center={false} className="mb-4" />'
  );

  // 6. VisionSection.jsx
  content = content.replace(
    /<p className="text-\[#0A9B73\] font-heading font-semibold text-sm uppercase tracking-widest">\s*OUR VISION\s*<\/p>/,
    '<SectionEyebrow text="OUR VISION" center={false} className="mb-4" />'
  );

  // 7. MissionSection.jsx
  content = content.replace(
    /<p className="text-\[#0A9B73\] font-heading font-semibold text-sm uppercase tracking-widest mb-4">\s*OUR MISSION\s*<\/p>/,
    '<SectionEyebrow text="OUR MISSION" center={false} className="mb-4" />'
  );

  // 8. ValueProposition.jsx
  content = content.replace(
    /<p className="text-\[#0A9B73\] font-heading font-semibold text-sm uppercase tracking-widest">\s*VALUE PROPOSITION\s*<\/p>/,
    '<SectionEyebrow text="VALUE PROPOSITION" center={false} className="mb-4" />'
  );

  // 9. StrategicFocus.jsx
  content = content.replace(
    /<p className="text-\[#0A9B73\] font-heading font-semibold text-sm uppercase tracking-widest mb-4">\s*STRATEGIC FOCUS\s*<\/p>/,
    '<SectionEyebrow text="STRATEGIC FOCUS" center={false} className="mb-4" />'
  );

  // 10. ApproachJourney.jsx
  content = content.replace(
    /<p className="text-\[#0A9B73\] font-heading font-semibold text-sm uppercase tracking-widest mb-4">\s*OUR APPROACH\s*<\/p>/,
    '<SectionEyebrow text="OUR APPROACH" center={false} className="mb-4" />'
  );

  // 11. LeadershipSection.jsx
  content = content.replace(
    /<p className="text-\[#0A9B73\] font-heading font-semibold text-sm uppercase tracking-widest mb-4">\s*CORPORATE GOVERNANCE\s*<\/p>/,
    '<SectionEyebrow text="CORPORATE GOVERNANCE" center={true} className="mb-4" />'
  );

  // 12. AboutCTA.jsx
  content = content.replace(
    /<p className="text-\[#0A9B73\] font-heading font-semibold text-sm uppercase tracking-widest">\s*START A CONVERSATION\s*<\/p>/,
    '<SectionEyebrow text="START A CONVERSATION" center={true} className="mb-4" />'
  );

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
