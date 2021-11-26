import React from 'react';

export const Button = ({ children, className, type = 'outline', ...props }) => {
	return (
		<div {...props} className={`button button_${type} ${className}`}>
			{children}
		</div>
	);
};
