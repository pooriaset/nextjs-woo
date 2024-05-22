import React from 'react';

const RulerIcon = () => {
  return (
    <svg
      style={{ width: 18, height: 18, fill: 'var(--color-icon-low-emphasis)' }}
    >
      <symbol
        id="variationSize"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path
          fill-rule="evenodd"
          d="M12 2h9a1 1 0 011 1v18a1 1 0 01-1 1h-9a1 1 0 01-1-1V3a1 1 0 011-1zm1 17v1h7V4h-7v1h2v2h-2v2h2v2h-2v2h2v2h-2v2h2v2h-2zm-4.707-2.707L7 17.586V6.414l1.293 1.293 1.414-1.414-3-3a1 1 0 00-1.414 0l-3 3 1.414 1.414L5 6.414v11.172l-1.293-1.293-1.414 1.414 3 3a1 1 0 001.414 0l3-3-1.414-1.414z"
          clip-rule="evenodd"
        ></path>
      </symbol>
      <use xlinkHref="#variationSize"></use>
    </svg>
  );
};

export default RulerIcon;
