import React from 'react';
import Navbar from '../Navbar/Navbar';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { data } from '../../utils/fagData';

const Faq = () => {
  return (
    <>
      <Navbar />
      <div className="mx-auto w-4/5 xl:w-3/5 my-12">
        {data.map((question) => (
          <React.Fragment key={question.title}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                {question.title}
              </AccordionSummary>
              <AccordionDetails>{question.description}</AccordionDetails>
            </Accordion>
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default Faq;
