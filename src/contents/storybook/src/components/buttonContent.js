export const createButtonContent = () => `
import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
  onClick?: () => void;
}

const StyledButton = styled.button<ButtonProps>\`
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-family: inherit;
  transition: background-color 0.3s;

  \${({ variant }) => variant === 'primary' && \`
    background: #0070f3;
    color: white;
    &:hover {
      background: #0051cc;
    }
  \`}

  \${({ variant }) => variant === 'secondary' && \`
    background: #f5f5f5;
    color: #333;
    &:hover {
      background: #e5e5e5;
    }
  \`}

  \${({ size }) => {
    switch (size) {
      case 'small':
        return \`
          padding: 8px 16px;
          font-size: 14px;
        \`;
      case 'large':
        return \`
          padding: 16px 32px;
          font-size: 18px;
        \`;
      default:
        return \`
          padding: 12px 24px;
          font-size: 16px;
        \`;
    }
  }}
\`;

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};
`.trim();
