import React from 'react';

function WrenchIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      className={className}
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        id="Round"
        d="M12.4731 3.24687C10.4631 1.23687 7.45306 0.826868 5.03306 2.00687L8.66306 5.63687C9.05306 6.02687 9.05306 6.65687 8.66306 7.04687L7.07306 8.63687C6.68306 9.03687 6.05306 9.03687 5.66306 8.63687L2.03306 5.00687C0.86306 7.43687 1.27306 10.4269 3.28306 12.4369C5.14306 14.2969 7.86306 14.7869 10.1731 13.9169L18.1331 21.8769C19.1631 22.9069 20.8231 22.9069 21.8431 21.8769C22.8731 20.8469 22.8731 19.1869 21.8431 18.1669L13.9231 10.2369C14.8431 7.89687 14.3631 5.13687 12.4731 3.24687Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default WrenchIcon;
